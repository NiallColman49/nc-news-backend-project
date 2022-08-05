\c nc_news_test

SELECT comment_id, votes, created_at, author, body FROM comments WHERE article_id = $1
