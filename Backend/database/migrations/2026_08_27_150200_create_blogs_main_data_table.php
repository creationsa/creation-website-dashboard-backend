<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Singleton settings for the blogs LISTING page's own nav entry
     * (title + slug) — mirrors projects_main_data / solutions_main_data's
     * role for their respective sections, kept minimal since blogs has no
     * other listing-page content to manage yet.
     */
    public function up()
    {
        Schema::create('blogs_main_data', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->nullable();
            $table->timestamps();
        });

        Schema::create('blogs_main_data_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('blogs_main_data_id');
            $table->string('nav_title')->nullable();
            $table->string('locale')->index();
            $table->unique(['blogs_main_data_id', 'locale']);
            $table->foreign('blogs_main_data_id')->references('id')->on('blogs_main_data')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('blogs_main_data_translations');
        Schema::dropIfExists('blogs_main_data');
    }
};
