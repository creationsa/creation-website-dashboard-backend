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
            $table->string('answered_by')->nullable();
            $table->foreignId('answered_by_id')->nullable()->constrained('users')->nullOnDelete();
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
            $table->dropForeign(['answered_by_id']);
            $table->dropColumn('answered_by_id');
            $table->dropColumn('answered_by');
        });
    }
};
