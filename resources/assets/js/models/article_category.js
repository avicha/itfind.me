import $ from 'jquery';
class ArticleCategory {
    static list(callback) {
        $.ajax('/article_category', {
            success: (res) => {
                callback(null, res.data);
            },
            error: (xhr, response, error) => {
                callback(xhr.responseText);
            }
        });
    }
}