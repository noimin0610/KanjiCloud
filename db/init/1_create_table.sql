CREATE TABLE votes (
    id SERIAL PRIMARY KEY
    ,kanji TEXT UNIQUE
    ,count INTEGER
    ,x INTEGER
    ,y INTEGER
);