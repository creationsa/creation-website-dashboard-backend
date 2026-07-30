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
        Schema::table('invitation_guests', function (Blueprint $table) {
            $table->string('status')->default('pending');   // pending - sent
            $table->string('code')->nullable();
            $table->string('personal_note')->nullable();
            $table->string('comment')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('invitation_guests', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->dropColumn('code');
            $table->dropColumn('personal_note');
            $table->dropColumn('comment');
        });
    }
};
