(function() {
  
/*! Copyright (C) 2012 Solomka Oleg, http://legomushroom.com/
/*  https://github.com/sol0mka/TipPop
*/
;
  $.prototype.tipPop = function(options) {
    var $parent, main, methods,
      _this = this;
    if (options == null) options = {};
    $parent = this;
    methods = {
      destroy: function() {
        this.destroyFocus();
        return this.destroyHover();
      },
      destroyHover: function() {
        $parent.off('mouseenter');
        $parent.off('mouseleave');
        $parent.data('hover', false);
        $parent.find('div#tippop').hide();
        return main.m.settings.type = 'focus';
      },
      destroyFocus: function() {
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
          defaults = {
            hoverPosition: 'best',
            focusPosition: 'best',
            type: 'all',
            delay: 2000,
            offset: 15,
            hoverPriority: ['top', 'bottom', 'left', 'right', 'top_left', 'top_right', 'bottom_left', 'bottom_right'],
            focusPriority: ['left', 'right', 'bottom', 'top', 'top_left', 'top_right', 'bottom_left', 'bottom_right']
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
        getGSidesX: function($el) {
          var g_left, g_right;
          g_right = main.m.settings.$tipPop.outerWidth() > $el.outerWidth() ? $el.offset().left + $el.outerWidth() + (Math.abs($el.outerWidth() - main.m.settings.$tipPop.outerWidth()) / 2) : $el.offset().left + $el.outerWidth();
          g_left = main.m.settings.$tipPop.outerWidth() > $el.outerWidth() ? $el.offset().left - (Math.abs($el.outerWidth() - main.m.settings.$tipPop.outerWidth()) / 2) : $el.offset().left;
          return {
            g_right: g_right,
            g_left: g_left
          };
        },
        getGSidesY: function($el) {
          var g_bottom, g_top;
          g_top = ($el.offset().top + $el.outerHeight() / 2) - (main.m.settings.$tipPop.outerHeight() / 2);
          g_bottom = ($el.offset().top + $el.outerHeight() / 2) + (main.m.settings.$tipPop.outerHeight() / 2);
          return {
            g_top: g_top,
            g_bottom: g_bottom
          };
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
            normalizeW = $this.$el.outerWidth() - (($this.$el.outerWidth() - $this.$el.width()) / 4);
            normalizeH = $this.$el.outerHeight() - (($this.$el.outerHeight() - $this.$el.height()) / 4);
          } else {
            normalizeTipPop = main.m.settings.$tipPop.attr('class', '');
            normalizeW = main.m.settings.$tipPop.outerWidth() - ((main.m.settings.$tipPop.outerWidth() - main.m.settings.$tipPop.width()) / 4);
            normalizeH = main.m.settings.$tipPop.outerHeight() - ((main.m.settings.$tipPop.outerHeight() - main.m.settings.$tipPop.height()) / 4);
          }
          return {
            normH: normalizeH,
            normW: normalizeW,
            normTipPop: normalizeTipPop
          };
        },
        makePosition: function(opt) {
          var callback, fixedNormalize, fixedNormalizeY, i, norm, tip;
          if (opt.type === 'hover') {
            callback = main.m.settings.hoverOnShow;
            tip = main.m.settings.$tipPop;
          } else {
            callback = main.m.settings.focusOnShow;
            tip = opt.$elem.data().$el;
          }
          fixedNormalize = 0;
          if (opt.positionType === 'fixed') {
            fixedNormalizeY = opt.$elem.offset().top - main.m.settings.$window.scrollTop();
          } else {
            fixedNormalizeY = opt.$elem.offset().top;
          }
          switch (opt.titlePosition) {
            case 'left':
              console.log('---> left');
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.addClass(opt.titlePosition).css({
                top: fixedNormalizeY + (opt.$elem.outerHeight() / 2) - (norm.normH / 2) - 5,
                left: opt.$elem.offset().left - main.m.settings.offset - norm.normW
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'right':
              console.log('---> right');
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.addClass(opt.titlePosition).css({
                top: fixedNormalizeY + (opt.$elem.outerHeight() / 2) - (norm.normH / 2) - 5,
                left: opt.$elem.offset().left + opt.$elem.outerWidth() + main.m.settings.offset
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'top':
              console.log('---> top');
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.addClass(opt.titlePosition).css({
                top: fixedNormalizeY - norm.normH - main.m.settings.offset - 4,
                left: opt.$elem.offset().left + (opt.$elem.outerWidth() / 2) - (norm.normW / 2) - 5
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'top_left':
              console.log('---> top_left');
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.addClass(opt.titlePosition).css({
                top: fixedNormalizeY - norm.normH - 7,
                left: opt.$elem.offset().left - tip.outerWidth()
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'top_right':
              console.log('---> top_right');
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.addClass(opt.titlePosition).css({
                top: fixedNormalizeY - norm.normH - 7,
                left: opt.$elem.offset().left + opt.$elem.outerWidth()
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'bottom':
              console.log('---> bottom');
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.addClass(opt.titlePosition).css({
                top: fixedNormalizeY + opt.$elem.outerHeight() + main.m.settings.offset,
                left: opt.$elem.offset().left + (opt.$elem.outerWidth() / 2) - (norm.normW / 2) - 5
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'bottom_left':
              console.log('---> bottom_left');
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.addClass(opt.titlePosition).css({
                top: fixedNormalizeY + opt.$elem.outerHeight(),
                left: opt.$elem.offset().left - tip.outerWidth()
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'bottom_right':
              console.log('---> bottom_right');
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.addClass(opt.titlePosition).css({
                top: fixedNormalizeY + opt.$elem.outerHeight(),
                left: opt.$elem.offset().left + opt.$elem.outerWidth()
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
          left: function($el, type) {
            var g, norm;
            console.log('try left');
            norm = main.o.getNormalize($el, type);
            g = main.o.getGSidesY($el);
            if (($el.offset().left - norm.normW - main.m.settings.offset > main.m.settings.$window.scrollLeft()) && (g.g_top > main.m.settings.$window.scrollTop()) && (g.g_bottom < main.m.settings.$window.scrollTop() + main.m.settings.$window.outerHeight())) {
              return 'left';
            } else {
              return 'best';
            }
          },
          right: function($el, type) {
            var g, norm;
            console.log('try right');
            norm = main.o.getNormalize($el, type);
            g = main.o.getGSidesY($el);
            if (($el.offset().left + $el.outerWidth() + main.m.settings.offset + norm.normW < main.m.settings.$window.scrollLeft() + main.m.settings.$window.outerWidth()) && (g.g_top > main.m.settings.$window.scrollTop()) && (g.g_bottom < main.m.settings.$window.scrollTop() + main.m.settings.$window.outerHeight())) {
              return 'right';
            } else {
              return 'best';
            }
          },
          top: function($this, type) {
            var g, norm;
            console.log('try top');
            norm = main.o.getNormalize($this, type);
            g = main.o.getGSidesX($this);
            if (($this.offset().top - norm.normH - main.m.settings.offset - 4 > main.m.settings.$window.scrollTop()) && (g.g_left > main.m.settings.$window.scrollLeft()) && (g.g_right < main.m.settings.$window.scrollLeft() + main.m.settings.$window.outerWidth())) {
              return 'top';
            } else {
              return 'best';
            }
          },
          top_left: function($el, type) {
            var g, norm;
            console.log('try top left');
            norm = main.o.getNormalize($el, type);
            g = main.o.getGSidesX($el);
            if (($el.offset().top - norm.normH - main.m.settings.offset - 4 > main.m.settings.$window.scrollTop()) && ($el.offset().left - main.m.settings.$tipPop.outerWidth() > main.m.settings.$window.scrollLeft())) {
              return 'top_left';
            } else {
              return 'best';
            }
          },
          top_right: function($el, type) {
            var g, norm;
            console.log('try top right');
            norm = main.o.getNormalize($el, type);
            g = main.o.getGSidesX($el);
            if (($el.offset().top - norm.normH - main.m.settings.offset - 4 > main.m.settings.$window.scrollTop()) && ($el.offset().left + $el.outerWidth() + main.m.settings.$tipPop.outerWidth() > main.m.settings.$window.scrollLeft())) {
              return 'top_right';
            } else {
              return 'best';
            }
          },
          bottom: function($this, type) {
            var g, norm;
            console.log('try bottom');
            norm = main.o.getNormalize($this, type);
            g = main.o.getGSidesX($this);
            if ($this.offset().top + $this.outerHeight() + norm.normH - 10 + main.m.settings.offset < main.m.settings.$window.scrollTop() + main.m.settings.$window.outerHeight() && (g.g_left > main.m.settings.$window.scrollLeft()) && (g.g_right < main.m.settings.$window.scrollLeft() + main.m.settings.$window.outerWidth())) {
              return 'bottom';
            } else {
              return 'best';
            }
          },
          bottom_left: function($el, type) {
            console.log('try bottom_left');
            if (($el.offset().top + $el.outerHeight() + main.m.settings.offset + main.m.settings.$tipPop.outerHeight()) < (main.m.settings.$window.scrollTop() + main.m.settings.$window.outerHeight()) && ($el.offset().left - main.m.settings.$tipPop.outerWidth() > main.m.settings.$window.scrollLeft())) {
              return 'bottom_left';
            } else {
              return 'best';
            }
          },
          bottom_right: function($el, type) {
            console.log('try bottom_right');
            if (($el.offset().top + $el.outerHeight() + main.m.settings.offset + main.m.settings.$tipPop.outerHeight()) < (main.m.settings.$window.scrollTop() + main.m.settings.$window.outerHeight()) && ($el.offset().left + $el.offset().left < main.m.settings.$window.scrollLeft() + main.m.settings.$window.outerWidth())) {
              return 'bottom_right';
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
            return $this.on('focusout', function() {
              $this.attr('data-focus', main.m.state.focusText);
              $this.$el.stop().fadeOut(0, main.m.settings.focusOnHide);
              return $this.data({
                allowPopOnHover: true
              });
            });
          } else {
            return $this.$el.stop().fadeOut(0, main.m.settings.focusOnHide);
          }
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
              main.m.settings.$tipPop.text($this.data().titleText);
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
              return $this.on('mouseleave', main.e.mouseLeaveEvent);
            } else {
              return main.m.settings.$tipPop.hide();
            }
          }
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
