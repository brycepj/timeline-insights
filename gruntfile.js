module.exports = function (grunt) {

    // 1. All configuration goes here
    grunt
        .initConfig({
            pkg: grunt.file.readJSON('package.json'),

            shell: {
                build: {
                    command: [
                        'git add .',
                        'git commit -m "last commit: <%= grunt.template.today("yyyy-mm-dd") %>"',
                        'git push origin master' ].join('&&')
                }
            },

            watch: {
                scripts: {
                    files: [ 'index.html', 'src/**/*.js', 'lib/**/*.js',
                        'gruntfile.js' ],
                    tasks: [ 'jshint', 'concat' ],
                    options: {
                        livereload: true,
                        spawn: false,
                    },
                }
            },

            concat: {
                js: {
                    src: [ 'src/base/intro.js',
                        'src/base/base.js',
                        'src/datasets/*.js',
                        'src/parsers/*.js',
                        'lib/afinn.js',
                        'lib/profanity.js',
                        'src/base/outro.js'],
                    dest: 'timeline-insights.js'
                }
            },

            jshint: {
                options: {
                    loopfunc: true,
                    laxbreak: true
                },
                all: [ 'Gruntfile.js', 'src/**/*.js', 'lib/**/*.js',"tests/spec/*.js" ]
            },
            uglify: {
                dev: {
                    files: {
                        'timeline-insights.min.js': ['timeline-insights.js']
                    }

                }
            }


        });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('dev', [ 'jshint', 'concat', 'uglify', 'watch' ]);

};
