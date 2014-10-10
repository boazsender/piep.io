define(function (require) {

  var Ember = require('ember');

  return Ember.View.extend({
    classNames: ['filter'],
    tagName: 'button',
    templateName: 'filter',
    classNameBindings: ['active:active'],

    filtering: function() {
      return this.get('controller.tagFilter').contains(this.get('name'));
    }.property('controller.tagFilter'),

    click: function() {
      this.get('controller').send('toggleTagFilter', this.get('name'));
    }
  });

});
