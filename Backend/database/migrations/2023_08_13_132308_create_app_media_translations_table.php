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
        Schema::create('app_media_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('app_media_id')->constrained('app_media')->cascadeOnDelete();
            $table->string('alt');
            $table->string('locale')->index();
            $table->unique(['app_media_id', 'locale']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('app_media_translations');
    }
};
