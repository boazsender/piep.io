define(function (require) {

  var Ember = require('ember');

  return Ember.ObjectController.extend({
    needs: ['packages'],
    packages: Ember.computed.alias('controllers.packages'),

    visible: function() {
      var tagFilter = this.get('packages.tagFilter');
      var search = this.get('packages.searchResults');
      var clearedTag = true;
      var clearedQuery = true;
      if (tagFilter && tagFilter.length) {
        clearedTag = tagFilter.any(function (tag) {
          return this.get('tags').contains(tag);
        }, this);
      }
      clearedQuery = search.contains(this.get('id'));

      return (clearedTag && clearedQuery);
    }.property(
      'packages.tagFilter',
      'packages.searchResults',
      'tags'
    )
  });

});
