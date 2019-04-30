apos.define('apostrophe-areas-editor', {
  construct: function (self, options) {
    var superEnhanceWidgetControls = self.enhanceWidgetControls;
    self.enhanceWidgetControls = function ($widget) {
      superEnhanceWidgetControls($widget);
      self.populateToggles($widget, apos.areas.getWidgetData($widget).enableLightbox || false)
      // self.updatePersonaChoices($widget, apos.areas.getWidgetData($widget).personas || []);
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

    // The dropdown acts as a multiple selector, biased toward
    // the more common use case where only one choice is made.
    // Until you make a choice it looks like a single-select situation.
    // The multiple-select capability can be seen when you pull it
    // down again.
    //
    // The special choice "universal" is handled specially.
    //
    // If current persona context would make a widget not to be displayed
    // the widget will be displayed translucent for the author
    self.updatePersonaChoices = function ($widget, selected) {
      // if (selected.length > 0 && selected[0] !== '__current' && selected.indexOf(apos.personas.currentPersona) < 0) {
      //   $widget.addClass('apos-peek');
      // } else {
      //   $widget.removeClass('apos-peek');
      // }
      // var $controls = $widget.findSafe('[data-apos-widget-controls]', '[data-apos-area]');
      // var $select = $controls.find('[name="personas"]:first');
      // if (!self.choices) {
      //   self.captureLabelsAndChoices($select);
      // }
      // $select.html('');
      // if (selected.length === 0) {
      //   add('', '');
      //   addChoices();
      // } else {
      //   add('__', 'current', _.map(selected, function (value) {
      //     return self.labels[value];
      //   }).join(', '));
      //   _.each(self.choices, function (choice) {
      //     if (_.includes(selected, choice)) {
      //       add('- ', choice, '✓ ' + self.labels[choice]);
      //     } else {
      //       add('+ ', choice, self.labels[choice]);
      //     }
      //   });
      //   add('', '');
      // }
      // $select.selectedIndex = 0;

      // function addChoices() {
      //   _.each(self.choices, function (choice) {
      //     return add('', choice);
      //   });
      // }

      // function add(prefix, value, label) {
      //   var $option = $('<option></option>');
      //   $option.attr('value', prefix + value);
      //   $option.text(label || self.labels[value]);
      //   $select.append($option);
      // }
    };
    self.captureLabelsAndChoices = function ($select) {
      self.choices = [];
      self.labels = {};
      $select.find('option').each(function () {
        var value = $(this).attr('value');
        self.labels[value] = $(this).text();
        if (value) {
          self.choices.push(value);
        }
      });
    };
  }
});