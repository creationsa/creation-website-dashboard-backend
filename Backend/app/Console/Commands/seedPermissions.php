<?php

namespace App\Console\Commands;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;

class seedPermissions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'permissions:seed {--role}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed permissions into database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $path = storage_path('permission.json');

        if (!File::exists($path)) {
            Artisan::call('permissions:search');
        }

        $counts = $this->seed($path);

        if ($this->option('role')) {
            $data = [];
            foreach (config('translatable.locales') as $locale) {
                $data[$locale] = [
                    'name' => __('Super Admin', locale: $locale)
                ];
            }

            $existingRole = Role::where('status', true)->first();

            $role = Role::updateOrCreate(
                ['id' => $existingRole ? $existingRole->id : null],
                $data
            );

            $permissions = Permission::pluck('id')->toArray();
            $role->permissions()->sync($permissions);
        }

        User::where('user_type', 'super_admin')->update(['role_id' => $role->id]);

        $this->info($counts . " permission key was created");
    }

    private function seed($path): int
    {
        $permissions = json_decode(file_get_contents($path), true);
        $new         = 0;
        foreach ($permissions as $permission => $translations) {
            $p = Permission::query()
                ->updateOrCreate(
                    ['name' => $permission],
                    $translations
                );
            if ($p->wasRecentlyCreated) {
                $new++;
            }
        }
        return $new;
    }
}
