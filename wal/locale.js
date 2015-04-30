"use strict";

define(function() {
    /*+
     * @summary Locale class for internationalization
     * @param {Object} dict locales dictionary
     * @param {String} lng current client language
     * @return Locale instance
     */
    var Locale = function(dict, lng) {

        this._dict = dict;
        this._lng = lng;

        /**
         * @summary Sets the current client language
         * @param {String} lng the language
         */
        this.set = function(lng) {
            this._lng = lng;
        };

        /**
         * Gets a locale string from key
         * @param {String} key
         * @return {String} localized string or key if not found
         */
        this.get = function(key) {
            if(typeof this._lng != 'undefined' && typeof this._dict[this._lng] != 'undefined' && typeof this._dict[this._lng][key] != 'undefined') {
                return this._dict[this._lng][key];
            }
            return key;
        }
    }

    return Locale;
});
