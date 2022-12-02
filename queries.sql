-- Получить список всех категорий (идентификатор, наименование категории);
SELECT
  id,
  name
FROM categories;

-- Получить список категорий, для которых создана минимум одна публикация (идентификатор, наименование категории);
SELECT id, name FROM categories
  JOIN articles_categories
  ON id = category_id
  GROUP BY id;

-- Получить список категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории);
SELECT
  id,
  name,
  count(articles_categories.category_id)
  FROM categories
  LEFT JOIN articles_categories ON id = category_id
  GROUP BY id, name;

-- Получить список публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие публикации;
SELECT
  articles.id,
  title,
  substring(full_text for 40),
  articles.created_at,
  users.first_name,
  users.last_name,
  users.email,
  count(comments.article_id),
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list
FROM articles
  JOIN users on user_id = users.id
  JOIN comments ON articles.id = article_id
  JOIN articles_categories ON articles.id = articles_categories.article_id
  JOIN categories ON articles_categories.category_id = categories.id
GROUP BY
  articles.id,
  users.first_name,
  users.last_name,
  users.email
ORDER BY articles.created_at DESC;


-- Получить полную информацию определённой публикации (идентификатор публикации, заголовок публикации, анонс, полный текст публикации, дата публикации, путь к изображению, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);
SELECT
  articles.id,
  title,
  substring(full_text for 40),
  full_text,
  articles.created_at,
  picture,
  users.first_name,
  users.last_name,
  users.email,
  count(comments.article_id),
  STRING_AGG(DISTINCT categories.name, ', ') AS category_list
FROM articles
  JOIN users on user_id = users.id
  JOIN comments ON articles.id = article_id
  JOIN articles_categories ON articles.id = articles_categories.article_id
  JOIN categories ON articles_categories.category_id = categories.id
WHERE articles.id = 1
GROUP BY
  articles.id,
  users.first_name,
  users.last_name,
  users.email
ORDER BY articles.created_at DESC;

-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария);
SELECT
  comments.id,
  article_id,
  users.first_name,
  users.last_name,
  text
FROM comments
  JOIN users on user_id = users.id
  ORDER BY created_at DESC
  LIMIT 5;

-- Получить список комментариев для определённой публикации (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария). Сначала новые комментарии;
SELECT
  comments.id,
  article_id,
  users.first_name,
  users.last_name,
  text
FROM comments
  JOIN users on user_id = users.id
WHERE article_id = 1
  ORDER BY created_at DESC;

-- Обновить заголовок определённой публикации на «Как я встретил Новый год»;
UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE id = 1;
