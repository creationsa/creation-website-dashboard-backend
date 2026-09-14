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
        Schema::create('metadata', function (Blueprint $table) {
            $table->id();
            $table->nullableMorphs('metadataable');
            $table->string('for')->nullable(); // home - blogs - blog - gallery - about - services - service - contact-us
            $table->longText('keywords')->nullable();
            $table->timestamps();
        });

        Schema::create('metadata_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('metadata_id')->constrained('metadata')->cascadeOnDelete();
            $table->string('image')->nullable();
            $table->string('canonical_tags')->nullable();
            $table->string('title');
            $table->string('type')->nullable();
            $table->string('description');

            $table->string('locale')->index();
            $table->unique(['metadata_id', 'locale']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('metadata_translations');
        Schema::dropIfExists('metadata');
    }
};
