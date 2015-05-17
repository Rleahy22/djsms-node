"use strict";

describe("playlistService", function() {
    var baseUrl = "http://localhost:8000/playlists/";
    var playlistService = {};
    var testPlaylist = {
        title: "Test Playlist",
        videos: []
    };

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
});