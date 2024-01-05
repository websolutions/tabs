/**
 * wsol.tabs.js 4.0.2
 * http://github.com/websolutions/tabs
 */

 ;(function(factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    factory(require('jquery'), window, document);
  } else {
    factory(jQuery, window, document);
  }
}(function ($, window, document, undefined) {
  if (!$.wsol) {
    $.wsol = {};
  }

  $.wsol.tabs = function(el, options) {
    var base = this;

    base.$el = $(el);
    base.el = el;

    base.$el.data("wsol.tabs", base);

    base.init = function() {
      base.options = $.extend({}, $.wsol.tabs.defaultOptions, options);
      base.options.firstRun = true;

      base.$navLinks = base.$el.find(base.options.navigationLinkSelector).filter('[href^="#"]');
      base.$navButtons = $();
      base.$containers = base.$el.find(base.options.containerSelector);

      base.$navLinks.first().closest('ul, div').attr('role', 'tablist');
      base.$navLinks.each(function() {
        var controls = $(this).attr('href').slice(1),
          newId = controls + "-button",
          $newButton = $('<button role="tab" aria-controls="'+controls+'" id="'+newId+'" ><span class="expandable-header-wrap">'+$(this).text()+'</span></button>')

        $(this).after($newButton);
        $(this).hide();
        base.$containers.filter('#'+controls).attr('aria-labelledby', newId);
        base.$navButtons = base.$navButtons.add($newButton);
      })
      base.$containers.attr('hidden', 'hidden').attr('tabindex', '0').attr('role', 'tabpanel');
      
      base.$navLinks = base.$navButtons;

      base.changeTab(0);

      // Handle events
      base.$navLinks.on(base.options.triggerEvent, base._tabHandler);
    };

    base.changeTab = function(tab) {
      base.$navLinks.attr('aria-selected', 'false').parent().removeClass(base.options.selectedClass);
      base.$containers.addClass(base.options.hiddenClass).attr('hidden', 'hidden');

      if (typeof tab === "number") {
        tab = "#" + base.$navLinks.eq(tab).attr("aria-controls");
      }

      base.$containers.filter(tab).removeClass(base.options.hiddenClass).toggleClass(base.options.accordionHiddenClass).removeAttr('hidden');
      base.$navLinks.filter('[aria-controls="' + tab.replace("#", "") + '"]').attr('aria-selected', 'true').parent().addClass(base.options.selectedClass).toggleClass(base.options.accordionHiddenClass);

      base.$containers.filter(function () {return $(this).attr('id') != tab.replace("#", "") }).addClass(base.options.accordionHiddenClass);
      base.$navLinks.filter(function () { return $(this).attr('aria-controls') != tab.replace("#", "") }).parent().addClass(base.options.accordionHiddenClass);

      if (base.options.autoScroll && !base.options.firstRun) {
        var $elm = base.$containers.filter(tab)
          , pageOffset = $(document).scrollTop()
          , viewportHeight = $(window).height()
          , elemOffset = $elm.offset().top
          ;

          if (elemOffset < pageOffset || elemOffset > (pageOffset + viewportHeight)) {
            $("html, body").animate({ scrollTop: elemOffset }, 500);
          }  
      }
      
      if (base.options.changeCallback != null) {
        base.options.changeCallback.call(base, tab);
      }
            
      $(window).trigger('resize');

      base.options.firstRun = false;
    };

    base._tabHandler = function(event) {
      var $target = $(this);
      event.preventDefault(); // if target is a link, prevent default action
      
      if (base.options.triggerCallback != null) {
        base.options.triggerCallback.call(base, $target);
      }

      base.changeTab("#" + $target.attr("aria-controls"));
    };

    base.destroy = function() {
      base.$navLinks.parent().removeClass(base.options.selectedClass).removeClass(base.options.accordionHiddenClass);
      base.$navLinks.first().closest('ul, div').removeAttr('role');
      base.$el.find(base.options.navigationLinkSelector).filter('[href^="#"]').show();
      base.$containers.removeClass(base.options.hiddenClass).removeClass(base.options.accordionHiddenClass).removeAttr('hidden').removeAttr('tabindex').removeAttr('role').removeAttr('aria-labelledby');

      // Remove event handlers
      base.$navLinks.off(".wsol.tabs");
      base.$navLinks.remove();
    };

    base.init();
  };

  $.wsol.tabs.defaultOptions = {
    navigationLinkSelector: "> .tab-navigation > li > a",
    containerSelector: "> .tab-container > div",
    selectedClass: "selected",
    hiddenClass: "hidden",
    accordionHiddenClass: "accordion-hidden",
    autoScroll: true,
    triggerEvent: "click.wsol.tabs"
  };

  $.fn.wsol_tabs = function(options) {
    return this.each(function() {
      new $.wsol.tabs(this, options);
    });
  };

}));
