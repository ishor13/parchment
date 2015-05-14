var through = require('through');
var tsconfig = require('./tsconfig.json');

module.exports = function(config) {
  var transform = function(file) {
    // Hack to give karma-coverage the source files for html reporter
    // since we do not actually use karma to instrument in order to
    // map to pre-browserified code
    var store = require('karma-coverage/lib/sourceCache').getByBasePath(config.basePath);
    var chunks = [];
    return through(function(buff) {
      chunks.push(buff);
      this.queue(buff)
    }, function() {
      store[file] = chunks.join('');
      this.queue(null);
    })
  };

  config.set({
    basePath: '',
    frameworks: ['browserify', 'jasmine'],
    files: [
      'test/parchment.ts',
      'test/unit/*.js'
    ],
    preprocessors: {
      'test/parchment.ts': ['browserify']
    },
    browserify: {
      transform: [transform, 'browserify-istanbul'],
      plugin: [['tsify', tsconfig.compilerOptions]]
    },
    exclude: [],
    reporters: ['progress'],
    coverageReporter: {
      dir: '.build/coverage',
      reporters: [
        { type: 'html' },
        { type: 'text' }
      ]
    },
    browsers: ['Chrome'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true
  });
};