<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('solution_accordion_item_translations', function (Blueprint $table) {
            $table->dropColumn('content');
            $table->json('content_blocks')->nullable()->after('title');
        });
    }

    public function down()
    {
        Schema::table('solution_accordion_item_translations', function (Blueprint $table) {
            $table->dropColumn('content_blocks');
            $table->longText('content')->nullable()->after('title');
        });
    }
};
