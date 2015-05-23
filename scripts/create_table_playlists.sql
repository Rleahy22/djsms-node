create table playlists(
    id serial primary key,
    title text NOT NULL,
    createdat timestamp without time zone default (now() at time zone 'utc'),
    updatedat timestamp without time zone default (now() at time zone 'utc')
);