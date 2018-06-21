# Tabs

Content tabs that toggle content when clicked.

## Installation

Install via [Bower](http://bower.io):
```
$ bower install websolutions/tabs --save
```

## Usage

The most basic example follows this DOM structure:
``` html
<div class="tabs">
  <ul class="tab-navigation">
    <li class="selected">
      <a href="#tab1">Tab Title 1</a>
    </li>
    <li>
      <a href="#tab2">Tab Title 2</a>
    </li>
  </ul>
  <div class="tab-container">
    <div id="tab1">
      <h3>Tab Title 1</h3>
      <p>Tab Content 1</p>
    </div>
    <div id="tab2" class="hidden">
      <h3>Tab Title 2</h3>
      <p>Tab Content 2</p>
    </div>
  </div>
</div>
```

And is initialized like so:
``` javascript
$(".tabs").wsol_tabs();
```

The plugin can also be removed afterwards:
``` javascript
$(".tabs").data("wsol.tabs").destroy();
```

Or manually changed to a specific tab (index or ID):
``` javascript
$(".tabs").data("wsol.tabs").changeTab(0);
```


### Configuring

The jQuery plugin supports a number of configuration options:

Option                      | Type     | Description                                                      | Default
----------------------------|----------|------------------------------------------------------------------|--------
`navigationLinkSelector`    | String   | Selector for tab navigation links                                | `> .tab-navigation > li > a`
`containerSelector`         | String   | Selector for tab containers                                      | `> .tab-container > div`
`selectedClass`             | String   | Class name to apply to the selected tab link                     | `selected`
`hiddenClass`               | String   | Class name to apply to non-selected tabs                         | `hidden`
`accordionHiddenClass`      | String   | Class name to apply to non-selected accordions                   | `accordion-hidden`
`autoScroll`                | Boolean  | Keep active tab/accordion in viewport on change                  | true

