"use strict";

describe("PlayerCtrl", function() {
    var vm             = {};
    var baseUrl        = "http://localhost:8000/";
    var playlistGetUrl = baseUrl + "playlists/get/1";
    var testVideo = {
        videoId: 481516,
        title: "Test Title",
        thumbnail: "http://test.com/image.png"
    };
    var testPlaylist = {
        title: "Test Playlist",
        videos: [testVideo]
    };

    beforeEach(function() {
        bard.appModule('app', function($provide) {
            $provide.value('configService', {
                baseUrl: "http://localhost:20001/",
                youtubeKey: 'fakeKey'
            });
            $provide.value('$stateParams', {
                playlistId: 1
            });
            $provide.value('websocketService', {
                on: function() {
                    return;
                }
            });
            $provide.value('lodash', _);
        });

        bard.inject(this, '$controller', '$q', '$rootScope', '$httpBackend', 'youtubeSearch', 'playlistService');

        bard.mockService(youtubeSearch, {
            search: $q.when({
                id: {
                    videoId: testVideo.videoId
                },
                snippet: {
                    title: testVideo.title,
                    thumbnails: {
                        default: testVideo.thumbnail
                    }
                }
            })
        });

        bard.mockService(playlistService, {
            addVideo:    $q.when(function(playlist, newVideo) {
                return playlist.push(newVideo);
            }),
            deleteVideo: $q.when(),
            retrieve:    $q.when(testPlaylist)
        });

        $httpBackend.when('GET', playlistGetUrl).respond(function() {
            return [200, testPlaylist, {}];
        });

        vm = $controller('PlayerCtrl');
    });

    describe("search", function() {
        it("should return a youtube video object", function() {
            vm.searchText = "Test Query";
            vm.search();
            $rootScope.$apply();
            expect(vm.searchResult.videoid).toEqual(481516);
        });

        it("should not call youtubeSearch service#search if searchtext is undefined", function() {
            vm.searchText = undefined;
            vm.search();
            expect(vm.searchResult).toEqual(null);
        });
    });

    describe("addVideoToPlaylist", function() {
        it("should add video from search results to playlist", function() {
            vm.searchResult = testVideo;
            $rootScope.$apply();

            expect(vm.playlist.videos.length).toEqual(1);
            vm.addVideoToPlaylist();
            expect(vm.playlist.videos.length).toEqual(2);
            expect(vm.playlist.videos[1].title).toEqual(testVideo.title);
        });
    });

    describe('addSocketVideoToPlaylist', function() {
        it('should add the text result from websocket to playlist', function() {
            $rootScope.$apply();

            expect(vm.playlist.videos.length).toEqual(2);
            vm.addSocketVideoToPlaylist({
                videoId: 42,
                title: "Socket Video",
                thumbnail: "http://socket.com/socket.png"
            });

            expect(vm.playlist.videos.length).toEqual(3);
            expect(vm.playlist.videos[2].title).toEqual('Socket Video');
        });

        it('should call playlistService.addVideo', function() {
            $rootScope.$apply();

            expect(vm.playlist.videos.length).toEqual(3);
            vm.addSocketVideoToPlaylist({
                videoId: 42,
                title: "Socket Video",
                thumbnail: "http://socket.com/socket.png"
            });

            expect(vm.updatedPlaylist).toEqual(undefined);
            $rootScope.$apply();
            expect(vm.updatedPlaylist.length).toEqual(2);
        });
    });

    describe('deleteVideo', function() {
        it('should prevent any event propagation', function() {
            var testEvent = {
                stopPropagation: sinon.spy(),
                preventDefault:  sinon.spy()
            };

            vm.deleteVideo(481516, testEvent);

            expect(testEvent.stopPropagation.calledOnce).toEqual(true);
            expect(testEvent.preventDefault.calledOnce).toEqual(true);
        });

        it('should call remove video from playlist', function() {
            $rootScope.$apply();
            expect(vm.playlist.videos.length).toEqual(4);

            vm.deleteVideo(1, {});

            $rootScope.$apply();
            expect(vm.playlist.videos.length).toEqual(4);
        });
    });

    describe("playVideo", function() {
        it("should set activeVideo to selected video", function() {
            $rootScope.$apply();

            expect(vm.playlist.activeVideo).toEqual(undefined);
            vm.playVideo(1);
            expect(vm.playlist.activeVideo).toEqual(1);
        });
    });
});
