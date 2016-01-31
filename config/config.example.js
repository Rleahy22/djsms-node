module.exports = function () {
    if (process.env.NODE_ENV === "test") {
        return {
            db: {
                host: "localhost",
                user: "username",
                password: "password",
                database: "dbtest",
                logging: false
            },
            youtubeKey: "gibberishgibberish",
            port: 20001,
            baseUrl: "http://localhost:20001/"
        }   
    } else {
        return {
            db: {
                host: "localhost",
                user: "username",
                password: "password",
                database: "db"
            },
            youtubeKey: "gibberishgibberish",
            port: 20001,
            baseUrl: "http://localhost:20001/"
        }
    }
};
