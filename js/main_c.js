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
        $notification: $('div#notification_wrap')
      },
      state: {},
      fetchPosts: function() {
        main.makeProfile('fetchPost', 'Collapsed');
        return main.makeProfileEnd('fetchPost', 'Collapsed');
      }
    },
    o: {
      init: function() {
        console.log(main.m.debug);
        main.makeProfile('init');
        main.v.console('init ok');
        main.v.console('init warning', 'warning');
        main.v.console('init alert', 'alert');
        main.e.listen();
        $('div#button').eq(4).trigger('click');
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
        $('div#buttons').on('click', '#button', function() {
          var $this;
          $this = $(this);
          console.log($this.index());
          switch ($this.index()) {
            case 0:
              return $('input').animate({
                'top': '20'
              });
            case 1:
              return $('input').animate({
                'top': $(window).outerHeight() - $('input').outerHeight() - 20
              });
            case 2:
              return $('input').animate({
                'left': '20'
              });
            case 3:
              return $('input').animate({
                'left': $(window).outerWidth() - $('input').outerWidth() - 20
              });
            case 4:
              return $('input').animate({
                'top': $(window).outerHeight() / 2 - $('input').outerHeight() / 2 - 20,
                'left': $(window).outerWidth() / 2 - $('input').outerWidth() / 2 - 20
              });
            case 5:
              if (!$this.data().fixed || !($this.data().fixed != null)) {
                $('input').css({
                  'position': 'fixed'
                });
                $this.text('fixed');
                return $this.data().fixed = true;
              } else {
                $('input').css({
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
    makeProfile: function(name, type) {
      console["group" + (type || '')](name);
      console.profile(name);
      return console.time("" + name + " takes");
    },
    makeProfileEnd: function(name) {
      console.timeEnd("" + name + " takes");
      console.profileEnd(name);
      return console.groupEnd(name);
    }
  };

  main.o.init();

}).call(this);
