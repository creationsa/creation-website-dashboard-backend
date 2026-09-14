<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('footer_translations', function (Blueprint $table) {
            $table->string('statement_image_alt')->nullable()->after('statement_desc');
            $table->string('menu_title')->nullable()->after('description');
            $table->string('social_title')->nullable()->after('menu_title');
        });
    }

    public function down()
    {
        Schema::table('footer_translations', function (Blueprint $table) {
            $table->dropColumn(['statement_image_alt', 'menu_title', 'social_title']);
        });
    }
};
