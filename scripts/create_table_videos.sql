create table videos(
    id serial primary key,
    videoid text NOT NULL,
    title text NOT NULL,
    thumbnail text NOT NULL,
    createdat timestamp with time zone default (now() at time zone 'utc'),
    updatedat timestamp with time zone default (now() at time zone 'utc')
);