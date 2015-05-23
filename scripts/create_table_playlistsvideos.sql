create table playlistsVideos(
    id serial primary key,
    playlistId integer NOT NULL,
    videoId integer NOT NULL,
    createdAt DATE NOT NULL,
    updatedAt DATE NOT NULL
);