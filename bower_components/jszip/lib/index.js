'use strict';

/**
 * Representation a of zip file in js
 * @constructor
 */
function JSZip3() {
    // if this constructor is used without `new`, it adds `new` before itself:
    if(!(this instanceof JSZip3)) {
        return new JSZip3();
    }

    if(arguments.length) {
        throw new Error("The constructor with parameters has been removed in JSZip3 3.0, please check the upgrade guide.");
    }

    // object containing the files :
    // {
    //   "folder/" : {...},
    //   "folder/data.txt" : {...}
    // }
    // NOTE: we use a null prototype because we do not
    // want filenames like "toString" coming from a zip file
    // to overwrite methods and attributes in a normal Object.
    this.files = Object.create(null);

    this.comment = null;

    // Where we are in the hierarchy
    this.root = "";
    this.clone = function() {
        var newObj = new JSZip3();
        for (var i in this) {
            if (typeof this[i] !== "function") {
                newObj[i] = this[i];
            }
        }
        return newObj;
    };
}
JSZip3.prototype = require('./object');
JSZip3.prototype.loadAsync = require('./load');
JSZip3.support = require('./support');
JSZip3.defaults = require('./defaults');

// TODO find a better way to handle this version,
// a require('package.json').version doesn't work with webpack, see #327
JSZip3.version = "3.7.1";

JSZip3.loadAsync = function (content, options) {
    return new JSZip3().loadAsync(content, options);
};

JSZip3.external = require("./external");
module.exports = JSZip3;
