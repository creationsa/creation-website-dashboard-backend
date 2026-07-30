<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use Illuminate\Support\Facades\DB;

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
            DB::statement('ALTER TABLE invitation_guests MODIFY personal_note TEXT NULL');
            DB::statement('ALTER TABLE invitation_guests MODIFY comment TEXT NULL');
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
            DB::statement('ALTER TABLE invitation_guests MODIFY personal_note VARCHAR(255) NULL');
            DB::statement('ALTER TABLE invitation_guests MODIFY comment VARCHAR(255) NULL');
        });
    }
};
