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
        Schema::table('subscription_plan_user', function (Blueprint $table) {
            $table->string('transaction_id')->nullable();
            $table->boolean('is_paid')->false();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('subscription_plan_user', function (Blueprint $table) {
            $table->dropColumn('transaction_id');
            $table->dropColumn('is_paid');
        });
    }
};
