/**
 * Created by knutandersstokke on 16.10.2016.
 *
 */
/** Manager for events stored in queue. Manager is also responsible for executing events automatically */
var eventManager = /** @class */ (function () {
    function eventManager() {
        this.delayTime = 1000; // Original value
        this.nextEvents = [];
        this.previousEvents = [];
        this.paused = true;
    }
    // Executing the next event in the queue, adding it to 'previous'
    eventManager.prototype.next = function () {
        if (this.nextEvents.length == 0) {
            return;
        }
        var event = this.nextEvents.shift();
        event.next();
        this.previousEvents.push(event);
        if (event.duration == 0)
            this.next();
    };
    // Executing the previous event
    eventManager.prototype.previous = function () {
        this.pause();
        if (this.previousEvents.length == 0)
            return;
        var event = this.previousEvents.pop();
        //this.delayTime = 500; //this line set to 0 caused: when resuming all animations are played out. Intention Delay when stepping backwards.
        event.previous();
        this.nextEvents.unshift(event);
    };
    eventManager.prototype.addEvent = function (event) {
        this.nextEvents.push(event);
    };
    eventManager.prototype.start = function () {
        var manager = this; // Anonymous functions cannot access this...
        this.paused = false;
        this.eventThread = setInterval(function () {
            manager.next();
        }, manager.delayTime);
    };
    eventManager.prototype.pause = function () {
        this.paused = true;
        clearInterval(this.eventThread);
    };
    eventManager.prototype.unpause = function () {
        var manager = this;
        this.paused = false;
        this.eventThread = setInterval(function () {
            manager.next();
        }, manager.delayTime);
    };
    eventManager.prototype.clear = function () {
        clearInterval(this.eventThread);
        this.nextEvents = [];
        this.previousEvents = [];
    };
    eventManager.prototype.slow = function () {
        this.delayTime = 1200;
        this.helpSetInterval();
    };
    eventManager.prototype.medium = function () {
        this.delayTime = 800;
        this.helpSetInterval();
    };
    eventManager.prototype.fast = function () {
        this.delayTime = 400;
        this.helpSetInterval();
    };
    eventManager.prototype.helpSetInterval = function () {
        if (!this.paused) {
            this.pause();
            this.start();
        }
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
