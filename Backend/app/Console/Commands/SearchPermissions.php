<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class SearchPermissions extends Command
{
    protected $signature   = 'permissions:search {directory=app/Http/Controllers}';
    protected $description = 'Search for permission middleware in controllers and extract permission keys';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $directory = $this->argument('directory');
        if (!File::exists($directory)) {
            $this->error("Directory {$directory} does not exist.");
            return 1;
        }

        $files = File::allFiles($directory);
        $permissions = [];
        $permissionsTable = [];
        $newPermissionsCount = 0;
        $permissionFilePath = storage_path('permission.json');

        // Load existing permissions
        $permissionsOld = $this->loadJsonFile($permissionFilePath);

        foreach ($files as $file) {
            $startTime = now();
            $content   = File::get($file->getPathname());

            preg_match_all('/permission:([a-zA-Z\-]+)/', $content, $matches);
            if (!empty($matches[1])) {
                foreach ($matches[1] as $permission) {
                    $permissionsTable[] = [
                        'file'       => $file->getFilename(),
                        'permission' => $permission,
                    ];
                    if (!isset($permissionsOld[$permission])) {
                        $permissions[$permission] = [
                            'ar' => ['title' => ''],
                            'en' => ['title' => ''],
                        ];
                        $newPermissionsCount++;
                    }
                }
            }

            $this->line("Processed {$file->getFilename()} in {$startTime->diffInMilliseconds(now())}ms");
        }

        // Save new permissions to file
        $this->saveJsonFile($permissionFilePath, $permissions + $permissionsOld);
        $this->saveKeysOnly($permissionFilePath);

        if (!$newPermissionsCount) {
            $this->info('No new permissions found.');
        } else {
            $this->table(['File', 'Permission'], $permissionsTable);
            $this->info("$newPermissionsCount new permissions keys found.");
        }

        return 0;
    }

    private function saveKeysOnly($path)
    {
        $permissions = array_keys($this->loadJsonFile($path));
        $crud        = [];

        foreach ($permissions as $permission) {
            $permParts  = explode('-', $permission, 2);
            $key        = end($permParts); // Last part after splitting
            $crud[$key] = '';
        }

        $crudFilePath = storage_path('cruds.json');
        $crudsOld = $this->loadJsonFile($crudFilePath);

        $this->saveJsonFile($crudFilePath, array_merge($crudsOld, array_keys($crud)));
    }

    private function loadJsonFile($filePath)
    {
        if (!File::exists($filePath)) {
            return [];
        }

        try {
            return json_decode(File::get($filePath), true) ?? [];
        } catch (\Exception $exception) {
            $this->error("Failed to read or decode JSON from {$filePath}");
            return [];
        }
    }

    private function saveJsonFile($filePath, $data)
    {
        try {
            File::put($filePath, json_encode($data, JSON_PRETTY_PRINT));
        } catch (\Exception $exception) {
            $this->error("Failed to save JSON to {$filePath}");
        }
    }
}
