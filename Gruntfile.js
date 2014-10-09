module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    clean: {
      public: ['public']
    },

    copy: {
      assets: {
        expand: true,
        cwd: 'assets',
        src: '**/*',
        dest: 'public'
      }
    },

    stylus: {
      css: {
        src: 'styles/style.stylus',
        dest: 'public/app.css'
      }
    },

    watch: {
      options: {
        livereload: true
      },
      jade: {
        files: ['app/pages/*'],
        tasks: ['jade:develop']
      },
      handlebars: {
        files: ['app/templates/**'],
        tasks: ['handlebars']
      },
      app: {
        files: ['app/**', '!app/templates/**']
      }
    },

    jade: {
      develop: {
        src: 'app/pages/index.jade',
        dest: 'public/index.html',
        options: { data: { develop: true } }
      },
      production: {
        src: 'app/pages/index.jade',
        dest: 'public/index.html',
        options: { data: { develop: false } }
      }
    },

    handlebars: {
      templates: {
        src: 'app/templates/**/*.hbs',
        dest: 'public/templates.js',
        options: {
          amd: true,
          templateBasePath: 'app/templates/'
        }
      }
    },

    requirejs: {
      options: {
        baseUrl: '',
        mainConfigFile: 'config/requirejs.js',
        name: 'bower_components/almond/almond',
        out: 'public/app.js'
      },
      develop: {
        options: {
          optimize: 'none'
        }
      },
      production: {
        options: {
          deps: ['app/index'],
          insertRequire: ['app/index']
        }
      }
    }
  });

  grunt.renameTask('emberTemplates', 'handlebars');

  grunt.registerTask('work', [
    'clean',
    'copy',
    'jade:develop',
    'handlebars',
    'stylus',
    'server:develop',
    'watch'
  ]);

  grunt.registerTask('production', [
    'clean',
    'copy',
    'jade:production',
    'handlebars',
    'stylus',
    'requirejs:production'
  ]);

  grunt.registerTask('default', 'work');

  grunt.registerTask('server', function() {
    if (this.flags.develop) {
      process.env.NODE_ENV = 'development';
    }
    require('./app');
  });

};
