// "use strict";

// describe("PlaylistsCtrl", function() {
//     let isolateScope, elm, testScope;
//     var testPlaylist = {
//         id: 4,
//         title: "New Playlist"
//     };
//     var testPlaylists = [
//         {
//             id: 1,
//             title: "Playlist One"
//         },
//         {
//             id: 2,
//             title: "Playlist Two"
//         }
//     ];

//     beforeEach(function() {
//         bard.appModule('app', function($provide) {
//             $provide.value('configService', {
//                 baseUrl: "http://localhost:20001/",
//                 youtubeKey: 'fakeKey'
//             });
//         });

//         bard.inject(function($rootScope, $compile) {
//             testScope = $rootScope;
//             elm = angular.element('<playlists></playlists>');

//             $compile(elm)(testScope);
//             testScope.$digest();
//             isolateScope = elm.isolateScope().$ctrl;
//         });

//         bard.mockService(playlistService, {
//             retrieveAll: $q.when(testPlaylists),
//             create: $q.when(testPlaylist)
//         });

//         bard.mockService($state, {
//             go: sinon.spy()
//         });
//     });

//     describe("initialization", function() {
//         it("should retrieve all playlists for display", function() {
//             expect(isolateScope.playlists.length).toEqual(0);
//             $rootScope.$apply();
//             expect(isolateScope.playlists.length).toEqual(2);
//             expect(isolateScope.playlists[1].id).toEqual(2);
//         });
//     });

//     describe("createPlaylist", function() {
//         it("should create and navigate to a new playlist", function() {
//             isolateScope.newTitle = "New Playlist";
//             isolateScope.createPlaylist();
//             $rootScope.$apply();
//             expect($state.go.calledWith(
//                 'layout.playlist',
//                 {playlistId: testPlaylist.id}
//             )).toEqual(true);
//         });
//     });
// });
