<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $images
 * @property-read mixed $main_image
 * @property-read \App\Models\AppMedia|null $media
 * @property-read \App\Models\AboutTranslation|null $translation
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AboutTranslation> $translations
 * @property-read int|null $translations_count
 * @method static \Illuminate\Database\Eloquent\Builder|About listsTranslations(string $translationField)
 * @method static \Illuminate\Database\Eloquent\Builder|About newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|About newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|About notTranslatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|About orWhereTranslation(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|About orWhereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|About orderByTranslation(string $translationField, string $sortMethod = 'asc')
 * @method static \Illuminate\Database\Eloquent\Builder|About query()
 * @method static \Illuminate\Database\Eloquent\Builder|About translated()
 * @method static \Illuminate\Database\Eloquent\Builder|About translatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|About whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|About whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|About whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|About whereTranslation(string $translationField, $value, ?string $locale = null, string $method = 'whereHas', string $operator = '=')
 * @method static \Illuminate\Database\Eloquent\Builder|About whereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|About whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|About withTranslation(?string $locale = null)
 */
	class About extends \Eloquent implements \Astrotomic\Translatable\Contracts\Translatable {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $about_id
 * @property string $title
 * @property string $desc
 * @property string|null $slug
 * @property string $locale
 * @method static \Illuminate\Database\Eloquent\Builder|AboutTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AboutTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AboutTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|AboutTranslation whereAboutId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AboutTranslation whereDesc($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AboutTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AboutTranslation whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AboutTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AboutTranslation whereTitle($value)
 */
	class AboutTranslation extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $app_mediaable_type
 * @property int $app_mediaable_id
 * @property string|null $media
 * @property string|null $media_type
 * @property string|null $short_link
 * @property string|null $option
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $app_mediaable
 * @property-read mixed $file_name
 * @property-read mixed $path
 * @property-read mixed $storage_path
 * @property-read \App\Models\AppMediaTranslation|null $translation
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AppMediaTranslation> $translations
 * @property-read int|null $translations_count
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia listsTranslations(string $translationField)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia notTranslatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia orWhereTranslation(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia orWhereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia orderByTranslation(string $translationField, string $sortMethod = 'asc')
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia query()
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia translated()
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia translatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia whereAppMediaableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia whereAppMediaableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia whereMedia($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia whereMediaType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia whereOption($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia whereShortLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia whereTranslation(string $translationField, $value, ?string $locale = null, string $method = 'whereHas', string $operator = '=')
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia whereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMedia withTranslation(?string $locale = null)
 */
	class AppMedia extends \Eloquent implements \Astrotomic\Translatable\Contracts\Translatable {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $app_media_id
 * @property string $alt
 * @property string $locale
 * @method static \Illuminate\Database\Eloquent\Builder|AppMediaTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppMediaTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppMediaTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|AppMediaTranslation whereAlt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMediaTranslation whereAppMediaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMediaTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppMediaTranslation whereLocale($value)
 */
	class AppMediaTranslation extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int|null $parent_id
 * @property int $is_active
 * @property string $type
 * @property \MatanYadaev\EloquentSpatial\Objects\Geometry $area
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Scooter> $bicyclesType
 * @property-read int|null $bicycles_type_count
 * @property-read Area|null $parent
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Scooter> $scooters
 * @property-read int|null $scooters_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Scooter> $scootersType
 * @property-read int|null $scooters_type_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Area> $stopAreas
 * @property-read int|null $stop_areas_count
 * @property-read \App\Models\AreaTranslation|null $translation
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AreaTranslation> $translations
 * @property-read int|null $translations_count
 * @method static \Illuminate\Database\Eloquent\Builder|Area listsTranslations(string $translationField)
 * @method static \Illuminate\Database\Eloquent\Builder|Area newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Area newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Area notTranslatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Area orWhereTranslation(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Area orWhereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Area orderByDistance(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $direction = 'asc')
 * @method static \Illuminate\Database\Eloquent\Builder|Area orderByDistanceSphere(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $direction = 'asc')
 * @method static \Illuminate\Database\Eloquent\Builder|Area orderByTranslation(string $translationField, string $sortMethod = 'asc')
 * @method static \Illuminate\Database\Eloquent\Builder|Area query()
 * @method static \Illuminate\Database\Eloquent\Builder|Area translated()
 * @method static \Illuminate\Database\Eloquent\Builder|Area translatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereArea($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereContains(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereCrosses(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereDisjoint(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereDistance(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $operator, int|float $value)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereDistanceSphere(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $operator, int|float $value)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereEquals(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereIntersects(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereNotContains(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereNotWithin(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereOverlaps(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereSrid(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, string $operator, int|float $value)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereTouches(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereTranslation(string $translationField, $value, ?string $locale = null, string $method = 'whereHas', string $operator = '=')
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Area whereWithin(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Area withCentroid(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, string $alias = 'centroid')
 * @method static \Illuminate\Database\Eloquent\Builder|Area withDistance(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $alias = 'distance')
 * @method static \Illuminate\Database\Eloquent\Builder|Area withDistanceSphere(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $alias = 'distance')
 * @method static \Illuminate\Database\Eloquent\Builder|Area withTranslation(?string $locale = null)
 */
	class Area extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int|null $area_id
 * @property int|null $scooter_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|AreaScooter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AreaScooter newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AreaScooter query()
 * @method static \Illuminate\Database\Eloquent\Builder|AreaScooter whereAreaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaScooter whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaScooter whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaScooter whereScooterId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaScooter whereUpdatedAt($value)
 */
	class AreaScooter extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $area_id
 * @property string $title
 * @property string $locale
 * @method static \Illuminate\Database\Eloquent\Builder|AreaTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AreaTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AreaTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|AreaTranslation whereAreaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaTranslation whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AreaTranslation whereTitle($value)
 */
	class AreaTranslation extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $active_user_number
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Message> $messages
 * @property-read int|null $messages_count
 * @method static \Illuminate\Database\Eloquent\Builder|Chat newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat query()
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereActiveUserNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chat whereUpdatedAt($value)
 */
	class Chat extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $country_id
 * @property float|null $lat
 * @property float|null $lng
 * @property string|null $location
 * @property string|null $postal_code
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $clients
 * @property-read int|null $clients_count
 * @property-read \App\Models\Country $country
 * @property-read \App\Models\CityTranslation|null $translation
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CityTranslation> $translations
 * @property-read int|null $translations_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|City listsTranslations(string $translationField)
 * @method static \Illuminate\Database\Eloquent\Builder|City newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|City newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|City notTranslatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|City orWhereTranslation(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|City orWhereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|City orderByTranslation(string $translationField, string $sortMethod = 'asc')
 * @method static \Illuminate\Database\Eloquent\Builder|City query()
 * @method static \Illuminate\Database\Eloquent\Builder|City translated()
 * @method static \Illuminate\Database\Eloquent\Builder|City translatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|City whereCountryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|City whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|City whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|City whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|City whereLat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|City whereLng($value)
 * @method static \Illuminate\Database\Eloquent\Builder|City whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|City wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|City whereTranslation(string $translationField, $value, ?string $locale = null, string $method = 'whereHas', string $operator = '=')
 * @method static \Illuminate\Database\Eloquent\Builder|City whereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|City whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|City withTranslation(?string $locale = null)
 */
	class City extends \Eloquent implements \Astrotomic\Translatable\Contracts\Translatable {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $city_id
 * @property string $name
 * @property string|null $short_name
 * @property string|null $slug
 * @property string $locale
 * @method static \Illuminate\Database\Eloquent\Builder|CityTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CityTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CityTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|CityTranslation whereCityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CityTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CityTranslation whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CityTranslation whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CityTranslation whereShortName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CityTranslation whereSlug($value)
 */
	class CityTranslation extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int|null $user_id
 * @property string|null $full_name
 * @property string|null $type
 * @property string|null $email
 * @property string|null $phone
 * @property string|null $title
 * @property string|null $content
 * @property \Illuminate\Support\Carbon|null $read_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $image
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ContactReply> $replies
 * @property-read int|null $replies_count
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|Contact newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact published()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact query()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact readMessages()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact unReadMessages()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereReadAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereUserId($value)
 */
	class Contact extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int|null $contact_id
 * @property int|null $sender_id
 * @property int|null $receiver_id
 * @property string|null $reply
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ContactReply newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactReply newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactReply query()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactReply whereContactId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactReply whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactReply whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactReply whereReceiverId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactReply whereReply($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactReply whereSenderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactReply whereUpdatedAt($value)
 */
	class ContactReply extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string|null $phone_code
 * @property string|null $flag
 * @property int|null $phone_number_limit
 * @property int|null $national_id_limit
 * @property string $continent
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\City> $cities
 * @property-read int|null $cities_count
 * @property-read Country|null $country
 * @property-read \App\Models\AppMedia|null $media
 * @property-read \App\Models\CountryTranslation|null $translation
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CountryTranslation> $translations
 * @property-read int|null $translations_count
 * @method static \Illuminate\Database\Eloquent\Builder|Country listsTranslations(string $translationField)
 * @method static \Illuminate\Database\Eloquent\Builder|Country newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Country newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Country notTranslatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Country orWhereTranslation(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Country orWhereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Country orderByTranslation(string $translationField, string $sortMethod = 'asc')
 * @method static \Illuminate\Database\Eloquent\Builder|Country query()
 * @method static \Illuminate\Database\Eloquent\Builder|Country translated()
 * @method static \Illuminate\Database\Eloquent\Builder|Country translatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereContinent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereFlag($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereNationalIdLimit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country wherePhoneCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country wherePhoneNumberLimit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereTranslation(string $translationField, $value, ?string $locale = null, string $method = 'whereHas', string $operator = '=')
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Country whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Country withTranslation(?string $locale = null)
 */
	class Country extends \Eloquent implements \Astrotomic\Translatable\Contracts\Translatable {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $country_id
 * @property string $name
 * @property string|null $currency
 * @property string|null $slug
 * @property string|null $nationality
 * @property string|null $short_name
 * @property string $locale
 * @method static \Illuminate\Database\Eloquent\Builder|CountryTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CountryTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CountryTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|CountryTranslation whereCountryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CountryTranslation whereCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CountryTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CountryTranslation whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CountryTranslation whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CountryTranslation whereNationality($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CountryTranslation whereShortName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CountryTranslation whereSlug($value)
 */
	class CountryTranslation extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $code
 * @property int $is_active
 * @property string|null $start_date
 * @property string|null $start_time
 * @property string|null $end_date
 * @property string|null $end_time
 * @property float $amount
 * @property string $amount_type
 * @property float|null $max_discount_value
 * @property int|null $number_of_times_used_for_user
 * @property int|null $number_of_times_used
 * @property int|null $max_number_of_users
 * @property int $users_used_count
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon available($number_of_times_used_for_user = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon query()
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon whereAmountType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon whereMaxDiscountValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon whereMaxNumberOfUsers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon whereNumberOfTimesUsed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon whereNumberOfTimesUsedForUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Coupon whereUsersUsedCount($value)
 */
	class Coupon extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $device_token
 * @property string $type
 * @property int|null $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|Device newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Device newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Device query()
 * @method static \Illuminate\Database\Eloquent\Builder|Device whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Device whereDeviceToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Device whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Device whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Device whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Device whereUserId($value)
 */
	class Device extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int|null $added_by_id
 * @property string|null $phone
 * @property string|null $phone_code
 * @property string|null $code
 * @property string|null $verified_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|EditPhone newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EditPhone newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|EditPhone query()
 * @method static \Illuminate\Database\Eloquent\Builder|EditPhone whereAddedById($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EditPhone whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EditPhone whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EditPhone whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EditPhone wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EditPhone wherePhoneCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EditPhone whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|EditPhone whereVerifiedAt($value)
 */
	class EditPhone extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $chat_id
 * @property int $user_id
 * @property string|null $message
 * @property string $message_type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Chat $chat
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Message newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Message newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Message query()
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereChatId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereMessageType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereUserId($value)
 */
	class Message extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string|null $metadataable_type
 * @property int|null $metadataable_id
 * @property string|null $for
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $image
 * @property-read \App\Models\MetadataTranslation|null $translation
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\MetadataTranslation> $translations
 * @property-read int|null $translations_count
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata listsTranslations(string $translationField)
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata notTranslatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata orWhereTranslation(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata orWhereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata orderByTranslation(string $translationField, string $sortMethod = 'asc')
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata query()
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata translated()
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata translatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata whereFor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata whereMetadataableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata whereMetadataableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata whereTranslation(string $translationField, $value, ?string $locale = null, string $method = 'whereHas', string $operator = '=')
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata whereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Metadata withTranslation(?string $locale = null)
 */
	class Metadata extends \Eloquent implements \Astrotomic\Translatable\Contracts\Translatable {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $metadata_id
 * @property string $image
 * @property string $canonical_tags
 * @property string $title
 * @property string $type
 * @property string $description
 * @property string $keywords
 * @property string $locale
 * @method static \Illuminate\Database\Eloquent\Builder|MetadataTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MetadataTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MetadataTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|MetadataTranslation whereCanonicalTags($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetadataTranslation whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetadataTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetadataTranslation whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetadataTranslation whereKeywords($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetadataTranslation whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetadataTranslation whereMetadataId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetadataTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MetadataTranslation whereType($value)
 */
	class MetadataTranslation extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property float $price_before
 * @property float $price_after
 * @property int $is_active
 * @property int $num_users_used
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PackageTranslation|null $translation
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PackageTranslation> $translations
 * @property-read int|null $translations_count
 * @method static \Illuminate\Database\Eloquent\Builder|Package listsTranslations(string $translationField)
 * @method static \Illuminate\Database\Eloquent\Builder|Package newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Package newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Package notTranslatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Package orWhereTranslation(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Package orWhereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Package orderByTranslation(string $translationField, string $sortMethod = 'asc')
 * @method static \Illuminate\Database\Eloquent\Builder|Package query()
 * @method static \Illuminate\Database\Eloquent\Builder|Package translated()
 * @method static \Illuminate\Database\Eloquent\Builder|Package translatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereNumUsersUsed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Package wherePriceAfter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Package wherePriceBefore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereTranslation(string $translationField, $value, ?string $locale = null, string $method = 'whereHas', string $operator = '=')
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Package whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Package withTranslation(?string $locale = null)
 */
	class Package extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $package_id
 * @property string|null $title
 * @property string $locale
 * @method static \Illuminate\Database\Eloquent\Builder|PackageTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PackageTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PackageTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|PackageTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PackageTranslation whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PackageTranslation wherePackageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PackageTranslation whereTitle($value)
 */
	class PackageTranslation extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $type
 * @property int|null $ordering
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $image
 * @property-read \App\Models\AppMedia|null $media
 * @property-read \App\Models\PageTranslation|null $translation
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PageTranslation> $translations
 * @property-read int|null $translations_count
 * @method static \Illuminate\Database\Eloquent\Builder|Page listsTranslations(string $translationField)
 * @method static \Illuminate\Database\Eloquent\Builder|Page newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Page newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Page notTranslatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Page orWhereTranslation(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Page orWhereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Page orderByTranslation(string $translationField, string $sortMethod = 'asc')
 * @method static \Illuminate\Database\Eloquent\Builder|Page query()
 * @method static \Illuminate\Database\Eloquent\Builder|Page translated()
 * @method static \Illuminate\Database\Eloquent\Builder|Page translatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereOrdering($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereTranslation(string $translationField, $value, ?string $locale = null, string $method = 'whereHas', string $operator = '=')
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page withTranslation(?string $locale = null)
 */
	class Page extends \Eloquent implements \Astrotomic\Translatable\Contracts\Translatable {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $page_id
 * @property string $title
 * @property string $desc
 * @property string $locale
 * @method static \Illuminate\Database\Eloquent\Builder|PageTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PageTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PageTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|PageTranslation whereDesc($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PageTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PageTranslation whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PageTranslation wherePageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PageTranslation whereTitle($value)
 */
	class PageTranslation extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string|null $front_route_name
 * @property string|null $back_route_name
 * @property string|null $icon
 * @property int|null $is_control_permission
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $admin_permissions
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Role> $roles
 * @property-read int|null $roles_count
 * @property-read \App\Models\PermissionTranslation|null $translation
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PermissionTranslation> $translations
 * @property-read int|null $translations_count
 * @method static \Illuminate\Database\Eloquent\Builder|Permission listsTranslations(string $translationField)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Permission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Permission notTranslatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission orWhereTranslation(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission orWhereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission orderByTranslation(string $translationField, string $sortMethod = 'asc')
 * @method static \Illuminate\Database\Eloquent\Builder|Permission query()
 * @method static \Illuminate\Database\Eloquent\Builder|Permission translated()
 * @method static \Illuminate\Database\Eloquent\Builder|Permission translatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereBackRouteName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereFrontRouteName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereIsControlPermission($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereTranslation(string $translationField, $value, ?string $locale = null, string $method = 'whereHas', string $operator = '=')
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission withTranslation(?string $locale = null)
 */
	class Permission extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $title
 * @property string $locale
 * @property int $permission_id
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionTranslation whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionTranslation wherePermissionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionTranslation whereTitle($value)
 */
	class PermissionTranslation extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property int|null $country_id
 * @property int|null $city_id
 * @property float|null $lat
 * @property float|null $lng
 * @property string|null $location_description
 * @property string|null $last_login_at
 * @property string|null $allow_session_from
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\City|null $city
 * @property-read \App\Models\Country|null $country
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Profile nearest($latitude, $longitude)
 * @method static \Illuminate\Database\Eloquent\Builder|Profile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Profile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Profile query()
 * @method static \Illuminate\Database\Eloquent\Builder|Profile whereAllowSessionFrom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Profile whereCityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Profile whereCountryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Profile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Profile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Profile whereLastLoginAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Profile whereLat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Profile whereLng($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Profile whereLocationDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Profile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Profile whereUserId($value)
 */
	class Profile extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \App\Models\RoleTranslation|null $translation
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RoleTranslation> $translations
 * @property-read int|null $translations_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Role listsTranslations(string $translationField)
 * @method static \Illuminate\Database\Eloquent\Builder|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role notTranslatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Role orWhereTranslation(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Role orWhereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Role orderByTranslation(string $translationField, string $sortMethod = 'asc')
 * @method static \Illuminate\Database\Eloquent\Builder|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder|Role translated()
 * @method static \Illuminate\Database\Eloquent\Builder|Role translatedIn(?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereTranslation(string $translationField, $value, ?string $locale = null, string $method = 'whereHas', string $operator = '=')
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereTranslationLike(string $translationField, $value, ?string $locale = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role withTranslation(?string $locale = null)
 */
	class Role extends \Eloquent implements \Astrotomic\Translatable\Contracts\Translatable {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $role_id
 * @property string $name
 * @property string|null $slug
 * @property string|null $desc
 * @property string $locale
 * @method static \Illuminate\Database\Eloquent\Builder|RoleTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoleTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoleTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|RoleTranslation whereDesc($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoleTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoleTranslation whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoleTranslation whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoleTranslation whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoleTranslation whereSlug($value)
 */
	class RoleTranslation extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int|null $area_id
 * @property string $number
 * @property string $serial_number
 * @property string $type
 * @property int $is_active
 * @property int $in_order
 * @property \MatanYadaev\EloquentSpatial\Objects\Geometry $init_location
 * @property \MatanYadaev\EloquentSpatial\Objects\Geometry $location
 * @property string|null $year_of_manufacture
 * @property int|null $last_battery_percentage
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Area|null $area
 * @property-read mixed $base_fare
 * @property-read mixed $can_use_it
 * @property-read mixed $can_use_it_depending_on_balance
 * @property-read mixed $gift_mony
 * @property-read mixed $image
 * @property-read mixed $image_show
 * @property-read mixed $price_per_minute
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Area> $greenAreas
 * @property-read int|null $green_areas_count
 * @property-read \App\Models\AppMedia|null $media
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Trip> $trips
 * @property-read int|null $trips_count
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter available()
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter orderByDistance(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $direction = 'asc')
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter orderByDistanceSphere(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $direction = 'asc')
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter query()
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereAreaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereContains(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereCrosses(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereDisjoint(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereDistance(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $operator, int|float $value)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereDistanceSphere(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $operator, int|float $value)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereEquals(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereInOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereInitLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereIntersects(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereLastBatteryPercentage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereNotContains(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereNotWithin(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereOverlaps(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereSerialNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereSrid(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, string $operator, int|float $value)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereTouches(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereWithin(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter whereYearOfManufacture($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter withCentroid(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, string $alias = 'centroid')
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter withDistance(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $alias = 'distance')
 * @method static \Illuminate\Database\Eloquent\Builder|Scooter withDistanceSphere(\Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $column, \Illuminate\Contracts\Database\Query\Expression|\MatanYadaev\EloquentSpatial\Objects\Geometry|string $geometryOrColumn, string $alias = 'distance')
 */
	class Scooter extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string|null $key
 * @property string|null $value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Setting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting query()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereValue($value)
 */
	class Setting extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int|null $user_id
 * @property int|null $scooter_id
 * @property int|null $coupon_id
 * @property int|null $start_area_id
 * @property int|null $end_area_id
 * @property array|null $scooter_data
 * @property string|null $scooter_type
 * @property float|null $first_lat
 * @property float|null $first_lng
 * @property string|null $first_location
 * @property float|null $end_lat
 * @property float|null $end_lng
 * @property string|null $end_location
 * @property string|null $outside_area_at
 * @property string $status
 * @property array|null $status_times
 * @property array|null $actual_path
 * @property float|null $distance
 * @property float|null $time
 * @property float|null $base_fare
 * @property float|null $price_per_minute
 * @property float $gift_mony
 * @property float $discount_amount
 * @property float $price_before_discount
 * @property float|null $price
 * @property float|null $rate
 * @property string|null $comment
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Coupon|null $coupon
 * @property-read \App\Models\Area|null $endArea
 * @property-read mixed $end_time
 * @property-read mixed $image
 * @property-read mixed $image_show
 * @property-read mixed $start_location
 * @property-read mixed $start_time
 * @property-read mixed $status_times_data
 * @property-read mixed $waiting_time_to_start
 * @property-read \App\Models\AppMedia|null $media
 * @property-read \App\Models\Scooter|null $scooter
 * @property-read \App\Models\Area|null $startArea
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|Trip newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Trip newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Trip query()
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereActualPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereBaseFare($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereCouponId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereDiscountAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereDistance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereEndAreaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereEndLat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereEndLng($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereEndLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereFirstLat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereFirstLng($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereFirstLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereGiftMony($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereOutsideAreaAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip wherePriceBeforeDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip wherePricePerMinute($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereScooterData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereScooterId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereScooterType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereStartAreaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereStatusTimes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Trip whereUserId($value)
 */
	class Trip extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string|null $full_name
 * @property string|null $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $phone_code
 * @property string|null $phone
 * @property \Illuminate\Support\Carbon|null $phone_verified_at
 * @property string|null $password
 * @property int $is_admin_active_user
 * @property int|null $is_ban
 * @property string|null $ban_reason
 * @property string|null $reset_code
 * @property string|null $user_type
 * @property string|null $gender
 * @property string|null $locale
 * @property int $allow_notification
 * @property string|null $promotional_code
 * @property string|null $promotional_code_used
 * @property float|null $promotional_balance
 * @property int $is_completed_data
 * @property string|null $remember_token
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $role_id
 * @property-read \App\Models\Country|null $country
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Device> $devices
 * @property-read int|null $devices_count
 * @property-read mixed $image
 * @property-read mixed $last_login_at
 * @property-read mixed $name
 * @property-read mixed $promotional_code_used_count
 * @property-read \App\Models\AppMedia|null $media
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \App\Models\Profile|null $profile
 * @property-read \Illuminate\Database\Eloquent\Collection<int, User> $referrals
 * @property-read int|null $referrals_count
 * @property-read User|null $referrer
 * @property-read \App\Models\Role|null $role
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Trip> $trips
 * @property-read int|null $trips_count
 * @property-read \App\Models\Wallet|null $wallet
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAllowNotification($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereBanReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereIsAdminActiveUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereIsBan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereIsCompletedData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePhoneCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePhoneVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePromotionalBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePromotionalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePromotionalCodeUsed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereResetCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUserType($value)
 */
	class User extends \Eloquent implements \Tymon\JWTAuth\Contracts\JWTSubject {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $user_id
 * @property float $balance
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\WalletTransaction> $transactions
 * @property-read int|null $transactions_count
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet query()
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet whereBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Wallet whereUserId($value)
 */
	class Wallet extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $wallet_id
 * @property int $user_id
 * @property string|null $modelable_type
 * @property int|null $modelable_id
 * @property float|null $balance_before
 * @property float|null $balance_after
 * @property float|null $amount
 * @property string $type
 * @property string $status
 * @property string|null $reference
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent|null $modelable
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Wallet $wallet
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereBalanceAfter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereBalanceBefore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereModelableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereModelableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereReference($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WalletTransaction whereWalletId($value)
 */
	class WalletTransaction extends \Eloquent {}
}

