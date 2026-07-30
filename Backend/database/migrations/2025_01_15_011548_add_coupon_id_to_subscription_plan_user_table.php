<?php

use App\Models\Coupon;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

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
            $table->double('discount')->nullable();
            $table->foreignIdFor(Coupon::class)->nullable()->constrained()->nullOnDelete();
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
            $table->dropColumn('discount');
            $table->dropForeign('subscription_plan_user_coupon_id_foreign');
            $table->dropColumn('coupon_id');
        });
    }
};
