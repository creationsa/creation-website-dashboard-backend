<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * `show_in_home`/`home_media_field` are replaced by a single
     * `feature_media_field` — the default image shown wherever this project
     * is referenced from elsewhere (Display Info / Featured Works pickers),
     * independent of the "All Projects" cover.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['show_in_home', 'home_media_field']);
            $table->string('feature_media_field')->nullable()->after('cover_media_field');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['feature_media_field']);
            $table->boolean('show_in_home')->default(false)->after('cover_media_field');
            $table->string('home_media_field')->nullable()->after('show_in_home');
        });
    }
};
