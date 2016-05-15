// "use strict";

// describe("PlayerCtrl", function() {
//     let elm, testScope, isolateScope;
//     var baseUrl        = "http://localhost:8000/";
//     var playlistGetUrl = baseUrl + "playlists/get/1";
//     var testVideo = {
//         videoId: 481516,
//         title: "Test Title",
//         thumbnail: "http://test.com/image.png"
//     };
//     var testPlaylist = {
//         title: "Test Playlist",
//         videos: [testVideo]
//     };

//     beforeEach(function() {
//         bard.appModule('app', function($provide) {
//             $provide.value('configService', {
//                 baseUrl: "http://localhost:20001/",
//                 youtubeKey: 'fakeKey'
//             });
//             $provide.value('$stateParams', {
//                 playlistId: 1
//             });
//             $provide.value('websocketService', {
//                 on: function() {
//                     return;
//                 }
//             });
//             $provide.value('lodash', _);
//         });

//         bard.inject(function($rootScope, $compile) {
//             console.log('HERE');
//             testScope = $rootScope;
//             elm = angular.element('<player></player>');
//             $compile(elm)(testScope);
//             console.log(elm);
//             testScope.$digest();
//             isolateScope = elm.isolateScope().$ctrl;
//         });

//         bard.mockService(youtubeSearch, {
//             search: $q.when({
//                 id: {
//                     videoId: testVideo.videoId
//                 },
//                 snippet: {
//                     title: testVideo.title,
//                     thumbnails: {
//                         default: testVideo.thumbnail
//                     }
//                 }
//             })
//         });

//         bard.mockService(playlistService, {
//             addVideo:    $q.when(function(playlist, newVideo) {
//                 return playlist.push(newVideo);
//             }),
//             deleteVideo: $q.when(),
//             retrieve:    $q.when(testPlaylist)
//         });

//         $httpBackend.when('GET', playlistGetUrl).respond(function() {
//             return [200, testPlaylist, {}];
//         });

//     });

//     describe("search", function() {
//         it("should return a youtube video object", function() {
//             isolateScope.searchText = "Test Query";
//             isolateScope.search();
//             $rootScope.$apply();
//             expect(isolateScope.searchResult.videoid).toEqual(481516);
//         });

//         it("should not call youtubeSearch service#search if searchtext is undefined", function() {
//             isolateScope.searchText = undefined;
//             isolateScope.search();
//             expect(isolateScope.searchResult).toEqual(null);
//         });
//     });

//     describe("addVideoToPlaylist", function() {
//         it("should add video from search results to playlist", function() {
//             isolateScope.searchResult = testVideo;
//             $rootScope.$apply();

//             expect(isolateScope.playlist.videos.length).toEqual(1);
//             isolateScope.addVideoToPlaylist();
//             expect(isolateScope.playlist.videos.length).toEqual(2);
//             expect(isolateScope.playlist.videos[1].title).toEqual(testVideo.title);
//         });
//     });

//     describe('addSocketVideoToPlaylist', function() {
//         it('should add the text result from websocket to playlist', function() {
//             $rootScope.$apply();

//             expect(isolateScope.playlist.videos.length).toEqual(2);
//             isolateScope.addSocketVideoToPlaylist({
//                 videoId: 42,
//                 title: "Socket Video",
//                 thumbnail: "http://socket.com/socket.png"
//             });

//             expect(isolateScope.playlist.videos.length).toEqual(3);
//             expect(isolateScope.playlist.videos[2].title).toEqual('Socket Video');
//         });

//         it('should call playlistService.addVideo', function() {
//             $rootScope.$apply();

//             expect(isolateScope.playlist.videos.length).toEqual(3);
//             isolateScope.addSocketVideoToPlaylist({
//                 videoId: 42,
//                 title: "Socket Video",
//                 thumbnail: "http://socket.com/socket.png"
//             });

//             expect(isolateScope.updatedPlaylist).toEqual(undefined);
//             $rootScope.$apply();
//             expect(isolateScope.updatedPlaylist.length).toEqual(2);
//         });
//     });

//     describe('deleteVideo', function() {
//         it('should prevent any event propagation', function() {
//             var testEvent = {
//                 stopPropagation: sinon.spy(),
//                 preventDefault:  sinon.spy()
//             };

//             isolateScope.deleteVideo(481516, testEvent);

//             expect(testEvent.stopPropagation.calledOnce).toEqual(true);
//             expect(testEvent.preventDefault.calledOnce).toEqual(true);
//         });

//         it('should call remove video from playlist', function() {
//             $rootScope.$apply();
//             expect(isolateScope.playlist.videos.length).toEqual(4);

//             isolateScope.deleteVideo(1, {});

//             $rootScope.$apply();
//             expect(isolateScope.playlist.videos.length).toEqual(4);
//         });
//     });

//     describe("playVideo", function() {
//         it("should set activeVideo to selected video", function() {
//             $rootScope.$apply();

//             expect(isolateScope.playlist.activeVideo).toEqual(undefined);
//             isolateScope.playVideo(1);
//             expect(isolateScope.playlist.activeVideo).toEqual(1);
//         });
//     });
// });
