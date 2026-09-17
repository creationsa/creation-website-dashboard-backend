<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * `show_in_home` picked the 2 blogs shown on the homepage before the
 * page-builder's "Blogs Teaser" section (manual per-blog picker) took over
 * that job. Nothing reads or writes it anymore on the dashboard, website,
 * or backend side — confirmed by grepping all three codebases.
 */
return new class extends Migration
{
    public function up()
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->dropColumn('show_in_home');
        });
    }

    public function down()
    {
        Schema::table('blogs', function (Blueprint $table) {
            $table->boolean('show_in_home')->default(false);
        });
    }
};
