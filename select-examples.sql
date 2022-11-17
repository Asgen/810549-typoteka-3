-- select
--   name,
--   count(category_id)
--   from categories
--   left join articles_categories on id = category_id
--   GROUP by name;

-- SELECT name, count(article_id) FROM categories
--   LEFT JOIN articles_categories
--   ON id = category_id
--   GROUP BY name;

-- SELECT id, name FROM categories
--   JOIN articles_categories
--   ON id = category_id
--   GROUP BY id;

-- SELECT articles.*,
--   COUNT(comments.id) AS comments_count,
--   STRING_AGG(DISTINCT categories.name, ', ') AS category_list,
--   users.first_name,
--   users.last_name,
--   users.email
-- FROM articles
--   JOIN articles_categories ON articles.id = articles_categories.article_id
--   JOIN categories ON articles_categories.category_id = categories.id
--   LEFT JOIN comments ON comments.article_id = articles.id
--   JOIN users ON users.id = articles.user_id
--   GROUP BY articles.id, users.id
--   ORDER BY articles.created_at DESC;

-- SELECT
--   comments.id,
--   comments.article_id,
--   users.first_name,
--   users.last_name,
--   comments.text
-- FROM comments
--   JOIN users ON comments.user_id = users.id
-- WHERE comments.article_id = 1
--   ORDER BY comments.created_at DESC

-- SELECT articles.*,
--   COUNT(comments.id) AS comments_count,
--   STRING_AGG(DISTINCT categories.name, ', ') AS category_list,
--   users.first_name,
--   users.last_name,
--   users.email
-- FROM articles
--   JOIN articles_categories ON articles.id = articles_categories.article_id
--   JOIN categories ON articles_categories.category_id = categories.id
--   LEFT JOIN comments ON comments.article_id = articles.id
--   JOIN users ON users.id = articles.user_id
-- WHERE articles.id = 1
--   GROUP BY articles.id, users.id;

-- UPDATE articles
-- SET title = 'Измени сознание'
-- WHERE id = 1;

select * from articles;
