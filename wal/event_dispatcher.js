"use strict";

define(function() {
    /*+
     * @summary Event Dispatcher
     * @description Function which creates new EventDispatcher objects.
     *              Implementation follows the Mediator pattern
     * @return EventDispatcher instance
     */
    var EventDispatcher = function() {

        this._prefix = 'on_';

        this.listeners = {};

        /**
         * @summary Adds a prefix to the event name
         * @description Assures that event name doesn't match a standard Object property name
         * @memberof EventDispatcher.prototype
         * @return {String} prefixed event name
         */
        this.evtName = function(evt_name) {
            return this._prefix + evt_name;
        };

        /**
         * @summary Registers a callback to an event
         * @param {String} event_name name of the event
         * @param {Mixed} bind the value of this provided to the callback
         * @param {Function} callback function binded to the event
         * @memberof EventDispatcher.prototype
         */
        this.register = function(evt_name, bind, callback) {
            var _evt_name = this.evtName();
            if (typeof this.listeners[_evt_name] === 'undefined') {
                this.listeners[_evt_name] = [];
            }
            this.listeners[_evt_name].push([bind === null ? this : bind, callback]);
        };

        /**
         * @summary Unregisters one or all callbacks binded to the given event
         * @param {String} event_name name of the event
         * @param {Function} callback function to unregister. All callbacks if empty
         * @memberof EventDispatcher.prototype
         */
        this.unregister = function(evt_name, callback) {
            var _evt_name = this.evtName();
            if(typeof callback === 'undefined') {
                delete this.listeners[_evt_name];
            }
            else {
                for (var i = 0, len = this.listeners[_evt_name].length; i < len; i++) {
                    var listener = this.listeners[_evt_name][i];
                    if(listener[1] === callback) {
                        this.listeners[_evt_name].splice(i, 1);
                    }
                }
            }
        };

        /**
         * @summary Emits an event, all registered callbacks are called
         * @param {String} event_name name of the event
         * @param {Mixed} params additional parameters passed to the callback
         * @memberof EventDispatcher.prototype
         */
        this.emit = function(evt_name, params) {
            var _evt_name = this.evtName();
            if (typeof this.listeners[_evt_name] != 'undefined') {
                for (var i = 0, l = this.listeners[_evt_name].length; i < l; i++) {
                    this.listeners[_evt_name][i][1].call(this.listeners[_evt_name][i][0], evt_name, params);
                }
            }
        };

    };

    return EventDispatcher;
});
