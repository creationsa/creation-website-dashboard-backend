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
        Schema::create('terms_and_conditions_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('terms_and_conditions_id');
            $table->string('title');
            $table->text('description');
            $table->string('locale')->index();
            $table->unique(['terms_and_conditions_id', 'locale'], 'terms_locale_unique_constraint');

            $table->foreign('terms_and_conditions_id', 'terms_id_fk')
                  ->references('id')
                  ->on('terms_and_conditions')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('terms_and_conditions_translations');
    }
};
