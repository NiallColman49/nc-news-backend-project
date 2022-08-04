\c nc_news_test

-- SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id =

SELECT * FROM articles *;

SELECT * FROM comments *;

SELECT * FROM topics *;

SELECT * FROM users *;

SELECT articles.article_id, articles.author, title, articles.body, topic, articles.created_at, articles.votes, COUNT(comment_id) AS comment_count 
    FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id 
    GROUP BY articles.article_id
    ORDER BY articles.article_id ASC;

SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id= 3;
