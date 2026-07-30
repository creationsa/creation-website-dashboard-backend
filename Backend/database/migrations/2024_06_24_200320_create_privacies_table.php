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
        Schema::create('privacies', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('privacy_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('privacy_id')->constrained('privacies')->cascadeOnDelete();
            $table->string('title');
            $table->longText('desc');
            $table->string('locale')->index();
            $table->unique(['privacy_id', 'locale']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('privacies');
    }
};
