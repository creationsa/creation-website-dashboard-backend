<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('phone_code', 5)->nullable();
            $table->string('show_phone_code')->nullable();
            $table->string('flag')->nullable();
            $table->integer('phone_number_limit')->nullable();
            $table->integer('national_id_limit')->nullable();
            $table->enum('continent', ['africa', 'europe', 'asia', 'south_america', 'north_america', 'australia'])->default('asia');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('country_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('country_id')->constrained('countries')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->nullable();
            $table->string('nationality')->nullable();
            $table->string('short_name')->nullable();
            $table->string('locale')->index();
            $table->unique(['country_id', 'locale']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('country_translations');
        Schema::dropIfExists('countries');
    }
}
