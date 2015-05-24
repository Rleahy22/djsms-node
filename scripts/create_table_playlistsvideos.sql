create table playlistsVideos(
    id serial primary key,
    playlistId integer NOT NULL,
    videoId integer NOT NULL,
    createdAt timestamp with time zone default (now() at time zone 'utc'),
    updatedAt timestamp with time zone default (now() at time zone 'utc')
);