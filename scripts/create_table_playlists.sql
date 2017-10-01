create table playlists(
    id serial primary key,
    title text NOT NULL,
    createdat timestamp with time zone default (now() at time zone 'utc'),
    updatedat timestamp with time zone default (now() at time zone 'utc')
);