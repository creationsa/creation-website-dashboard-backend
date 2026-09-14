<?php

namespace App\Listeners;

use App\Events\LogActionEvent;
use App\Models\LogingAction;
use App\Models\LogingActionTranslation;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use function Psy\info;

class LogActionListener implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\LogActionEvent  $event
     * @return void
     */
    public function handle(LogActionEvent $event)
    {
        $method     = $event->method;
        $title      = $event->title;
        $action_ar  = "";
        $action_en  = "";
        
        \Log::info($method);
        
        switch ($method) {
            case 'GET':
                $action_ar = trans('Show');
                $action_en = trans('Show');
                break;
            case "DELETE":
                $action_ar = trans('Delete');
                $action_en = trans('Delete');
                break;
            case "POST":
                $action_ar = trans('Add');
                $action_en = trans('Add');
                break;
            case "PUT":
                $action_ar = trans('Edit');
                $action_en = trans('Edit');
                break;
            case "PATCH":
                $action_ar = trans('Edit');
                $action_en = trans('Edit');
                break;
            case "HEAD":
                $action_ar = trans('Show');
                $action_en = trans('Show');
                break;
            default:
        }

        LogingAction::create([
            'en' => ['title' => $action_ar . ' ' . trans($title, [], 'en')],
            'ar' => ['title' => $action_ar . ' ' .  trans($title, [], 'ar')],
            'user_id' => $event->user->id,
            'link' => $event->url
        ]);
    }
}
