<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('solutions_main_data_translations', function (Blueprint $table) {
            $table->longText('core_sub_desc')->nullable()->after('core_desc');
        });
    }

    public function down()
    {
        Schema::table('solutions_main_data_translations', function (Blueprint $table) {
            $table->dropColumn('core_sub_desc');
        });
    }
};
