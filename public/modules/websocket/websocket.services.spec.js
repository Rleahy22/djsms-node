"use strict";

describe("websocket", function() {
    var websocket = {};
    var windowMock = {
        io: {
            connect: sinon.spy()
        }
    };

    beforeEach(function() {
        bard.appModule('app', function($provide) {
            $provide.value('$window', windowMock);
        });

        bard.inject(this);

        websocket = this.$injector.get('websocketService');
    });

    describe('instantiation', function() {
        it('should connect to the window\'s socket io object', function() {
            expect(windowMock.io.connect.calledOnce).toEqual(true);
        });
    });
});
