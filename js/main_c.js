(function() {

  $.fn.fadeOutWithDelay = function(delay) {
    var self;
    self = this;
    return setTimeout((function() {
      return self.fadeOut(400);
    }), delay);
  };

  window.main = {
    m: {
      debug: {},
      settings: {
        console: $('div#console'),
        $notification: $('div#notification_wrap'),
        $input: $('input'),
        $window: $(window),
        $select: $('select')
      },
      state: {},
      fetchPosts: function() {
        main.makeProfile('fetchPost', 'Collapsed');
        return main.makeProfileEnd('fetchPost', 'Collapsed');
      }
    },
    o: {
      init: function() {
        main.makeProfile('init');
        main.v.console('init ok');
        main.v.console('init warning', 'warning');
        main.v.console('init alert', 'alert');
        main.e.listen();
        $('div#button').eq(0).trigger('click');
        main.v.showNoty('alert', 'alert', 6000);
        main.v.showNoty('warning', 'warning', 6000);
        main.v.showNoty('ok', 'ok', 6000);
        return main.makeProfileEnd('init');
      }
    },
    v: {
      console: function(string, type) {
        return main.m.settings.console.prepend("<p class=\"" + (type || 'ok') + "\">" + string + "<p>");
      },
      showNoty: function(options) {
        var $curr_noty, defaults;
        defaults = {
          text: 'I\'m default noty',
          type: 'ok',
          hide: 4000,
          callback: (function() {})
        };
        options = $.extend({}, defaults, options || {});
        main.m.settings.$notification.prepend("<div id=\"noty\" class=\"" + options.type + "\">" + options.text + "</div>");
        $curr_noty = main.m.settings.$notification.find('div#noty').first();
        $curr_noty.fadeOutWithDelay(options.hide);
        $curr_noty.fadeIn();
        return $curr_noty.data({
          callback: options.callback
        });
      }
    },
    e: {
      listen: function() {
        main.makeProfile('listen', 'Collapsed');
        main.m.settings.$window.on('keydown', function(e) {
          if (e.altKey) {
            e.preventDefault();
            switch (e.keyCode) {
              case 37:
                return main.m.settings.$input.stop(true, false).animate({
                  'left': '-=20'
                });
              case 38:
                return main.m.settings.$input.stop(true, false).animate({
                  'top': '-=20'
                });
              case 39:
                return main.m.settings.$input.stop(true, false).animate({
                  'left': '+=20'
                });
              case 40:
                return main.m.settings.$input.stop(true, false).animate({
                  'top': '+=20'
                });
            }
          }
        });
        main.m.settings.$select.on('change', function() {
          var $this;
          $this = $(this);
          console.log($this.find(':selected').index());
          switch ($this.find(':selected').index()) {
            case 1:
              return main.m.settings.$input.animate({
                'top': '20'
              });
            case 2:
              return main.m.settings.$input.animate({
                'top': main.m.settings.$window.outerHeight() - main.m.settings.$input.outerHeight() - 20
              });
            case 3:
              return main.m.settings.$input.animate({
                'left': '20'
              });
            case 4:
              return main.m.settings.$input.animate({
                'left': main.m.settings.$window.outerWidth() - main.m.settings.$input.outerWidth() - 20
              });
            case 5:
              return main.m.settings.$input.animate({
                'top': -(main.m.settings.$input.outerHeight() / 2),
                'left': -(main.m.settings.$input.outerWidth() / 2)
              });
            case 6:
              return main.m.settings.$input.animate({
                'top': -(main.m.settings.$input.outerHeight() / 2),
                'left': main.m.settings.$window.outerWidth() - main.m.settings.$input.outerWidth() + (main.m.settings.$input.outerWidth() / 2)
              });
            case 7:
              return main.m.settings.$input.animate({
                'left': -main.m.settings.$input.outerWidth() / 2,
                'top': main.m.settings.$window.outerHeight() - (main.m.settings.$input.outerHeight() / 2)
              });
            case 8:
              return main.m.settings.$input.animate({
                'top': main.m.settings.$window.outerHeight() - (main.m.settings.$input.outerHeight() / 2),
                'left': main.m.settings.$window.outerWidth() - main.m.settings.$input.outerWidth() + (main.m.settings.$input.outerWidth() / 2)
              });
          }
        });
        $('div#buttons').on('click', '#button', function() {
          var $this;
          $this = $(this);
          switch ($this.index()) {
            case 1:
              main.m.settings.$input.animate({
                'top': main.m.settings.$window.outerHeight() / 2 - main.m.settings.$input.outerHeight() / 2 - 20,
                'left': main.m.settings.$window.outerWidth() / 2 - main.m.settings.$input.outerWidth() / 2 - 20
              });
              return main.m.settings.$select.find(':selected').attr('selected', false);
            case 2:
              if (!$this.data().fixed || !($this.data().fixed != null)) {
                main.m.settings.$input.css({
                  'position': 'fixed'
                });
                $this.text('fixed');
                return $this.data().fixed = true;
              } else {
                main.m.settings.$input.css({
                  'position': 'absolute'
                });
                $this.text('fix');
                return $this.data().fixed = false;
              }
          }
        });
        main.m.settings.$notification.on('click', 'div#noty', (function() {
          $(this).fadeOut(500, (function() {
            return $(this).remove();
          }));
          if ($(this).data().callback) return $(this).data().callback();
        }));
        return main.makeProfileEnd('listen');
      }
    },
    makeProfile: function(name, type) {},
    makeProfileEnd: function(name) {}
  };

  main.o.init();

}).call(this);
