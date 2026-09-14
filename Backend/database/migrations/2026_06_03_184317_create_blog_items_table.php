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
        Schema::create('blog_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blog_id')->constrained('blogs')->cascadeOnDelete();
            $table->timestamps();
        });

        Schema::create('blog_item_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blog_item_id')->constrained('blog_items')->cascadeOnDelete();
            $table->text('desc')->nullable();
            $table->string('locale')->index();
            $table->unique(['blog_item_id', 'locale']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blog_item_translations');
        Schema::dropIfExists('blog_items');
    }
};
