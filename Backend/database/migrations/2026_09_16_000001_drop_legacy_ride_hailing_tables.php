<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Drops the last DB-layer leftovers of the ride-hailing app this codebase
 * was repurposed from. No model, controller, or route reads/writes any of
 * these anymore — confirmed by grepping the backend, and by grepping the
 * website and dashboard frontends for a chat UI or a social-login flow
 * (neither exists), so `social_logins` and `chats`/`messages` can't be
 * populated through any live path either.
 */
return new class extends Migration
{
    public function up()
    {
        Schema::dropIfExists('messages');
        Schema::dropIfExists('chats');
        Schema::dropIfExists('devices');
        Schema::dropIfExists('edit_phones');
        Schema::dropIfExists('social_logins');
    }

    public function down()
    {
        Schema::create('social_logins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('provider_type', ['facebook', 'twitter', 'google', 'apple'])->default('facebook');
            $table->longText('provider_id')->nullable();
            $table->timestamps();
        });

        Schema::create('edit_phones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('added_by_id')->nullable()->constrained('users')->cascadeOnDelete();
            $table->string('phone')->nullable();
            $table->string('phone_code')->nullable();
            $table->string('code')->nullable();
            $table->dateTime('verified_at')->nullable();
            $table->timestamps();
        });

        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->text('device_token');
            $table->enum('type', ['ios', 'android', 'huawei']);
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('driver_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->text('message')->nullable();
            $table->string('message_type')->default('text');
            $table->timestamps();
        });
    }
};
