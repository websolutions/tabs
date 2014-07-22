/**
 * wsol.tabs.js 2.0.0
 * http://github.com/websolutions/tabs
 */


(function ($) {
  $.fn.tabs = function (options) {

    var defaults = {
      SelectedClass: "selected",
      NavigationLinkSelector: "> .tab-navigation > li > a",
      ContainerSelector: "> .tab-container > div",
      HiddenClass: "hidden"
    };

    var settings = $.extend({}, defaults, options);

    $(this).each(function () {
      var $TabPanel = $(this);
      var $NavigationLinks = $(settings.NavigationLinkSelector, $TabPanel);
      var $Containers = $(settings.ContainerSelector, $TabPanel);

      $Containers.not(':eq(0)').addClass(settings.HiddenClass);
      $NavigationLinks.first().parent().addClass(settings.SelectedClass);

      $NavigationLinks.each(function (index, value) {
        $(this).bind("click", function (e) {
          e.preventDefault();

          var $this = $(this);

          $NavigationLinks.parent().removeClass(settings.SelectedClass);
          $Containers.addClass(settings.HiddenClass);
          $Containers.parent().find($this.attr("href")).removeClass(settings.HiddenClass);

          $this.parent().addClass(settings.SelectedClass);
        });
      });
    });
    return this;
  }
})(jQuery);