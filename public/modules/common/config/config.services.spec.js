"use strict";

describe('configService', function() {
    var configService = {};

    beforeEach(function() {
        bard.appModule('app', function($provide) {
            $provide.value('$window', {
                config: {
                    app: {
                        baseUrl: 'http://www.test.com/'
                    }
                }
            });
        });

        bard.inject(this);

        configService = this.$injector.get('configService');
    });

    describe("initialization", function() {
        it("should return the $window's config object", function() {
            expect(configService.baseUrl).toEqual('http://www.test.com/');
        });
    });
});
