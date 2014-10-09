require.config({

  // override data-main from script tag during debug mode
  baseUrl: '/',

  // configure paths
  paths: {
    // bower components
    jquery: 'bower_components/jquery/dist/jquery',
    handlebars: 'bower_components/handlebars/handlebars',
    ember: 'bower_components/ember/ember',
    'ember-data': 'bower_components/ember-data/ember-data',
    fuse: 'bower_components/fuse/src/fuse',

    // aliases
    templates: 'public/templates',

    // loader plugins
    text: 'bower_components/requirejs-plugins/lib/text',
    json: 'bower_components/requirejs-plugins/src/json'
  },

  // load non-amd dependencies
  shim: {
    jquery: {
      exports: 'jQuery'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    ember: {
      deps: ['jquery', 'handlebars'],
      exports: 'Ember'
    },
    'ember-data': {
      deps: ['ember'],
      exports: 'DS'
    },
  }
});
