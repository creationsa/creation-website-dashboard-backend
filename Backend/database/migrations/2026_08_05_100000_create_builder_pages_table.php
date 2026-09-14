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
        Schema::create('builder_pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->json('sections')->nullable();
            $table->timestamps();
        });

        Schema::create('builder_page_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('builder_page_id');
            $table->string('title');
            $table->string('locale')->index();
            $table->unique(['builder_page_id', 'locale']);
            $table->foreign('builder_page_id')->references('id')->on('builder_pages')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('builder_page_translations');
        Schema::dropIfExists('builder_pages');
    }
};
