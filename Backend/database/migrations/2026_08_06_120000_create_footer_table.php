<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Singleton site-wide footer. Table is deliberately singular
        // ("footer", not "footers") — the upload endpoint's `model`
        // validation matches literal table names, and the dashboard
        // already uploads footer media with `model=footer`.
        Schema::create('footer', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('footer_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('footer_id');
            $table->longText('statement_desc')->nullable();
            $table->longText('description')->nullable();
            $table->string('tagline')->nullable();
            $table->string('locale')->index();
            $table->unique(['footer_id', 'locale']);
            $table->foreign('footer_id')->references('id')->on('footer')->onDelete('cascade');
        });

        // Each entry either points at a builder page (kept in sync via FK —
        // deleting the page removes it from the menu automatically) or is
        // one of the fixed built-in routes (solutions/projects), which
        // don't have a database record of their own.
        Schema::create('footer_menu_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('footer_id')->constrained('footer')->cascadeOnDelete();
            $table->string('type');
            $table->foreignId('page_id')->nullable()->constrained('builder_pages')->cascadeOnDelete();
            $table->timestamps();
        });

        // Just a reference to a Settings social entry (title/link live
        // there — not duplicated here). Deleting the referenced entry in
        // Settings removes it from the footer automatically.
        Schema::create('footer_social_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('footer_id')->constrained('footer')->cascadeOnDelete();
            $table->foreignId('setting_social_id')->constrained('setting_socials')->cascadeOnDelete();
            $table->timestamps();
        });

        // Always exactly 2 rows (fixed trust-badge slots), identified by
        // `slot` (0/1) rather than array order.
        Schema::create('footer_badges', function (Blueprint $table) {
            $table->id();
            $table->foreignId('footer_id')->constrained('footer')->cascadeOnDelete();
            $table->unsignedTinyInteger('slot');
            $table->string('link')->nullable();
            $table->timestamps();
            $table->unique(['footer_id', 'slot']);
        });

        Schema::create('footer_badge_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('footer_badge_id');
            $table->string('label')->nullable();
            $table->string('locale')->index();
            $table->unique(['footer_badge_id', 'locale'], 'fb_translations_unique');
            $table->foreign('footer_badge_id', 'fb_translations_fb_id_foreign')
                ->references('id')->on('footer_badges')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('footer_badge_translations');
        Schema::dropIfExists('footer_badges');
        Schema::dropIfExists('footer_social_items');
        Schema::dropIfExists('footer_menu_items');
        Schema::dropIfExists('footer_translations');
        Schema::dropIfExists('footer');
    }
};
