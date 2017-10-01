"use strict";

describe('configService', function() {
    var configService = {};

    beforeEach(module('app', function ($provide) {
        $provide.value('$window', {
            config: {
                app: {
                    baseUrl: 'http://www.test.com/'
                }
            }
        });
    }));

    beforeEach(inject(function (configService) {
        this.configService = configService;
    }));

    describe("initialization", function() {
        it("should return the $window's config object", function() {
            const testConfig = this.configService.getConfig();
            expect(testConfig.baseUrl).toEqual('http://www.test.com/');
        });
    });
});
