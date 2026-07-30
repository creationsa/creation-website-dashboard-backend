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
            $table->string('added_by')->nullable();
            $table->foreignId('added_by_id')->nullable()->constrained('users')->onDelete('cascade');
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
            $table->dropColumn('added_by');
            $table->dropForeign('users_added_by_id_foreign');
            $table->dropColumn('added_by_id');
        });
    }
};
