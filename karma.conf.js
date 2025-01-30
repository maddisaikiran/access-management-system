module.exports = function (config) {
    config.set({
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma'),
      ],
      reporters: ['progress', 'coverage'],
      port: 9876,
      autowatch: true,
      coverageReporter: {
        dir: require('path').join(__dirname, './coverage'),
        subdir: '.',
        reporters: [{ type: 'html' }, { type: 'text-summary' }],
      },
      browsers: ['Chrome'],
      singleRun: false,
    });
  };
  