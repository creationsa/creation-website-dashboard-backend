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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('stat_one_value')->nullable();
            $table->string('stat_two_value')->nullable();
            $table->string('stat_three_value')->nullable();
            $table->timestamps();
        });

        Schema::create('project_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('project_id');
            $table->string('title');
            $table->string('slug')->nullable();
            $table->text('seo_desc')->nullable();

            $table->string('first_title')->nullable();
            $table->string('second_title')->nullable();
            $table->string('third_title')->nullable();

            $table->longText('overview_description')->nullable();

            $table->string('stats_title')->nullable();
            $table->string('stat_one_label')->nullable();
            $table->string('stat_two_label')->nullable();
            $table->string('stat_three_label')->nullable();

            $table->string('locale')->index();
            $table->unique(['project_id', 'locale']);
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
        });

        Schema::create('project_ticker_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('project_ticker_item_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('project_ticker_item_id');
            $table->longText('text');
            $table->string('locale')->index();
            $table->unique(['project_ticker_item_id', 'locale'], 'pti_translations_unique');
            $table->foreign('project_ticker_item_id', 'pti_translations_pti_id_foreign')
                ->references('id')->on('project_ticker_items')->onDelete('cascade');
        });

        // Singleton "projects" landing page intro (header + overview + logos).
        Schema::create('projects_main_data', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('projects_main_data_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('projects_main_data_id');
            $table->string('first_title')->nullable();
            $table->string('second_title')->nullable();
            $table->string('third_title')->nullable();
            $table->longText('overview_description')->nullable();
            $table->string('logos_title')->nullable();
            $table->string('locale')->index();
            $table->unique(['projects_main_data_id', 'locale'], 'pmd_translations_unique');
            $table->foreign('projects_main_data_id', 'pmd_translations_pmd_id_foreign')
                ->references('id')->on('projects_main_data')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects_main_data_translations');
        Schema::dropIfExists('projects_main_data');
        Schema::dropIfExists('project_ticker_item_translations');
        Schema::dropIfExists('project_ticker_items');
        Schema::dropIfExists('project_translations');
        Schema::dropIfExists('projects');
    }
};
