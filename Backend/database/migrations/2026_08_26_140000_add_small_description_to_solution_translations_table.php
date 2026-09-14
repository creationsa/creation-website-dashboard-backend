<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * A short teaser description shown wherever a Solution is referenced
     * elsewhere (e.g. the Display Info section's left side, when linked to
     * a solution) — distinct from `proposition_desc`, which is the longer
     * paragraph used on the solution's own page.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('solution_translations', function (Blueprint $table) {
            $table->text('small_description')->nullable()->after('proposition_desc');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('solution_translations', function (Blueprint $table) {
            $table->dropColumn('small_description');
        });
    }
};
