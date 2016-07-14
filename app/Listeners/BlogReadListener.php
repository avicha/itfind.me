<?php

namespace App\Listeners;

use App\Events\BlogRead;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class BlogReadListener
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
     * @param  BlogRead  $event
     * @return void
     */
    public function handle(BlogRead $event)
    {
        $blog = $event->blog;
        $blog->increment('views_count');
    }
}
