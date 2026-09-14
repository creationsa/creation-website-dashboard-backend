<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * A project's SEO description now lives only in its linked metadata
     * record (edited from the project's own SEO tab), not duplicated here.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('project_translations', function (Blueprint $table) {
            $table->dropColumn('seo_desc');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_translations', function (Blueprint $table) {
            $table->text('seo_desc')->nullable();
        });
    }
};
