<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        if (! Schema::hasTable('metadata') || ! Schema::hasTable('metadata_translations')) {
            return;
        }

        if (! Schema::hasColumn('metadata', 'keywords')) {
            Schema::table('metadata', function (Blueprint $table) {
                $table->longText('keywords')->nullable()->after('for');
            });
        }

        if (Schema::hasColumn('metadata_translations', 'keywords')) {
            $defaultLocale = config('translatable.locale') ?: config('app.locale');

            DB::table('metadata')->orderBy('id')->chunkById(100, function ($metadata) use ($defaultLocale) {
                foreach ($metadata as $item) {
                    $translation = DB::table('metadata_translations')
                        ->where('metadata_id', $item->id)
                        ->where('locale', $defaultLocale)
                        ->first();

                    if (! $translation) {
                        $translation = DB::table('metadata_translations')
                            ->where('metadata_id', $item->id)
                            ->orderBy('id')
                            ->first();
                    }

                    if ($translation && $translation->keywords !== null) {
                        DB::table('metadata')
                            ->where('id', $item->id)
                            ->update(['keywords' => $translation->keywords]);
                    }
                }
            });

            Schema::table('metadata_translations', function (Blueprint $table) {
                $table->dropColumn('keywords');
            });
        }
    }

    public function down()
    {
        if (! Schema::hasTable('metadata') || ! Schema::hasTable('metadata_translations')) {
            return;
        }

        if (! Schema::hasColumn('metadata_translations', 'keywords')) {
            Schema::table('metadata_translations', function (Blueprint $table) {
                $table->longText('keywords')->nullable()->after('description');
            });
        }

        if (Schema::hasColumn('metadata', 'keywords')) {
            DB::table('metadata_translations')
                ->join('metadata', 'metadata.id', '=', 'metadata_translations.metadata_id')
                ->update(['metadata_translations.keywords' => DB::raw('metadata.keywords')]);

            Schema::table('metadata', function (Blueprint $table) {
                $table->dropColumn('keywords');
            });
        }
    }
};
