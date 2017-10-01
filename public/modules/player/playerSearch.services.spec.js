"use strict";

describe("youtubeSearch", function() {
    let youtubeSearch  = {};
    let youtubeBaseUrl = "https://www.googleapis.com/youtube/v3/search?key=fakeKey&part=snippet&maxResults=5&q=";
    let searchResults  = [
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

    beforeEach(module('app', function ($provide) {
        let configService = {
            getConfig: jasmine.createSpy().and.returnValue({ youtubeKey: 'fakeKey' })
        };

        $provide.value('configService', configService);
    }));

    beforeEach(inject(function (youtubeSearch, $httpBackend, configService) {
        this.$httpBackend = $httpBackend;
        this.$httpBackend.when('GET', youtubeBaseUrl + 'test query').respond(function() {
            return [200, {items: searchResults}, {}];
        });

        this.$httpBackend.when('GET', '/public/modules/layout.html').respond(function() {
            return [200, {}, {}];
        });

        this.$httpBackend.when('GET', youtubeBaseUrl + 'error').respond(function() {
            return [500, {message: "Fatal Error"}, {}];
        });

        this.service = youtubeSearch;
    }));

    describe("search", function() {
        it("should resolve promise with a video object", function() {
            this.service.search('test query')
                .then((result) => {
                    expect(result.id.videoId).toEqual(481516);
                }).catch(() => {
                    expect(1).toEqual(2);
                });

            this.$httpBackend.flush();
        });

        it("should error gracefully", function() {
            this.service.search('error')
                .then(() => {
                    expect(1).toEqual(2);
                }).catch((error) => {
                    expect(error.data.message).toMatch(/Fatal Error/);
                });

            this.$httpBackend.flush();
        });
    });
});
