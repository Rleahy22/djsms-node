"use strict";

describe("playlistService", function() {
    var baseUrl = "http://localhost:8000/playlists/";
    var allPlaylistsUrl = baseUrl + "all";
    var newTestPlaylist = {
        id: 42,
        title: "Brand New Playlist"
    };
    var playlistCreateUrl = baseUrl + "create";
    var playlistsAllGet;
    var playlistsPost;
    var playlistService = {};
    var testPlaylist = {
        title: "Test Playlist",
        videos: []
    };
    var testPlaylists = [
        {
            id: 1,
            title: "First Playlist"
        },
        {
            id: 2,
            title: "Playlist Two"
        }
    ];

    beforeEach(function() {
        bard.appModule('app', function($provide) {
            $provide.value('configService', {
                youtubeKey: 'fakeKey'
            });
        });

        bard.inject(this, '$q', '$httpBackend');

        playlistService = this.$injector.get('playlistService');

        $httpBackend.when('GET', baseUrl + 'get/1').respond(function() {
            return [200, {playlist: testPlaylist}, {}];
        });

        $httpBackend.when('GET', baseUrl + 'get/error').respond(function() {
            return [500, {data: {message: "Fatal Error"}}, {}];
        });

        playlistsAllGet = $httpBackend.whenGET(allPlaylistsUrl);
        playlistsAllGet.respond(function() {
            return [200, {playlists: testPlaylists}, {}];
        });

        playlistsPost = $httpBackend.whenPOST(playlistCreateUrl);
        playlistsPost.respond(function() {
            return [200, {playlist: newTestPlaylist}, {}];
        });
    });

    describe("retrieve", function() {
        it("should retrieve a playlist by id", function() {
            playlistService.retrieve(1)
            .then(function(result) {
                expect(result.title).toEqual("Test Playlist");
                expect(result.videos).toEqual([]);
            }, function() {
                expect(1).toEqual(2);
            });

            $httpBackend.flush();
        });

        it("should error gracefully", function() {
            playlistService.retrieve('error')
            .then(function() {
                expect(1).toEqual(2);
            }, function(result) {
                expect(result.data.message).toMatch(/Fatal Error/);
            });

            $httpBackend.flush();
        });
    });

    describe("retrieve", function() {
        it("should retrieve all playlists", function() {
            playlistService.retrieveAll()
            .then(function(result) {
                expect(result[1].title).toMatch(/Playlist Two/);
            }, function() {
                expect(1).toEqual(2);
            });

            $httpBackend.flush();
        });

        it("should error gracefully", function() {
            playlistsAllGet.respond(function() {
                return [500, {data: {message: "Fatal Error"}}, {}];
            });

            playlistService.retrieveAll('error')
            .then(function() {
                expect(1).toEqual(2);
            }, function(result) {
                expect(result.data.message).toMatch(/Fatal Error/);
            });

            $httpBackend.flush();
        });
    });

    describe("create", function() {
        it("should return a newly created playlist", function() {
            playlistService.create()
            .then(function(result) {
                expect(result.title).toMatch(/Brand New Playlist/);
            }, function() {
                expect(1).toEqual(2);
            });

            $httpBackend.flush();
        });

        it("should error gracefully", function() {
            playlistsPost.respond(function() {
                return [500, {data: {message: "Fatal Error"}}, {}];
            });

            playlistService.create('error')
            .then(function() {
                expect(1).toEqual(2);
            }, function(result) {
                expect(result.data.message).toMatch(/Fatal Error/);
            });

            $httpBackend.flush();
        });
    });
});