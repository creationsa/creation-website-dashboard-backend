<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            
            $table->string('full_name')->nullable();

            $table->string('email')->nullable();
            $table->timestamp('email_verified_at')->nullable();

            $table->string('phone_code')->nullable();
            $table->string('phone')->nullable();
            $table->timestamp('phone_verified_at')->nullable();

            $table->string('password')->nullable();

            $table->boolean('is_admin_active_user')->default(true);
            $table->boolean('is_ban')->default(false)->nullable();
            $table->text('ban_reason')->nullable();

            $table->string('reset_code')->nullable();

            $table->string('user_type')->nullable(); // admin - super_admin - client
            $table->enum('gender', ['male', 'female'])->nullable();

            $table->string('locale')->default('en')->nullable();

            $table->boolean('allow_notification')->default(true);

            $table->string('promotional_code')->nullable(); // code for the user
            $table->string('promotional_code_used')->nullable(); // code used from another user

            // $table->double('promotional_balance', 15, 2)->default(0)->nullable();

            $table->boolean('is_completed_data')->default(false);

            $table->rememberToken();
            $table->softDeletes();
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
        Schema::dropIfExists('users');
    }
}
