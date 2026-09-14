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
        // Singleton site-wide header. No translatable content at all (the
        // logo is pulled from Settings, and the toggles/menu references
        // don't carry any free text of their own).
        Schema::create('headers', function (Blueprint $table) {
            $table->id();
            $table->boolean('show_language_switch')->default(true);
            $table->boolean('show_theme_switch')->default(true);
            $table->timestamps();
        });

        // Same reasoning as footer_menu_items: either points at a builder
        // page (kept in sync via FK) or is one of the fixed built-in
        // routes (solutions/projects). A separate, independent selection
        // from the footer's own menu.
        Schema::create('header_menu_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('header_id')->constrained('headers')->cascadeOnDelete();
            $table->string('type');
            $table->foreignId('page_id')->nullable()->constrained('builder_pages')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('header_menu_items');
        Schema::dropIfExists('headers');
    }
};
