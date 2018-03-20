/**
 * Created by knutandersstokke on 16.10.2016.
 *
 */
/** Manager for events stored in queue. Manager is also responsible for executing events automatically */
var eventManager = /** @class */ (function () {
    function eventManager() {
        this.delayTime = 1000;
        this.nextEvents = [];
        this.previousEvents = [];
    }
    // Executing the next event in the queue, adding it to 'previous'
    eventManager.prototype.next = function () {
        if (this.nextEvents.length == 0) {
            return;
        }
        var event = this.nextEvents.shift();
        console.log(this.nextEvents);
        event.next();
        console.log(event.next());
        this.previousEvents.push(event);
        if (event.duration == 0)
            this.next();
    };
    // Executing the previous event
    eventManager.prototype.previous = function () {
        if (this.previousEvents.length == 0)
            return;
        var event = this.previousEvents.pop();
        this.delayTime = 0; //TODO: Should there be a delay when stepping backwards?
        event.previous();
        this.nextEvents.unshift(event);
    };
    eventManager.prototype.addEvent = function (event) {
        this.nextEvents.push(event);
    };
    eventManager.prototype.start = function () {
        clearInterval(this.eventThread);
        var manager = this; // Anonymous functions cannot access this...
        this.eventThread = setInterval(function () {
            manager.next();
        }, manager.delayTime);
    };
    eventManager.prototype.pause = function () {
        clearInterval(this.eventThread);
    };
    return eventManager;
}());
var FrontendEvent = /** @class */ (function () {
    function FrontendEvent(n, p, d) {
        this.next = n;
        this.previous = p;
        this.duration = d;
    }
    return FrontendEvent;
}());
var manager = new eventManager();
/*
/** How to add FrontendEvents to manager
for(var i=0; i<10; i++) {
    var f = function(k) {
        return function() {console.log("Going forward, step " + k);};
    }(i);
    var b = function(k) {
        return function() {console.log("Going backward, step " + k);}
    }(i);
    manager.addEvent(new FrontendEvent(f,b));
}
*/