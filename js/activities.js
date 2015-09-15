'use strict';

// Ensure Babel/ES6 polyfills are loaded
require('babel-core/polyfill');

// Catch all errors
require('raven');

var $ = require('jquery');

var Vue = require('vue'),
    config = require('config');

// Ensure retrocompatibily for 0.12.2 replace behavior
Vue.options.replace = false;
Vue.config.debug = config.debug;

Vue.use(require('plugins/util'));
Vue.use(require('plugins/text'));
Vue.use(require('plugins/i18next'));
Vue.use(require('plugins/markdown'));

$(require('api')).on('built', function() {
    new Vue(require('components/activities/timeline.vue'));
});

