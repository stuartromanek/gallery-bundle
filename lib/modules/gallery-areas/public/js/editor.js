apos.define('apostrophe-areas-editor', {
  construct: function (self, options) {
    var superEnhanceWidgetControls = self.enhanceWidgetControls;
    self.enhanceWidgetControls = function ($widget) {
      superEnhanceWidgetControls($widget);
      self.populateToggles($widget, apos.areas.getWidgetData($widget).enableLightbox || false)
    };
    var superRegisterClickHandlers = self.registerClickHandlers;
    self.registerClickHandlers = function () {
      superRegisterClickHandlers();
      self.$el.on('change', '[name="layout"]', self.startAutosavingHandler(self.changedLayout));
      self.$el.on('click', '[data-apos-enable-lightbox]', self.startAutosavingHandler(self.changedLightbox));
    };
    
    self.populateToggles = function($widget, data) {
      var $controls = $widget.findSafe('[data-apos-widget-controls]', '[data-apos-area]');
      var $button = $controls.find('[data-apos-enable-lightbox]:first');
      if (data === true) {
        $button.addClass('gallery-toggle-active');
      } else {
        $button.addClass('gallery-toggle-inactive');
      }
    } 

    self.changedLightbox = function(event) {
      var $el = $(event.target);
      var $widget = $el.closest('[data-apos-widget]');
      var $gallery = $widget.find('[data-gallery]');
      var data = apos.areas.getWidgetData($widget);
      if (data.enableLightbox) {
        data.enableLightbox = false;
        $el.removeClass('gallery-toggle-active');
        $el.addClass('gallery-toggle-inactive');
        $gallery.attr('data-gallery-lightbox', 'false')
      } else {
        data.enableLightbox = true
        $el.addClass('gallery-toggle-active');
        $el.removeClass('gallery-toggle-inactive');
        $gallery.attr('data-gallery-lightbox', 'true')
      }
      apos.areas.setWidgetData($widget, data);
      return false
    }
    self.changedLayout = function(event) {
      var $el = $(event.target);
      var $widget = $el.closest('[data-apos-widget]');
      var $gallery = $widget.find('[data-gallery]');
      var layout = $el.val();
      var data = apos.areas.getWidgetData($widget);
      data.layout = layout;
      apos.areas.setWidgetData($widget, data);
      var className = $gallery.attr('class');
      var classes = className.split(' ');
      classes.forEach(function (c, index) {
        if (c.match(/--layout-/g)) {
          classes[index] = 'gallery--layout-' + layout
        }
      })
      $gallery.attr('class', classes.join(' '))
      return false
    }
  }
});