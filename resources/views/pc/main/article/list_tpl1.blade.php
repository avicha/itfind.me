<a class="article" href="/{{ $article->
    blog->user->nick }}/article/{{ $article->id }}" target="_blank">
    <img src="{{ $article->
    image }}" class="image{{ $article->image?'':' none' }}" alt="{{ $article->title }}" />
    <div class="title">
        {{ $article->is_top?'【置顶】':'' }}{{ $article->title }}
        <span class="author">作者：{{ $article->author }}</span>
    </div>
    <p class="desc">
        摘要：{{ html_entity_decode($article->desc, ENT_COMPAT, 'UTF-8') }}...
    </p>
    <div class="meta">
        发布时间：{{ $article->created_at }} 阅读数（{{ $article->views_count }}） 评论（{{ $article->comments_count }}）
    </div>
</a>