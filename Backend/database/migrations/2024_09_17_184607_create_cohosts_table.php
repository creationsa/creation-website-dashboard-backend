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
        Schema::create('cohosts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_template_id')->constrained('user_templates')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('status')->default('pending');
            $table->boolean('is_active')->default(true);
            $table->integer('number_of_guests')->nullable();
            $table->integer('add_guests')->default(0);
            $table->boolean('unlimited_guests')->default(false);
            $table->boolean('allow_customize_events')->default(false);
            $table->boolean('allow_track_guests')->default(false);
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
        Schema::dropIfExists('cohosts');
    }
};
