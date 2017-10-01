"use strict";

describe("youtubeSearch", function() {
    var youtubeSearch  = {};
    var youtubeBaseUrl = "https://www.googleapis.com/youtube/v3/search?key=fakeKey&part=snippet&maxResults=5&q=";
    var searchResults  = [
        {
            id: {
                videoId: 481516,
                kind: "youtube#video"
            },
            snippet: {
                title: "Test Title",
                thumbnails: {
                    default: "http://test.com/image.png"
                }
            }
        }
    ];

    beforeEach(function() {
        bard.appModule('app', function($provide) {
            $provide.value('configService', {
                youtubeKey: 'fakeKey'
            });
        });

        bard.inject(this, '$httpBackend');

        youtubeSearch = this.$injector.get('youtubeSearch');

        $httpBackend.when('GET', youtubeBaseUrl + 'test query').respond(function() {
            return [200, {items: searchResults}, {}];
        });

        $httpBackend.when('GET', youtubeBaseUrl + 'error').respond(function() {
            return [500, {message: "Fatal Error"}, {}];
        });
    });

    describe("search", function() {
        it("should resolve promise with a video object", function() {
            youtubeSearch.search('test query')
            .then(function(result) {
                expect(result.id.videoId).toEqual(481516);
            }).catch(() => {
                expect(1).toEqual(2);
            });

            $httpBackend.flush();
        });

        it("should error gracefully", function() {
            youtubeSearch.search('error')
            .then(function() {
                expect(1).toEqual(2);
            }).catch((error) => {
                expect(error.data.message).toMatch(/Fatal Error/);
            });

            $httpBackend.flush();
        });
    });
});
