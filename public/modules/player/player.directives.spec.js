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

            testScope.playlist = [
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
                nextVideo: sinon.spy(),
                pauseVideo: sinon.spy(),
                playVideo: sinon.spy(),
                previousVideo: sinon.spy()
            };
        });
    });

    describe("initialization", function() {
        it("should create an array of videoIds from scope.playlist", function() {
            expect(elm.isolateScope().playlist).toEqual(testScope.playlist);
            expect(elm.isolateScope().playerPlaylist).toEqual([
                testScope.playlist[0].videoId,
                testScope.playlist[1].videoId
            ]);
        });
    });

    describe("togglePlay", function() {
        it("pauses the player if currently playing", function() {
            testState = 1;
            elm.isolateScope().togglePlay();

            expect(elm.isolateScope().player.pauseVideo.calledOnce).toEqual(true);
        });

        it("plays the player if currently paused", function() {
            testState = 0;
            elm.isolateScope().togglePlay();

            expect(elm.isolateScope().player.playVideo.calledOnce).toEqual(true);
        });
    });

    describe("addVideosToPlaylist", function() {
        it("should add the playlist to youtubePlayer", function() {
            elm.isolateScope().addVideosToPlaylist();

            expect(elm.isolateScope().player.cuePlaylist.calledWith(elm.isolateScope().playerPlaylist)).toEqual(true);
        });
    });

    describe("nextVideo", function() {
        it("should skip to the next video", function() {
            elm.isolateScope().nextVideo();

            expect(elm.isolateScope().player.nextVideo.calledOnce).toEqual(true);
        });
    });

    describe("previousVideo", function() {
        it("should skip to the previous video", function() {
            elm.isolateScope().previousVideo();

            expect(elm.isolateScope().player.previousVideo.calledOnce).toEqual(true);
        });
    });

    describe("updateState", function() {
        it("should show a pause button if video is playing", function() {
            var testEvent = {
                data: 1
            };

            elm.isolateScope().updateState(testEvent);

            expect(elm.isolateScope().playStateImg).toEqual('images/pause-button.png');
        });

        it("should show a play button if video is paused", function() {
            var testEvent = {
                data: 0
            };

            elm.isolateScope().updateState(testEvent);

            expect(elm.isolateScope().playStateImg).toEqual('images/play-button.png');
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
            elm.isolateScope().playlist.push({
                videoId: '481516',
                title: 'Not Pennys Boat',
                thumbnail: 'http://vignette3.wikia.nocookie.net/lostpedia/images/b/bf/VcAEc.jpg/revision/latest?cb=20141026201455'
            });
            elm.isolateScope().$apply();

            expect(elm.isolateScope().updatePlaylist.calledOnce).toEqual(true);
        });
    });
});