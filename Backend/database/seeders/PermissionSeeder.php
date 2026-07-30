<?php

namespace Database\Seeders;

use App\Models\{Role, RoleTranslation, Permission, PermissionTranslation};
use App\Services\TranslationService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Route;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $routesNamesList = array();
        $routeCollection = Route::getRoutes();

        foreach ($routeCollection as $index => $value) {

            if ($value->getActionName() != null && startsWith($value->getActionName(), 'App\Http\Controllers\Api\Dashboard')) {

                $routeName = $value->getName();

                if (! str_contains($routeName, 'profile') && ! str_contains($routeName, 'role') && ! str_contains($routeName, 'permission')) {

                    if (str_contains($routeName, '.index')) {

                        $routesNamesList[$index]['back_name'] = $routeName;

                        $subject = $routeName;
                        $search = '.index';
                        $trimmed = str_replace($search, '', $subject);

                        $routesNamesList[$index]['front_name'] = $trimmed . '/show-all';
                        $routesNamesList[$index]['title']      = 'get all ' . $trimmed;
                    } elseif (str_contains($routeName, '.store')) {

                        $routesNamesList[$index]['back_name'] = $routeName;

                        $subject = $routeName;
                        $search = '.store';
                        $trimmed = str_replace($search, '', $subject);

                        $routesNamesList[$index]['front_name'] = $trimmed . '/add';
                        $routesNamesList[$index]['title']      = 'add ' . $trimmed;
                    } elseif (str_contains($routeName, '.show')) {

                        $routesNamesList[$index]['back_name'] = $routeName;

                        $subject = $routeName;
                        $search = '.show';
                        $trimmed = str_replace($search, '', $subject);

                        $routesNamesList[$index]['front_name'] = $trimmed . '/show';
                        $routesNamesList[$index]['title']      = 'show ' . $trimmed;
                    } elseif (str_contains($routeName, '.update_')) {

                        $routesNamesList[$index]['back_name'] = $routeName;

                        $subject = $routeName;
                        $search = '.update_';
                        $trimmed = str_replace($search, '', $subject);

                        $routesNamesList[$index]['front_name'] = $trimmed . '/edit';
                        $routesNamesList[$index]['title']      = 'update ' . $trimmed;
                    } elseif (str_contains($routeName, '.update')) {

                        $routesNamesList[$index]['back_name'] = $routeName;

                        $subject = $routeName;
                        $search = '.update';
                        $trimmed = str_replace($search, '', $subject);

                        $routesNamesList[$index]['front_name'] = $trimmed . '/edit';
                        $routesNamesList[$index]['title']      = 'update ' . $trimmed;
                    } elseif (str_contains($routeName, '.destroy')) {

                        $routesNamesList[$index]['back_name'] = $routeName;

                        $subject = $routeName;
                        $search = '.destroy';
                        $trimmed = str_replace($search, '', $subject);

                        $routesNamesList[$index]['front_name'] = $trimmed . '/delete';
                        $routesNamesList[$index]['title']      = 'delete ' . $trimmed;
                    } elseif (str_contains($routeName, '.get')) {

                        $routesNamesList[$index]['back_name'] = $routeName;

                        $subject = $routeName;
                        $search = '.get';
                        $trimmed = str_replace($search, '', $subject);

                        $routesNamesList[$index]['front_name'] = $trimmed . '/show';
                        $routesNamesList[$index]['title']      = 'show ' . $trimmed;
                    }
                }
            }
        }

        // Permission::where('id', '>', 0)->delete();
        // PermissionTranslation::where('id', '>', 0)->delete();

        foreach ($routesNamesList as $perm) {

            $permission_row = Permission::firstOrCreate([
                'front_route_name' => $perm['front_name'],
                'back_route_name'  => $perm['back_name'],
            ])->id;

            foreach (config('translatable.locales') as $locale) {
                $title = $this->transformRouteName($perm['title']);
                PermissionTranslation::firstOrCreate([
                    'locale'        => $locale,
                    'permission_id' => $permission_row,
                ], [
                    'title'         =>  $locale != 'en' ? (new TranslationService())->apiTranslate($title, $locale) : $title,
                    'locale'        => $locale,
                    'permission_id' => $permission_row,
                ]);
            }
        }

        $permission_ids = Permission::pluck('id')->toArray();
        $role           = RoleTranslation::where(['name' => 'admin'])->first();
        if (!$role) {
            $role = Role::create(['en' => ['name' => 'admin'], 'ar' => ['name' => 'admin']]);
        }

        $role->permissions()->sync($permission_ids);
    }

    /**
     * Transform a route name like "Contacts.show" to "Contacts Show".
     *
     * @param string $routeName
     * @return string
     */
    private function transformRouteName($routeName)
    {
        $parts          = explode('.', $routeName);
        $formattedParts = array_map('ucfirst', $parts);

        return implode(' ', $formattedParts);
    }
}
