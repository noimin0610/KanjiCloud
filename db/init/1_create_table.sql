CREATE TABLE votes (
    id SERIAL PRIMARY KEY
    ,kanji TEXT UNIQUE
    ,count INTEGER
    ,x INTEGER
    ,y INTEGER
);
CREATE TABLE fixed_texts (
    key TEXT PRIMARY KEY
    ,fixed_text TEXT
);
insert into fixed_texts VALUES ('title', 'テーマをみんなで決めようトラベルトーク会');
insert into fixed_texts VALUES ('kanjicloud_title', '旅のテーマを表す漢字');
insert into fixed_texts VALUES ('form_title', '旅のテーマを漢字一文字で表すと？');