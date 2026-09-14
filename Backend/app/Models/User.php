<?php

namespace App\Models;

use App\Observers\UserObserver;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, HasFactory, SoftDeletes;

    protected $guarded = ['id', 'created_at', 'updated_at', 'deleted_at'];
    protected $hidden  = ['password', 'remember_token'];
    protected $casts   = ['email_verified_at' => 'datetime', 'phone_verified_at' => 'datetime'];

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

    public function getImageAttribute()
    {
        $media = $this->media()->first();
        if ($media && $media->media && file_exists(public_path('storage/images/users/' . $media->media))) {
            return asset('storage/images/users/' . $media->media);
        }
        return asset('assets/images/default/default.jpeg');
    }

    public function getLastLoginAtAttribute($key)
    {
        return $this->profile?->last_login_at;
    }

    public function getPromotionalCodeUsedCountAttribute()
    {
        // return User::whereNotNull('promotional_code_used')->where(['promotional_code_used' => $this->promotional_code])->where('id', '!=', $this->id)->count();
        return $this->referrals()->count();
    }

    public function getNameAttribute()
    {
        return $this->attributes['full_name'];
    }

    public function getFirstNameAttribute()
    {
        return explode(' ', $this->attributes['full_name'])[0] ?? '';
    }

    public function getLastNameAttribute()
    {
        $parts = explode(' ', $this->attributes['full_name']);
        return count($parts) > 1 ? end($parts) : '';
    }

    public function social()
    {
        return $this->hasOne(SocialLogin::class);
    }

    public function media()
    {
        return $this->morphOne(AppMedia::class, 'app_mediaable');
    }

    public function walletTransactions()
    {
        return $this->hasMany(WalletTransaction::class, 'user_id');
    }

    public function country()
    {
        return $this->belongsTo(Country::class, 'phone_code', 'phone_code');
    }

    public function driver()
    {
        return $this->hasOne(Driver::class, 'user_id');
    }

    public function agent()
    {
        return $this->hasOne(Agent::class, 'user_id');
    }

    public function driverOrder()
    {
        return $this->hasMany(DriverOrder::class, 'driver_id');
    }

    public function ordersForDriver()
    {
        return $this->hasMany(Order::class, 'driver_id');
    }
    public function devices()
    {
        return $this->hasMany(Device::class);
    }

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    // public function wallet()
    // {
    //     return $this->hasOne(Wallet::class);
    // }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    public function referrer()
    {
        return $this->belongsTo(User::class, 'promotional_code_used', 'promotional_code');
    }

    public function referrals()
    {
        return $this->hasMany(User::class, 'promotional_code_used', 'promotional_code');
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
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

    public function driverReviews()
    {
        return $this->hasMany(Review::class, 'driver_id');
    }

    public function getDriverAvgRateAttribute()
    {
        return $this->driverReviews()->avg('rate');
    }

    public function hasPermission($permission)
    {
        if (($this->back_route_name_permissions() != null && ! empty($this->back_route_name_permissions()))) {

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
        if ($this->user_type == 'super_admin') {
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
            'timezone'      => config('app.timezone')
        ];
    }

    public function routeNotificationForFcm()
    {
        if (! $this->allow_notification) {
            return [];
        }

        return $this->devices->pluck('device_token', 'type')->toArray();
    }
}
