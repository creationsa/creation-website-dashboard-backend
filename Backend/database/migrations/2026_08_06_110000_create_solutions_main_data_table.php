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
        // Singleton "solutions" landing page intro (header + core desc +
        // featured items + accordion), mirroring projects_main_data.
        Schema::create('solutions_main_data', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('solutions_main_data_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('solutions_main_data_id');
            $table->string('first_title')->nullable();
            $table->string('second_title')->nullable();
            $table->string('third_title')->nullable();
            $table->longText('core_desc')->nullable();

            $table->string('items_header_first_title')->nullable();
            $table->string('items_header_second_title')->nullable();
            $table->string('items_header_third_title')->nullable();

            $table->string('accordion_items_header_first_title')->nullable();
            $table->string('accordion_items_header_second_title')->nullable();
            $table->string('accordion_items_header_third_title')->nullable();

            $table->string('locale')->index();
            $table->unique(['solutions_main_data_id', 'locale'], 'smd_translations_unique');
            $table->foreign('solutions_main_data_id', 'smd_translations_smd_id_foreign')
                ->references('id')->on('solutions_main_data')->onDelete('cascade');
        });

        // Featured items — each owns its own AppMedia (feature_media
        // [+ feature_media_poster]), plus a title/slug pair.
        Schema::create('solution_main_data_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('solutions_main_data_id')->constrained('solutions_main_data')->cascadeOnDelete();
            // The dashboard only collects an English slug, mirrored into
            // the Arabic translation row — no need for its own column.
            $table->string('item_slug')->nullable();
            $table->timestamps();
        });

        Schema::create('solution_main_data_item_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('solution_main_data_item_id');
            $table->string('item_title')->nullable();
            $table->string('locale')->index();
            $table->unique(['solution_main_data_item_id', 'locale'], 'smdi_translations_unique');
            $table->foreign('solution_main_data_item_id', 'smdi_translations_smdi_id_foreign')
                ->references('id')->on('solution_main_data_items')->onDelete('cascade');
        });

        Schema::create('solution_main_data_ticker_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('solutions_main_data_id')->constrained('solutions_main_data')->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('solution_main_data_ticker_item_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('solution_main_data_ticker_item_id');
            $table->longText('text');
            $table->string('locale')->index();
            $table->unique(['solution_main_data_ticker_item_id', 'locale'], 'smdti_translations_unique');
            $table->foreign('solution_main_data_ticker_item_id', 'smdti_translations_smdti_id_foreign')
                ->references('id')->on('solution_main_data_ticker_items')->onDelete('cascade');
        });

        Schema::create('solution_accordion_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('solutions_main_data_id')->constrained('solutions_main_data')->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('solution_accordion_item_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('solution_accordion_item_id');
            $table->string('title')->nullable();
            $table->longText('content')->nullable();
            $table->string('locale')->index();
            $table->unique(['solution_accordion_item_id', 'locale'], 'sai_translations_unique');
            $table->foreign('solution_accordion_item_id', 'sai_translations_sai_id_foreign')
                ->references('id')->on('solution_accordion_items')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('solution_accordion_item_translations');
        Schema::dropIfExists('solution_accordion_items');
        Schema::dropIfExists('solution_main_data_ticker_item_translations');
        Schema::dropIfExists('solution_main_data_ticker_items');
        Schema::dropIfExists('solution_main_data_item_translations');
        Schema::dropIfExists('solution_main_data_items');
        Schema::dropIfExists('solutions_main_data_translations');
        Schema::dropIfExists('solutions_main_data');
    }
};
