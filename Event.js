!function (name, definition) {

    var hasDefine = typeof define === "function";
    var hasExports = typeof module !== "undefined" && module.exports;
    if (hasDefine) {
        define(definition);
    }else if(hasExports){
        module.exports=definition();
    }
    else {
        this[name] = definition();
    }

}('Event', function () {
    function Event() {
        if (!(this instanceof Event)) {
            return new Event();
        }
        this._events = {}
    }

    Event.prototype.on = function (type, listener) {
        this._events[type] = this._events[type] || [];
        this._events[type].push(listener);
        return this;
    };

    Event.prototype.off = function (type, listener) {
        if (arguments.length === 0) {
            this._events = {};
        } else if (arguments.length === 1) {
            this._events[type] = [];
        } else {
            var list = this._events[type];
            if (list) {
                var length = list.length;
                for (var i = 0; i < length; i++) {
                    if (listener === list[i]) {
                        list.splice(i,1);
                    }
                }
            }
        }
        return this;
    };

    Event.prototype.trigger = function (type) {
        var args = Array.prototype.slice.call(arguments, 1);
        var list = this._events[type];
        if (list) {
            for (var i = 0, len = list.length; i < len; i++) {
                list[i].call(this, args);
            }
        }
    };

    Event.prototype.once = function (type, listener) {
        var that = this;
        var bridge = function () {
            var args = Array.prototype.slice.call(arguments, 1);
            that.off(type, listener);
            listener.call(that, args);
        };
        return this.on(type, bridge);
    };

    Event.mixTo = function (target) {
        var proto = Event.prototype;
        if (isFunction(target)) {
            merge(target.prototype);
            return new target();
        } else if (isObject(target)) {
            merge(target);
            return target;
        }

        function merge(obj) {
            for (var key in proto) {
                if (proto.hasOwnProperty(key)) {
                    obj[key] = proto[key];
                }
            }
            return this;
        }
    };

    function isType(type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']'
        }
    }

    var isFunction = isType("Function");
    var isObject = isType("Object");

    return Event;
});
