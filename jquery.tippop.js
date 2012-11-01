(function() {

  $.prototype.tipPop = function(options) {
    var $parent, main, methods,
      _this = this;
    if (options == null) options = {};
    $parent = this;
    methods = {
      destroy: function() {
        console.log('destroy');
        this.destroyFocus();
        return this.destroyHover();
      },
      destroyHover: function() {
        console.log('destroyHover');
        $parent.off('mouseenter');
        $parent.off('mouseleave');
        $parent.data('hover', false);
        $parent.find('div#tippop').hide();
        return main.m.settings.type = 'focus';
      },
      destroyFocus: function() {
        console.log('destroyFocus');
        $parent.find('div#tippop_focus').each(function() {
          return $.removeData($(this).data);
        });
        main.m.settings.type = 'hover';
        $parent.off('focusin');
        $parent.off('focusout');
        $parent.data('focus', false);
        return $parent.find('div#tippop_focus').hide();
      }
    };
    main = {
      m: {
        state: {
          titleText: '',
          focusText: '',
          tryPositionCount: 0
        },
        settings: {
          $tipPop: '',
          $that: '',
          offset: 0,
          $body: $('body'),
          $window: $(window),
          type: 'all',
          positionPriority: {
            hover: [],
            focus: []
          }
        }
      },
      o: {
        init: function(options) {
          var defaults;
          if (options == null) options = {};
          console.log('init');
          defaults = {
            hoverPosition: 'best',
            focusPosition: 'best',
            type: 'all',
            delay: 2000,
            offset: 8,
            hoverPriority: ['top', 'bottom', 'left', 'right'],
            focusPriority: ['left', 'right', 'bottom', 'top']
          };
          options = $.extend({}, defaults, options || {});
          main.m.settings.$tipPop = main.o.getTipPop();
          main.m.settings.$that = _this;
          main.m.settings.offset = parseInt(options.offset, 10);
          main.m.settings.type = options.type;
          main.m.settings.hoverOnShow = options.hoverOnShow;
          main.m.settings.hoverOnHide = options.hoverOnHide;
          main.m.settings.focusOnShow = options.focusOnShow;
          main.m.settings.focusOnHide = options.focusOnHide;
          main.m.settings.focusPosition = options.focusPosition;
          main.m.settings.titlePosition = options.hoverPosition;
          main.m.settings.positionPriority.hover = options.hoverPriority;
          main.m.settings.positionPriority.focus = options.focusPriority;
          main.e.listen(main.m.settings.$that);
          return _this;
        },
        getTipPop: function() {
          var $tipPop;
          $tipPop = $('body').find('div#tippop');
          if ($tipPop.length === 0) {
            $('body').append('<div id="tippop"></div>');
            $tipPop = $('div#tippop');
          }
          return $tipPop;
        },
        focusSetEl: function($this) {
          if (!($this.data().$el != null)) {
            main.m.settings.$body.append('<div id="tippop_focus" class=""></div>');
            $this.$el = main.m.settings.$body.find('div#tippop_focus').last();
            return $this.data({
              $el: $this.$el
            });
          } else {
            return $this.$el = $this.data().$el;
          }
        },
        getNormalize: function($this, type) {
          var normalizeH, normalizeTipPop, normalizeW;
          normalizeW = 0;
          normalizeH = 0;
          normalizeTipPop = '';
          if (type === 'focus') {
            normalizeTipPop = $this.$el.attr('class', '');
            normalizeW = $this.$el.outerWidth();
            normalizeH = $this.$el.outerHeight();
          } else {
            normalizeTipPop = main.m.settings.$tipPop.attr('class', '');
            normalizeW = main.m.settings.$tipPop.outerWidth();
            normalizeH = main.m.settings.$tipPop.outerHeight();
          }
          return {
            normH: normalizeH,
            normW: normalizeW,
            normTipPop: normalizeTipPop
          };
        },
        makePosition: function(opt) {
          var callback, fixedNormalize, fixedNormalizeY, i, norm;
          if (opt.type === 'hover') {
            callback = main.m.settings.hoverOnShow;
          } else {
            callback = main.m.settings.focusOnShow;
          }
          fixedNormalize = 0;
          if (opt.positionType === 'fixed') {
            fixedNormalizeY = opt.$elem.offset().top - main.m.settings.$window.scrollTop();
          } else {
            fixedNormalizeY = opt.$elem.offset().top;
          }
          switch (opt.titlePosition) {
            case 'left':
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.addClass('left').css({
                top: fixedNormalizeY + (opt.$elem.outerHeight() / 2) - (norm.normH / 2) - 5,
                left: opt.$elem.offset().left - main.m.settings.offset - norm.normW
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'right':
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.addClass('right').css({
                top: fixedNormalizeY + (opt.$elem.outerHeight() / 2) - (norm.normH / 2) - 5,
                left: opt.$elem.offset().left + opt.$elem.outerWidth() + main.m.settings.offset
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'top':
              norm = main.o.getNormalize(opt.$elem, opt.type);
              console.log(norm.normH);
              norm.normTipPop.addClass('top').css({
                top: fixedNormalizeY - norm.normH - main.m.settings.offset - 4,
                left: opt.$elem.offset().left + (opt.$elem.outerWidth() / 2) - (norm.normW / 2) - 5
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'bottom':
              norm = main.o.getNormalize(opt.$elem, opt.type);
              console.log(norm.normH);
              norm.normTipPop.addClass('bottom').css({
                top: fixedNormalizeY + opt.$elem.outerHeight() + main.m.settings.offset,
                left: opt.$elem.offset().left + (opt.$elem.outerWidth() / 2) - (norm.normW / 2) - 5
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'best':
              i = main.m.state.tryPositionCount++;
              if (i < main.m.settings.positionPriority[opt.type].length) {
                main.o.makePosition({
                  $elem: opt.$elem,
                  titlePosition: main.o.tryPosition[main.m.settings.positionPriority[opt.type][i]](opt.$elem, opt.type),
                  type: opt.type,
                  positionType: opt.positionType
                });
              } else {
                main.o.makePosition({
                  $elem: opt.$elem,
                  titlePosition: main.m.settings.positionPriority[opt.type][0],
                  type: opt.type,
                  positionType: opt.positionType
                });
              }
          }
          return opt.$elem;
        },
        isVisible: function($elem) {
          var docViewBottom, docViewTop, elemBottom, elemTop;
          docViewTop = main.m.settings.$window.scrollTop();
          docViewBottom = docViewTop + main.m.settings.$window.height();
          elemTop = $elem.offset().top;
          elemBottom = elemTop + $elem.height();
          return (elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop);
        },
        tryPosition: {
          left: function($this, type) {
            var norm;
            norm = main.o.getNormalize($this, type);
            if ($this.offset().left - norm.normW - main.m.settings.offset > main.m.settings.$window.scrollLeft()) {
              return 'left';
            } else {
              return 'best';
            }
          },
          right: function($this, type) {
            var norm;
            norm = main.o.getNormalize($this, type);
            if ($this.offset().left + $this.outerWidth() + main.m.settings.offset + norm.normW < main.m.settings.$window.scrollLeft() + main.m.settings.$window.outerWidth()) {
              return 'right';
            } else {
              return 'best';
            }
          },
          top: function($this, type) {
            var norm;
            norm = main.o.getNormalize($this, type);
            if ($this.offset().top - norm.normH - main.m.settings.offset - 4 > main.m.settings.$window.scrollTop()) {
              return 'top';
            } else {
              return 'best';
            }
          },
          bottom: function($this, type) {
            var norm;
            norm = main.o.getNormalize($this, type);
            if ($this.offset().top + $this.outerHeight() + norm.normH - 10 + main.m.settings.offset < main.m.settings.$window.scrollTop() + main.m.settings.$window.outerHeight()) {
              return 'bottom';
            } else {
              return 'best';
            }
          }
        }
      },
      e: {
        listen: function() {
          if ((main.m.settings.type === 'hover') || (main.m.settings.type === 'all')) {
            if (!(main.m.settings.$that.data().hover != null)) {
              main.m.settings.$that.data('hover', false);
            }
            if (!main.m.settings.$that.data().hover) {
              main.m.settings.$that.on('mouseenter', '*[title]', main.e.mouseEnterEvent);
              main.m.settings.$that.data('hover', true);
            }
          }
          if ((main.m.settings.type === 'focus') || (main.m.settings.type === 'all')) {
            if (!(main.m.settings.$that.data().focus != null)) {
              main.m.settings.$that.data('focus', false);
            }
            if (!main.m.settings.$that.data().focus) {
              main.m.settings.$that.on('focusin', '*[data-focus]', main.e.focusInEvent);
              return main.m.settings.$that.data('focus', true);
            }
          }
        },
        focusInEvent: function() {
          var $this, fixed,
            _this = this;
          console.time("focusInEvent takes");
          $this = $(this);
          main.m.state.tryPositionCount = 0;
          main.m.settings.$tipPop.stop().fadeOut(0, main.m.settings.hoverOnHide);
          $this.data({
            allowPopOnHover: false
          });
          main.o.focusSetEl($this);
          if ($this.attr('data-focus') != null) {
            main.m.state.focusText = $this.attr('data-focus');
            $this.$el.text(main.m.state.focusText);
            $parent = $this.parent();
            fixed = $this.css('position');
            if (fixed === 'static') fixed = 'absolute';
            $this.$el.css({
              'position': fixed
            });
            $this.attr('title', '');
            main.o.makePosition({
              $elem: $this,
              titlePosition: main.m.settings.focusPosition,
              type: 'focus',
              positionType: fixed,
              $parent: $parent
            });
            $this.on('focusout', function() {
              $this.attr('data-focus', main.m.state.focusText);
              $this.$el.stop().fadeOut(0, main.m.settings.focusOnHide);
              return $this.data({
                allowPopOnHover: true
              });
            });
          } else {
            $this.$el.stop().fadeOut(0, main.m.settings.focusOnHide);
          }
          return console.timeEnd("focusInEvent takes");
        },
        mouseLeaveEvent: function() {
          var $this;
          $this = $(this);
          $this.attr('title', $this.data().titleText);
          if ($this.data().allowPopOnHover) {
            return main.m.settings.$tipPop.stop().fadeOut(0, main.m.settings.hoverOnHide);
          }
        },
        mouseEnterEvent: function() {
          var $this, fixed, skip;
          console.time('mouseEnterEvent takes');
          $this = $(this);
          if (!($this.data().allowPopOnHover != null)) {
            $this.data({
              allowPopOnHover: 'true'
            });
          }
          skip = $this.attr('data-skip');
          if (!(skip != null)) skip = '';
          if ($this.data().allowPopOnHover && (skip.toLowerCase() !== 'true')) {
            main.m.state.tryPositionCount = 0;
            if ($this.attr('title') != null) {
              $this.data('titleText', $this.attr('title'));
              main.m.settings.$tipPop.text($this.data().titleText).css({
                'height': main.m.settings.$tipPop.height()
              });
              $parent = $this.parent();
              fixed = $this.css('position');
              if (fixed === 'static') fixed = 'absolute';
              main.m.settings.$tipPop.css({
                'position': fixed || 'absolute'
              });
              $this.attr('title', '');
              main.o.makePosition({
                $elem: $this,
                titlePosition: main.m.settings.titlePosition,
                type: 'hover',
                positionType: fixed,
                $parent: $parent
              });
              $this.on('mouseleave', main.e.mouseLeaveEvent);
            } else {
              main.m.settings.$tipPop.hide();
            }
          }
          return console.timeEnd('mouseEnterEvent takes');
        }
      }
    };
    switch (typeof options) {
      case 'string':
        return methods[options]();
      case 'object':
        return main.o.init(options);
    }
  };

}).call(this);
