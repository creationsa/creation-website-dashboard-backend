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
        Schema::table('sliders', function (Blueprint $table) {
            $table->string('type')->nullable();     // normal - link - category
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->string('link')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sliders', function (Blueprint $table) {
            $table->dropColumn('type');
            $table->dropForeign('sliders_category_id_foreign');
            $table->dropColumn('category_id');
            $table->dropColumn('link');
        });
    }
};
