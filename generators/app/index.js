'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

// Var util = require('util');
// var path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.cyan('\ngulp-sass-livereload')
    ));

    const prompts = [{
      type: 'input',
      name: 'appname',
      message: 'Your project name',
      default: this.appname // Default to current folder name
    }, {
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'Bootstrap',
        value: 'includeBootstrap',
        checked: true
      }, {
        name: 'jQuery(v2.1.1)',
        value: 'includeJQuery',
        checked: false
      }, {
        name: 'Modernizr(v2.8.2)',
        value: 'includeModernizr',
        checked: false
      }]
    }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;

      this.appname = this.props.appname;
      var features = this.props.features;

      function hasFeature(feat) {
        return features.indexOf(feat) !== -1;
      }
      this.includeJQuery = hasFeature('includeJQuery');
      this.includeBootstrap = hasFeature('includeBootstrap');
      this.includeModernizr = hasFeature('includeModernizr');
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {appname: this.appname}
    ),
    this.fs.copy(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json')
    ),

    this.fs.copy(
      this.templatePath('styles.css'),
      this.destinationPath('app/styles/styles.css')
    ),

    this.fs.copy(
      this.templatePath('styles.scss'),
      this.destinationPath('app/sass/styles.scss')
    ),

    this.fs.copy(
      this.templatePath('main.js'),
      this.destinationPath('app/scripts/main.js')
    ),

    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    ),

    this.fs.copy(
      this.templatePath('jshintrc'),
      this.destinationPath('jshintrc')
    ),

    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('app/index.html'),
      {
        appname: this.appname,
        includeJQuery: this.includeJQuery,
        includeBootstrap: this.includeBootstrap,
        includeModernizr: this.includeModernizr
      }
    );
  }

  install() {
    this.installDependencies();
  }
};
