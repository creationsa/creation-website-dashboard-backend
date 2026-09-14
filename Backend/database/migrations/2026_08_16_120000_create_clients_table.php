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
        // Singleton, site-wide client/partner logos list — the single
        // source of truth wherever a "Logos" section is placed (page
        // builder, projects landing page, ...). Logos themselves reuse
        // the generic AppMedia system (one row per logo, tagged
        // option='logo'), same pattern as projects_main_data used before
        // this became its own feature.
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('client_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('client_id');
            $table->string('title')->nullable();
            $table->string('locale')->index();
            $table->unique(['client_id', 'locale']);
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_translations');
        Schema::dropIfExists('clients');
    }
};
