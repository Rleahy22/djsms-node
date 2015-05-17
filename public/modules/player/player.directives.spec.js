"use strict";

describe("youtubePlayer", function() {
    var elm, testScope;
    var testState = 1;
    beforeEach(module("templates"));
    beforeEach(function() {
        bard.appModule('app', function($provide) {
            $provide.value('configService', {
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
            };
        });
    });

    describe("addVideosToPlaylist", function() {
        it("should add the playlist to youtubePlayer", function() {
            elm.isolateScope().addVideosToPlaylist();

            expect(elm.isolateScope().player.cuePlaylist.calledWith(elm.isolateScope().playerPlaylist)).toEqual(true);
        });
    });

    describe("updatePlaylist", function() {
        it("should load a new playlist in the youtube player", function() {
            elm.isolateScope().updatePlaylist();

            expect(elm.isolateScope().player.loadPlaylist.calledWith(
                elm.isolateScope().playerPlaylist,
                4,
                42
            )).toEqual(true);
        });
    });

    describe("onPlayerReady", function() {
        it("should set ready to true", function() {
            expect(elm.isolateScope().ready).toEqual(false);
            elm.isolateScope().onPlayerReady();
            expect(elm.isolateScope().ready).toEqual(true);
        });
    });

    describe("changes to playlist", function() {
        it("should call updatePlaylist", function() {
            elm.isolateScope().updatePlaylist = sinon.spy();
            elm.isolateScope().ready = true;
            elm.isolateScope().playlist.videos.push({
                videoId: '481516',
                title: 'Not Pennys Boat',
                thumbnail: 'http://vignette3.wikia.nocookie.net/lostpedia/images/b/bf/VcAEc.jpg/revision/latest?cb=20141026201455'
            });
            elm.isolateScope().$apply();

            expect(elm.isolateScope().updatePlaylist.calledOnce).toEqual(true);
        });
    });
});