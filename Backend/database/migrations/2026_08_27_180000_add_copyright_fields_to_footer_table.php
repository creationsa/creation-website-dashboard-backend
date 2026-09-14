<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('footer_translations', function (Blueprint $table) {
            $table->text('copyright_text')->nullable()->after('social_title');
        });

        // Separate from footer_menu_items — same reasoning as badges/
        // social_items already being their own tables: a distinct concern
        // (the copyright row's own links) shouldn't share rows with the
        // main footer menu.
        Schema::create('footer_copyright_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('footer_id')->constrained('footer')->cascadeOnDelete();
            $table->string('type');
            $table->foreignId('page_id')->nullable()->constrained('builder_pages')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('footer_copyright_items');

        Schema::table('footer_translations', function (Blueprint $table) {
            $table->dropColumn('copyright_text');
        });
    }
};
