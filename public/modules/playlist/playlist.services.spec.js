"use strict";

describe("playlistService", function() {
    let baseUrl         = "http://localhost:20001/playlists/";
    let baseVideoUrl    = "http://localhost:20001/videos/";
    let allPlaylistsUrl = baseUrl + "all";
    let newTestPlaylist = {
        id: 42,
        title: "Brand New Playlist"
    };
    let playlistCreateUrl = baseUrl + "create";
    let playlistUpdateUrl = baseUrl + "1";
    let playlistsAllGet;
    let playlistsPost;
    let playlistsPut;
    let playlistService = {};
    let testVideo = {
        title: "Test Video",
        thumbnail: "http://test.com/image.png",
        videoId: "abcd481516"
    };
    let testPlaylist = {
        id: 1,
        title: "Test Playlist",
        videos: [testVideo]
    };
    let testPlaylists = [
        {
            id: 1,
            title: "First Playlist"
        },
        {
            id: 2,
            title: "Playlist Two"
        }
    ];
    let videoDelete;
    let videoDeleteUrl = baseVideoUrl + "1";

    beforeEach(module('app', function ($provide) {
        let configService = {
            getConfig: jasmine.createSpy().and.returnValue({
                baseUrl: "http://localhost:20001/",
                youtubeKey: 'fakeKey'
            })
        };

        $provide.value('configService', configService);
    }));

    beforeEach(inject(function ($httpBackend, playlistService) {
        this.$httpBackend = $httpBackend;

        this.$httpBackend.when('GET', '/public/modules/layout.html').respond(function() {
            return [200, {}, {}];
        });

        this.$httpBackend.when('GET', baseUrl + 'get/1').respond(function() {
            return [200, {playlist: testPlaylist}, {}];
        });

        this.$httpBackend.when('GET', baseUrl + 'get/error').respond(function() {
            return [500, {message: "Fatal Error"}, {}];
        });

        playlistsAllGet = this.$httpBackend.whenGET(allPlaylistsUrl);
        playlistsAllGet.respond(function() {
            return [200, {playlists: testPlaylists}, {}];
        });

        playlistsPost = this.$httpBackend.whenPOST(playlistCreateUrl);
        playlistsPost.respond(function() {
            return [200, {playlist: newTestPlaylist}, {}];
        });

        playlistsPut = this.$httpBackend.whenPUT(playlistUpdateUrl);
        playlistsPut.respond(function() {
            return [200, {playlist: testPlaylist}, {}];
        });

        videoDelete = this.$httpBackend.whenDELETE(videoDeleteUrl);
        videoDelete.respond(function() {
            return [200, "Success", {}];
        });

        this.playlistService = playlistService;
    }));

    describe('addVideo', function() {
        it("should add a video to a playlist", function() {
            this.playlistService.addVideo(testPlaylist, testVideo)
            .then(function(result) {
                expect(result.videos.length).toEqual(1);
            }, function() {
                expect(2).toEqual(1);
            });

            this.$httpBackend.flush();
        });
    });

    describe("create", function() {
        it("should return a newly created playlist", function() {
            this.playlistService.create()
            .then(function(result) {
                expect(result.title).toMatch(/Brand New Playlist/);
            }, function() {
                expect(1).toEqual(2);
            });

            this.$httpBackend.flush();
        });

        it("should error gracefully", function() {
            playlistsPost.respond(function() {
                return [500, {message: "Fatal Error"}, {}];
            });

            this.playlistService.create('error')
            .then(function() {
                expect(1).toEqual(2);
            }, function(result) {
                expect(result.data.message).toMatch(/Fatal Error/);
            });

            this.$httpBackend.flush();
        });
    });

    describe("deleteVideo", function() {
        it("delete a Video by id", function() {
            this.playlistService.currentPlaylist = testPlaylist;
            this.playlistService.deleteVideo(1)
            .then(function(result) {
                expect(result).toEqual("Success");
            }).catch(() => {
                expect(1).toEqual(2);
            });

            this.$httpBackend.flush();
        });

        it("should error gracefully", function() {
            videoDelete.respond(function() {
                return [500, {message: "Fatal Error"}, {}];
            });

            this.playlistService.deleteVideo(1)
            .then(function() {
                expect(1).toEqual(2);
            }, function(result) {
                expect(result.data.message).toMatch(/Fatal Error/);
            });

            this.$httpBackend.flush();
        });
    });

    describe("retrieve", function() {
        it("should retrieve a playlist by id", function() {
            this.playlistService.retrieve(1)
            .then(function(result) {
                expect(result.title).toEqual("Test Playlist");
                expect(result.videos).toEqual([testVideo]);
            }, function() {
                expect(1).toEqual(2);
            });

            this.$httpBackend.flush();
        });

        it("should error gracefully", function() {
            this.playlistService.retrieve('error')
            .then(function() {
                expect(1).toEqual(2);
            }, function(result) {
                expect(result.data.message).toMatch(/Fatal Error/);
            });

            this.$httpBackend.flush();
        });
    });

    describe("retrieveAll", function() {
        it("should retrieve all playlists", function() {
            this.playlistService.retrieveAll()
            .then(function(result) {
                expect(result[1].title).toMatch(/Playlist Two/);
            }, function() {
                expect(1).toEqual(2);
            });

            this.$httpBackend.flush();
        });

        it("should error gracefully", function() {
            playlistsAllGet.respond(function() {
                return [500, {message: "Fatal Error"}, {}];
            });

            this.playlistService.retrieveAll('error')
            .then(function() {
                expect(1).toEqual(2);
            }, function(result) {
                expect(result.data.message).toMatch(/Fatal Error/);
            });

            this.$httpBackend.flush();
        });
    });
});
