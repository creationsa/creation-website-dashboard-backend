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
        Schema::create('template_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_template_id')->constrained('user_templates')->onDelete('cascade');
            $table->boolean('close_landing')->default(false);
            $table->string('landing_duration')->nullable();
            $table->string('reminder_attended_duration')->nullable();
            $table->string('reminder_not_attended_duration')->nullable();
            $table->string('message_gender')->default('both');   // male, female, both
            $table->boolean('send_whatsapp')->default(true);
            $table->boolean('send_sms')->default(false);
            $table->boolean('send_email')->default(false);

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
        Schema::dropIfExists('template_settings');
    }
};
