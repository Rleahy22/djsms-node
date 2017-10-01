"use strict";

describe("websocket", function() {
    let websocket = {};
    let windowMock = {
        io: {
            connect: sinon.spy()
        }
    };

    beforeEach(module('app', function ($provide) {
        $provide.value('$window', windowMock);
    }));

    beforeEach(inject(function (websocketService) {
        this.websocket = websocketService;
    }));

    describe('instantiation', function() {
        it('should connect to the window\'s socket io object', function() {
            expect(windowMock.io.connect.calledOnce).toEqual(true);
        });
    });
});
