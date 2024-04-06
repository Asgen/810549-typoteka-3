
      INSERT INTO roles(name) VALUES ('автор'),
('читатель');
      INSERT INTO users(email, password_hash, first_name, last_name, avatar, role) VALUES
      ('ivanov1@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg', 'автор'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar2.jpg', 'читатель');
      INSERT INTO categories(name) VALUES
      ('Книги'),
('Разное'),
('Посуда'),
('Игры'),
('Животные'),
('Журналы');
      ALTER TABLE articles DISABLE TRIGGER ALL;
      INSERT INTO articles(title, full_text, picture, user_id) VALUES
      ('Продам отличную подборку фильмов на VHS.', 'Кому нужен этот новый телефон, если тут такое... Если товар не понравится — верну всё до последней копейки. Две страницы заляпаны свежим кофе. Пользовались бережно и только по большим праздникам.', 'avatar53', 1),
('Куплю антиквариат.', 'Если найдёте дешевле — сброшу цену. Две страницы заляпаны свежим кофе. Не пытайтесь торговаться. Цену вещам я знаю. Это настоящая находка для коллекционера!', 'avatar97', 2),
('Куплю детские санки.', 'Не пытайтесь торговаться. Цену вещам я знаю. При покупке с меня бесплатная доставка в черте города. Даю недельную гарантию. Пользовались бережно и только по большим праздникам.', 'avatar89', 2),
('Продам отличную подборку фильмов на VHS.', 'Товар в отличном состоянии. Таких предложений больше нет! Если товар не понравится — верну всё до последней копейки. Кому нужен этот новый телефон, если тут такое...', 'avatar12', 2),
('Продам коллекцию журналов «Огонёк».', 'Продаю с болью в сердце... Кажется, что это хрупкая вещь. Товар в отличном состоянии. Пользовались бережно и только по большим праздникам.', 'avatar41', 2),
('Продам книги Стивена Кинга.', 'Пользовались бережно и только по большим праздникам. Продаю с болью в сердце... Таких предложений больше нет! Кому нужен этот новый телефон, если тут такое...', 'avatar93', 2),
('Продам книги Стивена Кинга.', 'Таких предложений больше нет! Не пытайтесь торговаться. Цену вещам я знаю. Это настоящая находка для коллекционера! Товар в отличном состоянии.', 'avatar36', 1),
('Продам отличную подборку фильмов на VHS.', 'Если найдёте дешевле — сброшу цену. Пользовались бережно и только по большим праздникам. Кажется, что это хрупкая вещь. Не пытайтесь торговаться. Цену вещам я знаю.', 'avatar32', 2),
('Куплю антиквариат.', 'Если товар не понравится — верну всё до последней копейки. Даю недельную гарантию. Бонусом отдам все аксессуары. Если найдёте дешевле — сброшу цену.', 'avatar57', 1),
('Куплю породистого кота.', 'Кому нужен этот новый телефон, если тут такое... Таких предложений больше нет! Пользовались бережно и только по большим праздникам. Не пытайтесь торговаться. Цену вещам я знаю.', 'avatar53', 1);
      ALTER TABLE articles ENABLE TRIGGER ALL;
      ALTER TABLE articles_categories DISABLE TRIGGER ALL;
      INSERT INTO articles_categories(article_id, category_id) VALUES
      (1, 2),
(2, 3),
(3, 2),
(4, 5),
(5, 3),
(6, 1),
(7, 4),
(8, 3),
(9, 3),
(10, 6);
      ALTER TABLE articles_categories ENABLE TRIGGER ALL;
      ALTER TABLE comments DISABLE TRIGGER ALL;
      INSERT INTO COMMENTS(text, user_id, article_id) VALUES
      ('Плюсую, но слишком много буквы!', 2, 1),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', 1, 1),
('Хочу такую же футболку :-) Согласен с автором!', 1, 1),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы! Хочу такую же футболку :-)', 1, 1),
('Согласен с автором!', 1, 2),
('Мне кажется или я уже читал это где-то? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', 1, 3),
('Совсем немного... Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором!', 1, 3),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', 2, 3),
('Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.', 2, 3),
('Плюсую, но слишком много буквы!', 1, 3),
('Это где ж такие красоты? Совсем немного...', 1, 4),
('Хочу такую же футболку :-) Плюсую, но слишком много буквы!', 2, 4),
('Планируете записать видосик на эту тему?" Хочу такую же футболку :-) Плюсую, но слишком много буквы!', 2, 5),
('Совсем немного...', 1, 5),
('Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором!', 1, 5),
('Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Планируете записать видосик на эту тему?"', 2, 5),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', 1, 6),
('Мне кажется или я уже читал это где-то? Хочу такую же футболку :-) Совсем немного...', 1, 7),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Мне кажется или я уже читал это где-то?', 2, 7),
('Хочу такую же футболку :-) Мне кажется или я уже читал это где-то? Совсем немного...', 2, 7),
('Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Совсем немного... Хочу такую же футболку :-)', 1, 7),
('Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', 2, 7),
('Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Планируете записать видосик на эту тему?" Это где ж такие красоты?', 1, 8),
('Планируете записать видосик на эту тему?"', 2, 8),
('Мне кажется или я уже читал это где-то?', 1, 8),
('Планируете записать видосик на эту тему?" Совсем немного... Это где ж такие красоты?', 1, 9),
('Совсем немного... Хочу такую же футболку :-)', 2, 9),
('Хочу такую же футболку :-) Это где ж такие красоты?', 2, 9),
('Плюсую, но слишком много буквы! Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.', 2, 9),
('Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного... Плюсую, но слишком много буквы!', 1, 10),
('Это где ж такие красоты? Плюсую, но слишком много буквы!', 1, 10),
('Хочу такую же футболку :-) Планируете записать видосик на эту тему?" Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.', 2, 10),
('Мне кажется или я уже читал это где-то? Согласен с автором!', 2, 10);
      ALTER TABLE comments ENABLE TRIGGER ALL;
