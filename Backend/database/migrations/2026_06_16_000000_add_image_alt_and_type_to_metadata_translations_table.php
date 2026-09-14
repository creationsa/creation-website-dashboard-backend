<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('metadata_translations', function (Blueprint $table) {
            $table->string('image_alt')->nullable()->after('image');
            $table->string('image_type')->nullable()->after('image_alt');
            $table->string('site_name')->nullable()->after('image_type');
        });
    }

    public function down()
    {
        Schema::table('metadata_translations', function (Blueprint $table) {
            $table->dropColumn(['image_alt', 'image_type', 'site_name']);
        });
    }
};
