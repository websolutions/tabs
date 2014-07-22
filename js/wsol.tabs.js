/**
 * wsol.tabs.js 2.1.0
 * http://github.com/websolutions/tabs
 */


;(function ($, window, document, undefined) {

  var defaults = {
    navigationLinkSelector: "> .tab-navigation > li > a",
    containerSelector: "> .tab-container > div",
    selectedClass: "selected",
    hiddenClass: "hidden"
  };

  function Tabs(element, options) {
    this.$tabPanel = $(element);
    this.settings = $.extend({}, defaults, options);

    this.tabHandler = $.proxy(this.tabHandler, this);

    this.init();
  }

  Tabs.prototype.init = function() {
    this.$navigationLinks = this.$tabPanel.find(this.settings.navigationLinkSelector);
    this.$containers = this.$tabPanel.find(this.settings.containerSelector);

    this.changeTab(0);

    // Handle events
    this.$navigationLinks.on("click.tabs", this.tabHandler);
  };

  Tabs.prototype.changeTab = function(tab) {
    this.$navigationLinks.parent().removeClass(this.settings.selectedClass);
    this.$containers.addClass(this.settings.hiddenClass);

    if (typeof tab === "number") {
      tab = this.$navigationLinks.eq(tab).attr("href");
    }

    this.$containers.filter(tab).removeClass(this.settings.hiddenClass);
    this.$navigationLinks.filter('[href="' + tab + '"]').parent().addClass(this.settings.selectedClass);
  };

  Tabs.prototype.tabHandler = function(event) {
    var $target = $(event.target);
    $target.is("a") && event.preventDefault(); // if target is a link, prevent default action

    this.changeTab($target.attr("href"));
  };

  Tabs.prototype.destroy = function() {
    this.$navigationLinks.parent().removeClass(this.settings.selectedClass);
    this.$containers.removeClass(this.settings.hiddenClass);

    // Remove event handlers
    this.$navigationLinks.off(".tabs");
  };

  $.fn.tabs = function(options) {
    return this.each(function(index, element) {
      element.tabs = new Tabs(element, options);
    });
  };

  $.fn.tabsGoTo = function(tab) {
    return this.each(function(index, element) {
      if (element.tabs) {
        element.tabs.changeTab(tab);
      }
    });
  };

  $.fn.untabs = function() {
    return this.each(function(index, element) {
      if (element.tabs) {
        element.tabs.destroy();
      }
    });
  };

})(jQuery, window, document);