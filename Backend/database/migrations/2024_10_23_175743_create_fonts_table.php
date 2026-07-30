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
        Schema::create('fonts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('url')->nullable();
            $table->boolean('custom_font');
            $table->string('format')->nullable();   // opentype", "truetype
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('font_styles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('font_id')->constrained('fonts')->onDelete('cascade');
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
        Schema::dropIfExists('font_styles');
        Schema::dropIfExists('fonts');
    }
};
