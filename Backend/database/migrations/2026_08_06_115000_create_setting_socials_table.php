<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // A dynamic, admin-managed list (starts with one entry, grows
        // freely) — replaces the old fixed instagram/facebook/behance/
        // linkedin columns. No parent id: there's only ever one site-wide
        // list, same reasoning as the flat `settings` key/value table.
        Schema::create('setting_socials', function (Blueprint $table) {
            $table->id();
            $table->string('title_en');
            $table->string('title_ar');
            $table->string('link');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('setting_socials');
    }
};
