"use strict";

process.env.NODE_ENV = "test";

var chai     = require('chai');
var expect   = chai.expect;
var db       = require('../../models/index');

var Playlist = db.playlist;

afterEach(function() {
    Playlist.destroy({
        where: {
            id: {$gt: 0}
        }
    });
});

describe("Playlist", function() {
    describe("create", function() {
        it("should create a playlist instance", function(done) {
            var currentTime = new Date().getTime();

            Playlist.create({
                title: "Test Playlist"
            })
            .then(function(result) {
                var laterTime = new Date().getTime();
                expect(result.title).to.equal("Test Playlist");
                expect(result.createdat.getTime()).to.be.above(currentTime);
                expect(result.createdat.getTime()).to.be.at.most(laterTime);

                done();
            }, function(error) {
                expect(1).to.equal(2);

                done();
            });
        });
    });
});
