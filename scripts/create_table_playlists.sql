create table playlists(
    id serial primary key,
    title text NOT NULL,
    createdat DATE NOT NULL,
    updatedat DATE NOT NULL
);