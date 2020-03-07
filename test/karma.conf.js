// Karma configuration
// Generated on Thu Mar 05 2020 11:19:43 GMT+0800 (CST)

let testWebpack=require('../webpack/webpack.test.conf');
let path=require('path');
module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',
        client: {
            captureConsole: true // 设置由 terminal 捕捉 browser 的输出
        },
        browserConsoleLogOptions: {
            level: "log",
            format: "%b %T: %m",
            terminal: true
        },


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha',"chai"],
        // 注册插件
        plugins: [
            "karma-mocha",
            "karma-chrome-launcher",
            "karma-chai",
            "karma-webpack",
            "karma-coverage"
        ],


        // list of files / patterns to load in the browser
        files: [
            './index.js'
        ],


        // list of files / patterns to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // 为选定脚本指定前处理器，这里配置所有的测试脚本需要经过webpack处理
            './index.js':['webpack']
        },
        // webpack配置，针对测试脚本打包的compilation配置，与项目文件打包不相关
        // 也可以引入独立的配置文件
        webpack:testWebpack,
        webpackMiddleware: {
            //如果使用了webpack-dev-server则可以传入一些参数
            stats: 'errors-only'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress','coverage'],
        // 测试覆盖率报告
        // https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md
        coverageReporter: {
            dir: 'coverage/',
            /* 多个报告类型 */
            reporters: [
                {type: 'text-summary',subdir:'.',file:'textSummary.txt'},
                {type:'text-summary'},
                {type:'html',subdir:'html'}
            ]
        },


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
