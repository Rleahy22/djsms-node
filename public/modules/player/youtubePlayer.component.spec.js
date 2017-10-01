"use strict";

describe("youtubePlayer", function () {
    let testState = 1;

    beforeEach(module("templates"));

    beforeEach(module('app', function ($provide) {
        let configService = {
            getConfig: jasmine.createSpy().and.returnValue({
                baseUrl: "http://localhost:20001/",
                youtubeKey: 'fakeKey'
            })
        };

        $provide.value('configService', configService);
        $provide.value('lodash', _);
    }));

    beforeEach(inject(function ($rootScope, $componentController) {
        this.$scope = $rootScope.$new();

        this.$scope.videos = [
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

        this.player = {
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

        this.$ctrl = $componentController('youtubePlayer', {
            $scope: this.$scope
        });

        this.$ctrl.player = this.player;
    }));

    describe("addVideosToPlaylist", function () {
        it("should add the playlist to youtubePlayer", function () {
            this.$ctrl.addVideosToPlaylist();

            expect(this.player.cuePlaylist.calledWith(this.$ctrl.playerPlaylist)).toEqual(true);
        });
    });

    describe("updatePlaylist", function () {
        it("should load a new playlist in the youtube player", function () {
            this.$ctrl.updatePlaylist();

            expect(this.player.loadPlaylist.calledWith(
                this.$ctrl.playerPlaylist,
                4,
                42
            )).toEqual(true);
        });
    });

    describe("onPlayerReady", function () {
        it("should set ready to true", function () {
            expect(this.$ctrl.ready).toEqual(false);
            this.$ctrl.onPlayerReady();
            expect(this.$ctrl.ready).toEqual(true);
        });
    });

    describe("onStateChange", function () {
        it("should set update playlist.activeVideo", function () {
            expect(this.$ctrl.activeVideo).toEqual(undefined);
            this.$ctrl.onStateChange();
            expect(this.$ctrl.activeVideo).toEqual(4);
        });
    });

    describe("change video", function () {
        it("should change player to selected video", function () {
            this.$ctrl.changeVideo(2);
            expect(this.player.playVideoAt.calledWith(2)).toEqual(true);
        });
    });

    describe("changes to playlist activeVideo", function () {
        it("should call updatePlaylist", function () {
            this.$ctrl.changeVideo = sinon.spy();
            this.$ctrl.ready = true;
            this.$ctrl.$onChanges({ activeVideo: { currentValue: 1 } } )
            this.$scope.$digest();

            expect(this.$ctrl.changeVideo.calledOnce).toEqual(true);
        });
    });
});
