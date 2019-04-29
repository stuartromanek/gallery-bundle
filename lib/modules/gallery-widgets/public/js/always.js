apos.define('gallery-widgets', {
  extend: 'apostrophe-widgets',
  construct: function (self, options) {
    self.play = function ($widget, data, options) {
      console.log('hello');
      console.log(data);
    };
  }
});