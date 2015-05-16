"use strict";

describe("PlayerCtrl", function() {
    var vm = {};
    var testVideo = {
        videoId: 481516,
        title: "Test Title",
        thumbnail: "http://test.com/image.png"
    };

    beforeEach(function() {
        bard.appModule('app', function($provide) {
            $provide.value('configService', {
                youtubeKey: 'fakeKey'
            });
        });

        bard.inject(this, '$controller', '$q', '$rootScope', 'youtubeSearch');

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

        vm = $controller('PlayerCtrl');
    });

    describe("initialize", function() {
        it("should initialize a playlist object", function() {
            expect(vm.playlist.length).toEqual(2);
            expect(vm.playlist[0].title).toMatch(/YouTube/);
        });
    });

    describe("search", function() {
        it("should return a youtube video object", function() {
            vm.searchText = "Test Query";
            vm.search();
            $rootScope.$apply();
            expect(vm.searchResult.videoId).toEqual(481516);
        });

        it("should not call youtubeSearch service#search if searchtext is undefined", function() {
            vm.searchText = undefined;
            vm.search();
            $rootScope.$apply();
            expect(vm.searchResult).toEqual({});
        });
    });

    describe("addVideoToPlaylist", function() {
        it("should add video from search results to playlist", function() {
            vm.searchResult = testVideo;

            expect(vm.playlist.length).toEqual(2);
            vm.addVideoToPlaylist();
            expect(vm.playlist.length).toEqual(3);
            expect(vm.playlist[2].title).toEqual(testVideo.title);
        });
    });
});