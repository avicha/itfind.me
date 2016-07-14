<?php

namespace App\Listeners;

use App\Events\ArticleRead;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ArticleReadListener
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
     * @param  ArticleRead  $event
     * @return void
     */
    public function handle(ArticleRead $event)
    {
        $article = $event->article;
        $article->increment('views_count');
    }
}
