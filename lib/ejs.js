/**
 * XadillaX created at 2015-03-25 19:24:55
 *
 * Copyright (c) 2015 Huaban.com, all rights
 * reserved
 */
var render = require("ejs").__express;
var minify = require("html-minifier").minify;

/**
 * __express
 *
 * wrap the render function of EJS in production
 * environment.
 */
exports.__express = function() {
    var args = Array.prototype.slice.call(arguments);
    var callback = args[args.length - 1];

    // the last element in args is a callback function.
    //
    // refer to line 181 @ /node_modules/ejs/lib/ejs.js
    //
    // ```
    // cb = args.pop()
    // ```
    args[args.length - 1] = function(err, result) {
        if(err || !result) return callback(err, result);

        try {
            return callback(err, minify(result, {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
                maxLineLength: 80
            }));
        } catch(e) {
            return callback(e, result);
        }
    };

    render.apply(null, args);
};

