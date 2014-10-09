define(function (require) {

  var Ember = require('ember');
  var Fuse = require('fuse');

  return Ember.ArrayController.extend({

    queryParams: [
      'queryFilter',
      'tagFilter'
    ],
    tagFilter: [],
    queryFilter: null,

    // which package fields to include in local fuzzy search
    searchFields: ['id', 'name', 'tags'],

    // collect all tags from packages
    allTags: Ember.computed.mapBy('content', 'tags'),

    // get unique tags to provide toggalable filtering
    filters: function () {
      // flatten tags and get unique entries
      return Array.prototype.concat.apply([], this.get('allTags')).uniq();
    }.property('allTags'),

    // calculate what an array would be if you toggled a given value in or out
    calculateToggle: function(src, value) {
      if (!src.contains(value)) {
        src.pushObject(value);
      } else {
        src.removeObject(value);
      }
      return src;
    },

    // create search index from searchFields for fuse
    searchIndex: function() {
      var searchFields = this.get('searchFields');
      return this.map(function(pkg) {
        return pkg.getProperties(searchFields);
      });
    }.property('friends'),

    // build fuse search index
    fuse: function() {
      var searchFields = this.get('searchFields');
      return new Fuse(this.get('searchIndex'), {
        keys: searchFields,
        threshold: 0.3
      });
    }.property('searchIndex'),

    // fuzzy query for valid friends
    request: function(query) {
      return this.get('fuse').search(query);
    },

    // find which account ids match the queryFilter
    searchResults: function() {
      var query = this.get('queryFilter');
      if (!query) {
        return this.mapProperty('id');
      }
      return this.request(query).mapProperty('id');
    }.property('queryFilter'),

    actions: {
      clearTagFilters: function() {
        this.set('tagFilter', []);
      },

      toggleTagFilter: function(status) {
        var filtered = this.get('tagFilter');
        this.set('tagFilter', this.calculateToggle(filtered, status));
      },

      search: function(query) {
        this.set('queryFilter', (query === '' ? null : query));
      },

    }
  });

});
