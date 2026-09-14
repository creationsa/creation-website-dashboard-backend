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
        Schema::create('solutions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('solution_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('solution_id');
            $table->string('title');
            $table->string('slug')->nullable();

            $table->string('first_title')->nullable();
            $table->string('second_title')->nullable();
            $table->string('third_title')->nullable();

            $table->string('proposition_title')->nullable();
            $table->longText('proposition_desc')->nullable();

            $table->string('execution_title')->nullable();

            $table->string('locale')->index();
            $table->unique(['solution_id', 'locale']);
            $table->foreign('solution_id')->references('id')->on('solutions')->onDelete('cascade');
        });

        // Always exactly 5 rows, synced wholesale on every save (pure text).
        Schema::create('solution_execution_keys', function (Blueprint $table) {
            $table->id();
            $table->foreignId('solution_id')->constrained('solutions')->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('solution_execution_key_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('solution_execution_key_id');
            $table->string('label')->nullable();
            $table->longText('value')->nullable();
            $table->string('locale')->index();
            $table->unique(['solution_execution_key_id', 'locale'], 'sek_translations_unique');
            $table->foreign('solution_execution_key_id', 'sek_translations_sek_id_foreign')
                ->references('id')->on('solution_execution_keys')->onDelete('cascade');
        });

        Schema::create('solution_ticker_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('solution_id')->constrained('solutions')->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('solution_ticker_item_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('solution_ticker_item_id');
            $table->longText('text');
            $table->string('locale')->index();
            $table->unique(['solution_ticker_item_id', 'locale'], 'sti_translations_unique');
            $table->foreign('solution_ticker_item_id', 'sti_translations_sti_id_foreign')
                ->references('id')->on('solution_ticker_items')->onDelete('cascade');
        });

        // Media-only featured items — each row exclusively owns its own
        // AppMedia (feature_media [+ feature_media_poster]) so a video's
        // poster always stays correctly paired with its main file.
        Schema::create('solution_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('solution_id')->constrained('solutions')->cascadeOnDelete();
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
        Schema::dropIfExists('solution_items');
        Schema::dropIfExists('solution_ticker_item_translations');
        Schema::dropIfExists('solution_ticker_items');
        Schema::dropIfExists('solution_execution_key_translations');
        Schema::dropIfExists('solution_execution_keys');
        Schema::dropIfExists('solution_translations');
        Schema::dropIfExists('solutions');
    }
};
