var hbs = require('hbs');
var moment = require('moment')

// Create ability to extend layouts.
var blocks = {};

hbs.registerHelper('extend', function (name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this));
});

hbs.registerHelper('block', function (name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

hbs.registerHelper('repeat', function (amount, options) {
    var out = '';
    for (var i = 0; i < amount; i++) {
        out += options.fn(amount[i]);
    }
    return out;
});

hbs.registerHelper('n_minus_repeat', function (n, amount, options) {
    var out = '';
    for (var i = 0; i < n - amount; i++) {
        out += options.fn(amount[i]);
    }
    return out;
});

hbs.registerHelper('if_even', function (conditional, options) {
    if ((conditional % 2) == 0) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

hbs.registerHelper('if_odd', function (conditional, options) {
    if ((conditional % 2) == 1) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

hbs.registerHelper('ifEq', function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

//  format an ISO date using Moment.js
//  http://momentjs.com/
//  moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
//  usage: {{dateFormat creation_date format="MMMM YYYY"}}
hbs.registerHelper('date', function (context, block) {
    var f = block.hash.format || 'YYYY-MM-DD HH:mm:ss';
    return moment(new Date(context)).format(f);
});