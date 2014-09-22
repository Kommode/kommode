'use strict';

module.exports = function(grunt) {
  // configurable paths
  var config = {
    src: {
      root: 'src',
      assets: 'src/assets'
    },
    dist: {
      root: 'build',
      assets: 'build/assets'
    },
    tmp: {
      root: '.tmp',
      assets: '.tmp/assets'
    }
  };

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // displays the execution time of grunt tasks
  require('time-grunt')(grunt);

  grunt.initConfig({
    config: config,
    watch: {
      styles: {
        files: ['<%= config.src.assets %>/styles/**/*.{scss,sass,css}'],
        tasks: ['sass', 'autoprefixer']
      },
      scripts: {
        files: ['<%= config.src.assets %>/scripts/**/*.js'],
        tasks: ['jshint', 'jscs'],
        options: {
          livereload: false
        }
      },
      others: {
        files: ['<%= config.src.root %>/**/*.html'],
        tasks: ['copy']
      },
      markup: {
        files: ['<%= config.src.root %>/views/{,*/}{,*/}*.html'],
        tasks: ['includes']
      },

      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.tmp.root %>/{,*/}*.html',
          '<%= config.tmp.assets %>/styles/{,*/}*.css',
          '<%= config.src.assets %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // grunt server with livereload
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
        // hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.tmp.root %>',
            '<%= config.src.root %>'
          ],
          middleware: function(connect, options) {
            var middlewares = [];
            var directory = options.directory || options.base[options.base.length - 1];

            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            // Enables rewrites to index.html for single-page apps
            var modRewrite = require('connect-modrewrite');
            middlewares.push(
              modRewrite(['^[^\\.]*$ /index.html [L]'])
            );

            options.base.forEach(function(base) {
              // Serve static files.
              middlewares.push(connect.static(base));
            });

            // Make directory browse-able.
            middlewares.push(connect.directory(directory));

            return middlewares;
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist.root %>'
        }
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.tmp.root %>',
            '<%= config.dist.root %>'
          ]
        }]
      },
      server: '<%= config.tmp.root %>'
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      all: [
        'Gruntfile.js',
        '<%= config.src.assets %>/scripts/**/*.js'
      ]
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= config.src.assets %>/scripts/**/*.js'
      ]
    },

    sass: {
      dev: {
        options: {
          loadPath: [
            '<%= config.src.assets %>/styles',
            '<%= config.src.assets %>/bower_components'
          ],
          style: 'expanded'
        },
        files: {
          '<%= config.tmp.assets %>/styles/main.css': ['<%= config.src.assets %>/styles/main.scss']
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9']
      },
      dev: {
        src: '<%= config.tmp.assets %>/styles/main.css'
      }
    },

    includes: {
      files: {
        src: ['<%= config.src.root %>/index.html'],
        dest: '<%= config.tmp.root %>',
        flatten: true,
        options: {
          silent: true
        }
      }
    },

    // renames files for browser cache busting
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist.assets %>/scripts/{,*/}*.js',
            '<%= config.dist.assets %>/styles/{,*/}*.css'
          ]
        }
      }
    },

    // reads html for usemin blocks and automatically concats, minifies and
    // revision files.
    useminPrepare: {
      html: '<%= config.src.root %>/index.html',
      options: {
        dest: '<%= config.dist.root %>',
        root: '<%= config.src.root %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= config.dist.root %>/{,*/}{,*/}{,*/}{,*/}*.html'],
      css: ['<%= config.dist.assets %>/styles/*.css'],
      options: {
        assetsDirs: ['<%= config.dist.root %>']
      }
    },

    // minifies html
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true,
          keepClosingSlash: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist.root %>',
          src: [
            '*.html',
            'views/{,*/}{,*/}*.html'
          ],
          dest: '<%= config.dist.root %>'
        }]
      }
    },

    copy: {
      build: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.src.root %>',
          dest: '<%= config.dist.root %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}{,*/}{,*/}{,*/}*.html',
            'api/*'
          ]
        },
        {
          expand: true,
          dot: true,
          cwd: '<%= config.src.assets %>',
          dest: '<%= config.dist.assets %>',
          src: [
            'images/{,*/}*',
            'fonts/{,*/}*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= config.src.assets %>/styles',
        dest: '<%= config.tmp.assets %>/styles/',
        src: '{,*/}*.css'
      }
    }

  });

  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['dist', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'includes',
      'sass',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', ['jshint', 'jscs']);

  grunt.registerTask('build', [
    'test',
    'clean:dist',
    'includes',
    'useminPrepare',
    'sass',
    'autoprefixer',
    'concat',
    'copy:build',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', ['build', 'watch']);
};
