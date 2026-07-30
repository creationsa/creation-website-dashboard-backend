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
        Schema::create('page_styles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('font_name');
            $table->text('font_url')->nullable();
            $table->boolean('custom_font');
            $table->string('format')->nullable();
            $table->string('size');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('page_style_styles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_style_id')->constrained('page_styles')->onDelete('cascade');
            $table->string('name');
            $table->string('font_weight_num');
            $table->string('font_style');   // normal", "italic
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
        Schema::dropIfExists('page_styles');
    }
};
