"use strict";

describe("PlayerCtrl", function() {
    var vm = {};

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
                    videoId: 481516
                },
                snippet: {
                    title: "Test Title",
                    thumbnails: {
                        default: "http://test.com/image.png"
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
            vm.search("Test query");
            $rootScope.$apply();
            expect(vm.searchResult.videoId).toEqual(481516);
        });
    });
});