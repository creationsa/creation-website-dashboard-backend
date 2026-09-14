<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * A "What We Offer" item is either manually entered (its own
     * feature_media/title/slug, already on this table) or a live
     * reference to an existing Project — same discriminated pattern as
     * pagesBuilder's Featured Works / Home Blogs Teaser. `project_id` is
     * intentionally not a foreign key: a deleted project should just
     * leave a dangling reference the website silently skips, not cascade
     * or block the delete.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('solution_main_data_items', function (Blueprint $table) {
            $table->string('source')->default('custom')->after('solutions_main_data_id');
            $table->unsignedBigInteger('project_id')->nullable()->after('source');
            $table->string('project_media_field')->nullable()->after('project_id');
        });
    }

    /**
     * @return void
     */
    public function down()
    {
        Schema::table('solution_main_data_items', function (Blueprint $table) {
            $table->dropColumn(['source', 'project_id', 'project_media_field']);
        });
    }
};
