create table videos(
    id serial primary key,
    videoid text NOT NULL,
    title text NOT NULL,
    thumbnail text NOT NULL,
    createdat timestamp without time zone default (now() at time zone 'utc'),
    updatedat timestamp without time zone default (now() at time zone 'utc')
);