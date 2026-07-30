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
            $table->boolean('is_company_data')->default(0);
            $table->string('company_name')->nullable();
            $table->string('company_address')->nullable();
            $table->string('company_vat_number')->nullable();
            $table->string('company_email')->nullable();
            $table->double('total_price')->nullable();
            $table->double('vat_price')->nullable();
            $table->double('price')->nullable();
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
            $table->dropColumn('is_company_data');
            $table->dropColumn('company_name');
            $table->dropColumn('company_address');
            $table->dropColumn('company_vat_number');
            $table->dropColumn('company_email');
            $table->dropColumn('total_price');
            $table->dropColumn('vat_price');
            $table->dropColumn('price');
        });
    }
};
