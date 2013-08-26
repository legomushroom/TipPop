// Generated by CoffeeScript 1.6.2
(function() {
  
/*! Copyright (C) 2012 Solomka Oleg, http://legomushroom.com/
/*  https://github.com/sol0mka/TipPop
*/
;  $.prototype.tipPop = function(options) {
    var $parent, main, methods,
      _this = this;

    if (options == null) {
      options = {};
    }
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
        $parent.find('div#popup').hide();
        return main.m.settings.type = 'focus';
      }
    };
    main = {
      m: {
        state: {
          tryPositionCount: 0
        },
        settings: {
          $tipPop: '',
          offset: 0,
          $body: $(document.body),
          $window: $(window),
          positionPriority: {
            hover: []
          }
        }
      },
      o: {
        init: function(options) {
          var defaults;

          if (options == null) {
            options = {};
          }
          defaults = {
            hoverPosition: 'best',
            delay: 2000,
            offset: 15,
            hoverPriority: ['top', 'bottom', 'left', 'right', 'top_left', 'top_right', 'bottom_left', 'bottom_right']
          };
          options = $.extend({}, defaults, options || {});
          main.m.settings.$tipPop = main.o.getTipPop();
          main.m.settings.$that = _this;
          main.m.settings.offset = parseInt(options.offset, 10);
          main.m.settings.hoverOnShow = options.hoverOnShow;
          main.m.settings.hoverOnHide = options.hoverOnHide;
          main.m.settings.titlePosition = options.hoverPosition;
          main.m.settings.positionPriority.hover = options.hoverPriority;
          main.e.listen(main.m.settings.$body);
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

          $tipPop = $('body').find('div#popup.widget');
          if ($tipPop.length === 0) {
            $('body').append('<div id="popup" class="widget"><div id="popup-content"></div><div id="arrow-holder"><div id="arrow"></div></div></div>');
            $tipPop = $('div#popup');
          }
          return $tipPop;
        },
        getNormalize: function($this, type) {
          var normalizeH, normalizeTipPop, normalizeW;

          normalizeW = 0;
          normalizeH = 0;
          normalizeTipPop = '';
          normalizeTipPop = main.m.settings.$tipPop.attr('class', '');
          normalizeW = main.m.settings.$tipPop.outerWidth() - ((main.m.settings.$tipPop.outerWidth() - main.m.settings.$tipPop.width()) / 4);
          normalizeH = main.m.settings.$tipPop.outerHeight() - ((main.m.settings.$tipPop.outerHeight() - main.m.settings.$tipPop.height()) / 4);
          return {
            normH: normalizeH,
            normW: normalizeW,
            normTipPop: normalizeTipPop
          };
        },
        makePosition: function(opt) {
          var callback, fixedNormalize, fixedNormalizeY, i, norm, tip;

          callback = main.m.settings.hoverOnShow;
          tip = main.m.settings.$tipPop;
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
              norm.normTipPop.addClass('middle right').css({
                top: fixedNormalizeY + (opt.$elem.outerHeight() / 2) - (norm.normH / 2) - 5,
                left: opt.$elem.offset().left - main.m.settings.offset - norm.normW
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'right':
              console.log('---> right');
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.addClass('middle left').css({
                top: fixedNormalizeY + (opt.$elem.outerHeight() / 2) - (norm.normH / 2) - 5,
                left: opt.$elem.offset().left + opt.$elem.outerWidth() + main.m.settings.offset
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'top':
              console.log('---> top');
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.css({
                top: fixedNormalizeY - norm.normH - main.m.settings.offset - 4,
                left: opt.$elem.offset().left + (opt.$elem.outerWidth() / 2) - (norm.normW / 2) - 5
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'top_left':
              console.log('---> top_left');
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.addClass('right').css({
                top: fixedNormalizeY - norm.normH - 12,
                left: opt.$elem.offset().left - tip.outerWidth() + 32
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'top_right':
              console.log('---> top_right');
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.addClass('left').css({
                top: fixedNormalizeY - norm.normH - 12,
                left: opt.$elem.offset().left + opt.$elem.outerWidth() - 32
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'bottom':
              console.log('---> bottom');
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.addClass('top').css({
                top: fixedNormalizeY + opt.$elem.outerHeight() + main.m.settings.offset,
                left: opt.$elem.offset().left + (opt.$elem.outerWidth() / 2) - (norm.normW / 2) - 5
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'bottom_left':
              console.log('---> bottom_left');
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.addClass('top right').css({
                top: fixedNormalizeY + opt.$elem.outerHeight() + 12,
                left: opt.$elem.offset().left - tip.outerWidth() + 32
              }).stop(true, false).fadeIn(500, callback);
              break;
            case 'bottom_right':
              console.log('---> bottom_right');
              norm = main.o.getNormalize(opt.$elem, opt.type);
              norm.normTipPop.addClass('top left').css({
                top: fixedNormalizeY + opt.$elem.outerHeight() + 12,
                left: opt.$elem.offset().left + opt.$elem.outerWidth() - 32
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
          if (main.m.settings.$that.data().hover == null) {
            main.m.settings.$that.data('hover', false);
          }
          if (!main.m.settings.$that.data().hover) {
            main.m.settings.$that.on('mouseenter', '.likes-popup', main.e.mouseEnterEvent);
            return main.m.settings.$that.data('hover', true);
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
          if ($this.data().allowPopOnHover == null) {
            $this.data({
              allowPopOnHover: 'true'
            });
          }
          skip = $this.attr('data-skip');
          if (skip == null) {
            skip = '';
          }
          if ($this.data().allowPopOnHover && (skip.toLowerCase() !== 'true')) {
            main.m.state.tryPositionCount = 0;
            if ($this.attr('title') != null) {
              $this.data('titleText', $this.attr('title'));
              main.m.settings.$tipPop.find('#popup-content').text($this.data().titleText);
              $parent = $this.parent();
              fixed = $this.css('position');
              if (fixed === 'static') {
                fixed = 'absolute';
              }
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
