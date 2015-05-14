"use strict";

describe("PlayerCtrl", function() {
    var vm = {};

    beforeEach(function() {
        bard.appModule('app', function($provide) {
            $provide.value('configService', {
                youtubeKey: 'fakeKey'
            });
        });

        bard.inject(this, '$controller');

        vm = $controller('PlayerCtrl');
    });

    describe('search', function() {
        it('should initialize a playlist object', function() {
            expect(vm.playlist.length).toEqual(2);
            expect(vm.playlist[0].title).toMatch(/YouTube/);
        });
    });
});