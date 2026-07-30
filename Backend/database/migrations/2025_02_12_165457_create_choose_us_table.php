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
        Schema::create('choose_us', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('choose_us_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('choose_us_id')->constrained('choose_us')->cascadeOnDelete();
            $table->string('title');
            $table->longText('desc');
            $table->string('slug')->nullable();
            $table->string('locale')->index();
            $table->unique(['choose_us_id', 'locale']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('choose_us');
    }
};
