"use strict";

describe("PlaylistsCtrl", function() {
    var vm = {};
    var testPlaylist = {
        id: 4,
        title: "New Playlist"
    };
    var testPlaylists = [
        {
            id: 1,
            title: "Playlist One"
        },
        {
            id: 2,
            title: "Playlist Two"
        }
    ];

    beforeEach(function() {
        bard.appModule('app', function($provide) {
            $provide.value('configService', {
                youtubeKey: 'fakeKey'
            });
        });

        bard.inject(this, '$controller', '$q', '$rootScope', '$state', 'playlistService');

        bard.mockService(playlistService, {
            retrieveAll: $q.when(testPlaylists),
            create: $q.when(testPlaylist)
        });

        bard.mockService($state, {
            go: sinon.spy()
        });

        vm = $controller('PlaylistsCtrl');
    });

    describe("initialization", function() {
        it("should retrieve all playlists for display", function() {
            expect(vm.playlists.length).toEqual(0);
            $rootScope.$apply();
            expect(vm.playlists.length).toEqual(2);
            expect(vm.playlists[1].id).toEqual(2);
        });
    });

    describe("createPlaylist", function() {
        it("should create and navigate to a new playlist", function() {
            vm.newTitle = "New Playlist";
            vm.createPlaylist();
            $rootScope.$apply();
            expect($state.go.calledWith(
                'layout.playlist',
                {playlistId: testPlaylist.id}
            )).toEqual(true);
        });
    });
});