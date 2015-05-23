create table videos(
    id serial primary key,
    videoid text NOT NULL,
    title text NOT NULL,
    thumbnail text NOT NULL,
    createdat DATE NOT NULL,
    updatedat DATE NOT NULL
);