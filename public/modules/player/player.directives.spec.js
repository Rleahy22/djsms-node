"use strict";

describe("youtubePlayer", function() {
    var elm, testScope, isolateScope;
    var testState = 1;
    var exampleUpdatedPlaylist = {
        title: "Test Playlist",
        videos: [
            {
                videoId: 'M7lc1UVf-VE',
                title: 'YouTube Developers Live: Embedded Web Player Customization',
                thumbnail: 'https://i.ytimg.com/vi/M7lc1UVf-VE/default.jpg'
            },
            {
                videoId: 'tnXO-i7944M',
                title: 'Dan Wahlin - AngularJS in 20ish Minutes - NG-Conf 2014',
                thumbnail: 'https://i.ytimg.com/vi/i9MHigUZKEM/default.jpg'
            },
            {
                videoId: 'M7lc1UVf-VE',
                title: 'YouTube Developers Live: Embedded Web Player Customization',
                thumbnail: 'https://i.ytimg.com/vi/M7lc1UVf-VE/default.jpg'
            }
        ]
    };

    beforeEach(module("templates"));
    beforeEach(function() {
        bard.appModule('app', function($provide) {
            $provide.value('configService', {
                baseUrl: "http://localhost:20001/",
                youtubeKey: 'fakeKey'
            });
            $provide.value('lodash', _);
        });

        bard.inject(function($window, $rootScope, $compile) {
            testScope = $rootScope;
            elm = angular.element('<md-card youtube-player playlist="playlist"></md-card>');

            testScope.playlist = {
                title: "Test Playlist",
                videos: [
                    {
                        videoId: 'M7lc1UVf-VE',
                        title: 'YouTube Developers Live: Embedded Web Player Customization',
                        thumbnail: 'https://i.ytimg.com/vi/M7lc1UVf-VE/default.jpg'
                    },
                    {
                        videoId: 'tnXO-i7944M',
                        title: 'Dan Wahlin - AngularJS in 20ish Minutes - NG-Conf 2014',
                        thumbnail: 'https://i.ytimg.com/vi/i9MHigUZKEM/default.jpg'
                    }
                ]
            };

            $compile(elm)(testScope);
            testScope.$digest();
            elm.isolateScope().player = {
                cuePlaylist: sinon.spy(),
                getCurrentTime: function() {
                    return 42;
                },
                getPlayerState: function() {
                    return testState;
                },
                getPlaylistIndex: function() {
                    return 4;
                },
                loadPlaylist: sinon.spy(),
                playVideoAt: sinon.spy()
            };
            isolateScope = elm.isolateScope();
        });
    });

    describe("addVideosToPlaylist", function() {
        it("should add the playlist to youtubePlayer", function() {
            isolateScope.addVideosToPlaylist();

            expect(isolateScope.player.cuePlaylist.calledWith(isolateScope.playerPlaylist)).toEqual(true);
        });
    });

    describe("updatePlaylist", function() {
        it("should load a new playlist in the youtube player", function() {
            isolateScope.updatePlaylist();

            expect(isolateScope.player.loadPlaylist.calledWith(
                isolateScope.playerPlaylist,
                4,
                42
            )).toEqual(true);
        });
    });

    describe("onPlayerReady", function() {
        it("should set ready to true", function() {
            expect(isolateScope.ready).toEqual(false);
            isolateScope.onPlayerReady();
            expect(isolateScope.ready).toEqual(true);
        });
    });

    describe("onStateChange", function() {
        it("should set update playlist.activeVideo", function() {
            expect(isolateScope.playlist.activeVideo).toEqual(undefined);
            isolateScope.onStateChange();
            expect(isolateScope.playlist.activeVideo).toEqual(4);
        });

        it("should load updated playlist on song change if available", function() {
            isolateScope.playlist.activeVideo = 3;
            isolateScope.updatedPlaylist = exampleUpdatedPlaylist;
            isolateScope.onStateChange();
            expect(isolateScope.playlist).toEqual(exampleUpdatedPlaylist);
            expect(isolateScope.updatedPlaylist).toEqual(undefined);
        });
    });

    describe("change video", function() {
        it("should change player to selected video", function() {
            isolateScope.changeVideo(2);
            expect(isolateScope.player.playVideoAt.calledWith(2)).toEqual(true);
        });
    });

    describe("changes to playlist activeVideo", function() {
        it("should call updatePlaylist", function() {
            isolateScope.changeVideo = sinon.spy();
            isolateScope.ready = true;
            isolateScope.playlist.activeVideo = 1;
            isolateScope.$apply();

            expect(isolateScope.changeVideo.calledOnce).toEqual(true);
        });
    });
});
