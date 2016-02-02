/**
 * wsol.tabs.js 3.0.2
 * http://github.com/websolutions/tabs
 */

;(function ($, window, document, undefined) {
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

      base.$navLinks = base.$el.find(base.options.navigationLinkSelector).filter('[href^="#"]');
      base.$containers = base.$el.find(base.options.containerSelector);

      base.changeTab(0);

      // Handle events
      base.$navLinks.on("click.wsol.tabs", base._tabHandler);
    };

    base.changeTab = function(tab) {
      base.$navLinks.parent().removeClass(base.options.selectedClass);
      base.$containers.addClass(base.options.hiddenClass);

      if (typeof tab === "number") {
        tab = base.$navLinks.eq(tab).attr("href");
      }

      base.$containers.filter(tab).removeClass(base.options.hiddenClass);
      base.$navLinks.filter('[href="' + tab + '"]').parent().addClass(base.options.selectedClass);
      $(window).trigger('resize');
    };

    base._tabHandler = function(event) {
      var $target = $(this);
      $target.is("a") && event.preventDefault(); // if target is a link, prevent default action

      base.changeTab($target.attr("href"));
    };

    base.destroy = function() {
      base.$navLinks.parent().removeClass(base.options.selectedClass);
      base.$containers.removeClass(base.options.hiddenClass);

      // Remove event handlers
      base.$navLinks.off(".wsol.tabs");
    };

    base.init();
  };

  $.wsol.tabs.defaultOptions = {
    navigationLinkSelector: "> .tab-navigation > li > a",
    containerSelector: "> .tab-container > div",
    selectedClass: "selected",
    hiddenClass: "hidden"
  };

  $.fn.wsol_tabs = function(options) {
    return this.each(function() {
      new $.wsol.tabs(this, options);
    });
  };

})(jQuery, window, document);
