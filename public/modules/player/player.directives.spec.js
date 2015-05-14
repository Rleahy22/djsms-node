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
                playVideo: sinon.spy(),
                pauseVideo: sinon.spy(),
                getPlayerState: function() {
                    return testState;
                }
            };
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
});