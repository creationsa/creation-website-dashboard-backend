<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * `cover_media_field`/`home_media_field` hold one of `Project::MEDIA_FIELDS`,
     * picking which uploaded image is used as the thumbnail on the "All
     * Projects" listing and (independently) on the home page.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('cover_media_field')->nullable()->after('stat_three_value');
            $table->boolean('show_in_home')->default(false)->after('cover_media_field');
            $table->string('home_media_field')->nullable()->after('show_in_home');
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
            $table->dropColumn(['cover_media_field', 'show_in_home', 'home_media_field']);
        });
    }
};
