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
        Schema::create('invitation_guests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_template_id');
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->integer('number_of_invitees');
            $table->timestamps();

            $table->foreign('user_template_id')->references('id')->on('user_templates')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invitation_guests');
    }
};
