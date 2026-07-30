<?php

use App\Models\PlanFeature;
use App\Models\SubscriptionPlan;
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
        Schema::create('plan_features', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(SubscriptionPlan::class)->constrained()->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('plan_feature_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(PlanFeature::class)->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('locale')->index();
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
        Schema::dropIfExists('plan_feature_translations');
        Schema::dropIfExists('plan_features');
    }
};
