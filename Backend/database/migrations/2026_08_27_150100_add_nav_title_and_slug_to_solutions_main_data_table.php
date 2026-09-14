<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('solutions_main_data', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('id');
        });

        Schema::table('solutions_main_data_translations', function (Blueprint $table) {
            $table->string('nav_title')->nullable()->after('solutions_main_data_id');
        });
    }

    public function down()
    {
        Schema::table('solutions_main_data', function (Blueprint $table) {
            $table->dropColumn('slug');
        });

        Schema::table('solutions_main_data_translations', function (Blueprint $table) {
            $table->dropColumn('nav_title');
        });
    }
};
