define(function (require) {

  var Ember = require('ember');
  var DS = require('ember-data');

  var App = window.App = Ember.Application.create({
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true
  });

  // Inject templates into Ember
  require('templates');

  // Configure Adapters/Serializers
  App.ApplicationAdapter = DS.RESTAdapter;
  App.ApplicationSerializer = DS.RESTSerializer;

  // Load Models
  App.Package = require('app/models/package');

  // Load Controllers
  App.PackagesController = require('app/controllers/packages');
  App.PackageController = require('app/controllers/package');

  // Load Routes
  App.LoadingRoute = Ember.Route.extend();
  App.ApplicationRoute = require('app/routes/application');
  App.PackagesRoute = require('app/routes/packages');
  App.PackageRoute = require('app/routes/package');

  // Load Views
  App.FilterView = require('app/views/filter');
  App.SearchView = require('app/views/search');

  // Configure Router
  App.Router.map(function() {
    this.route('packages', { path: '/' });
    this.route('search', { path: '/search/:query' });
    this.resource('package', { path: '/package/:name' });
    this.route('fourohfour', { path: "/*path" });
  });

  return App;
});
