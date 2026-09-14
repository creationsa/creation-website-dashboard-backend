<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * A solution's gallery item is either a manual upload (already
     * supported) or a live reference to an existing Project — same
     * discriminated pattern just added to solution_main_data_items. Not
     * a real foreign key, so a deleted project just leaves a dangling
     * reference the website silently skips.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('solution_items', function (Blueprint $table) {
            $table->string('source')->default('custom')->after('solution_id');
            $table->unsignedBigInteger('project_id')->nullable()->after('source');
            $table->string('project_media_field')->nullable()->after('project_id');
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::table('solution_items', function (Blueprint $table) {
            $table->dropColumn(['source', 'project_id', 'project_media_field']);
        });
    }
};
