

module.exports = function (grunt) {
    'use strict';
//Gruntfile
require('load-grunt-tasks')(grunt);
    // requirejs compile options
    var compileOptions = {

        mainConfigFile: 'app/scripts/main.js',
        baseUrl: 'app/scripts',
        include: ['main'],
        out: 'dist/main.min.js',
        removeCombined: false,
        findNestedDependencies: true,

        //Removes console.logs for production
        onBuildWrite: function (moduleName, path, contents) {
            if (/(.*)js\/modules\/(.*)/.test(path)) {
                return contents.replace(/console.log(.*);/g, ';'); }
            return contents;
        }
    };

    //Initializing the configuration object
    grunt.initConfig({

        // Task configuration
      
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "./dist/main.min.css": 'main.scss'
                }
            }
        },

        requirejs: {
            compile: {
                options: compileOptions
            }
        },
        watch: {
           /* less: {
                // Watch all .less files from the styles directory)
                files: ['app/styles/*.less'],
                tasks: ['less'],
                // Reloads the browser
                options: {
                    livereload: true
                }
            },*/
            /*requirejs: {
                // Watch only main.js so that we do not constantly recompile the .js files
                files: ['app/scripts/main.js'],
                tasks: ['requirejs'],
                // Reloads the browser
                options: {
                    livereload: true
                }
            }*/
        }
    });

    // Plugin loading
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Task definition
    grunt.registerTask('default', ['watch', 'sass']);

};
