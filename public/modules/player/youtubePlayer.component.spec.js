"use strict";

describe("youtubePlayer", function () {
    let elm, testScope, isolateScope;
    let testState = 1;

    beforeEach(module("templates"));
    beforeEach(function () {
        bard.appModule('app', function ($provide) {
            $provide.value('configService', {
                baseUrl: "http://localhost:20001/",
                youtubeKey: 'fakeKey'
            });
            $provide.value('lodash', _);
        });

        bard.inject(function ($window, $rootScope, $compile) {
            testScope = $rootScope;

            testScope.videos = [
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
            ];

            elm = angular.element('<youtube-player videos="videos"></youtube-player>');

            $compile(elm)(testScope);
            testScope.$digest();
            elm.isolateScope().$ctrl.player = {
                cuePlaylist: sinon.spy(),
                getCurrentTime: function () {
                    return 42;
                },
                getPlayerState: function () {
                    return testState;
                },
                getPlaylistIndex: function () {
                    return 4;
                },
                loadPlaylist: sinon.spy(),
                playVideoAt: sinon.spy()
            };
            isolateScope = elm.isolateScope().$ctrl;
        });
    });

    describe("addVideosToPlaylist", function () {
        it("should add the playlist to youtubePlayer", function () {
            isolateScope.addVideosToPlaylist();

            expect(isolateScope.player.cuePlaylist.calledWith(isolateScope.playerPlaylist)).toEqual(true);
        });
    });

    describe("updatePlaylist", function () {
        it("should load a new playlist in the youtube player", function () {
            isolateScope.updatePlaylist();

            expect(isolateScope.player.loadPlaylist.calledWith(
                isolateScope.playerPlaylist,
                4,
                42
            )).toEqual(true);
        });
    });

    describe("onPlayerReady", function () {
        it("should set ready to true", function () {
            expect(isolateScope.ready).toEqual(false);
            isolateScope.onPlayerReady();
            expect(isolateScope.ready).toEqual(true);
        });
    });

    describe("onStateChange", function () {
        it("should set update playlist.activeVideo", function () {
            expect(isolateScope.activeVideo).toEqual(undefined);
            isolateScope.onStateChange();
            expect(isolateScope.activeVideo).toEqual(4);
        });
    });

    describe("change video", function () {
        it("should change player to selected video", function () {
            isolateScope.changeVideo(2);
            expect(isolateScope.player.playVideoAt.calledWith(2)).toEqual(true);
        });
    });

    describe("changes to playlist activeVideo", function () {
        it("should call updatePlaylist", function () {
            isolateScope.changeVideo = sinon.spy();
            isolateScope.ready = true;
            isolateScope.$onChanges({ activeVideo: { currentValue: 1 } } )
            testScope.$digest();

            expect(isolateScope.changeVideo.calledOnce).toEqual(true);
        });
    });
});
