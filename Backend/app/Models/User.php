<?php

namespace App\Models;

use App\Observers\UserObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, HasFactory;

    const CLIENT = "client";
    const ADMIN = "admin";
    const SUPER_ADMIN = "super_admin";

    protected $guarded = ['id', 'created_at', 'updated_at', 'deleted_at'];
    protected $hidden = ['password', 'remember_token'];
    protected $casts = ['email_verified_at' => 'datetime', 'phone_verified_at' => 'datetime'];

    protected static function boot()
    {
        parent::boot();
        User::observe(UserObserver::class);
    }

    public function setPasswordAttribute($value)
    {
        if ($value) {
            $this->attributes['password'] = bcrypt($value);
        }
    }

    public function subscriptionPlans()
    {
        return $this->belongsToMany(SubscriptionPlan::class)->withTimestamps();
    }

    public function subscriptionPlanUsers()
    {
        return $this->hasMany(SubscriptionPlanUser::class, 'user_id');
    }

    public function favorites()
    {
        return $this->belongsToMany(Template::class, Favorite::class);
    }

    public function favoritesModel()
    {
        return $this->hasMany(Favorite::class);
    }

    public function getImageAttribute($key)
    {
        $media = $this->media()->first();
        $image = $media ? asset('storage/images/users/' . $media->media) : asset('assets/images/default/default.jpeg');
        return $image;
    }

    public function getLastLoginAtAttribute($key)
    {
        return $this->profile?->last_login_at;
    }

    public function getNameAttribute()
    {
        return $this->attributes['full_name'];
    }

    public function media()
    {
        return $this->morphOne(AppMedia::class, 'app_mediaable');
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'phone_code', 'phone_code');
    }

    public function devices()
    {
        return $this->hasMany(Device::class);
    }

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    // Roles & Permissions
    // Roles & Permissions
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function social()
    {
        return $this->hasOne(SocialLogin::class);
    }

    public function permissions()
    {
        return $this->role ? @$this->role->permissions : [];
    }

    public function back_route_name_permissions()
    {
        return $this->role ? @$this->role->permissions()->pluck('back_route_name')->toArray() : [];
    }

    public function hasRole($role)
    {
        return $this->role ? @$this->role->name == $role : false;
    }

    public function hasPermission($permission)
    {
        if (($this->back_route_name_permissions() != null && !empty($this->back_route_name_permissions()))) {

            if (in_array($permission, $this->back_route_name_permissions())) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function hasPermissions($route, $method = null)
    {
        if ($this->user_type == 'supper_admin') {
            return true;
        }
        if (is_null($method)) {
            if ($this->role->permissions->contains('route_name', $route . ".index")) {
                return true;
            } elseif ($this->role->permissions->contains('route_name', $route . ".store")) {
                return true;
            } elseif ($this->role->permissions->contains('route_name', $route . ".update")) {
                return true;
            } elseif ($this->role->permissions->contains('route_name', $route . ".destroy")) {
                return true;
            } elseif ($this->role->permissions->contains('route_name', $route . ".show")) {
                return true;
            } elseif ($this->role->permissions->contains('route_name', $route . ".wallet")) {
                return true;
            }
        } else {
            return $this->role->permissions->contains('route_name', $route . "." . $method);
        }
        return false;
    }

    // For Notification Channel
    public function receivesBroadcastNotificationsOn()
    {
        return 'base8-notification.' . $this->id;
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'last_login_at' => now(),
            'timezone' => config('app.timezone'),
        ];
    }
}
