# Tabs

Content tabs that toggle content when clicked.

## Usage

Example DOM structure:
```html
<div class="tabs clearfix">
  <ul class="tab-navigation clearfix wide">
    <li class="selected">
      <a href="#tab1">Tab Title 1</a>
    </li>
    <li>
      <a href="#tab2">Tab Title 2</a>
    </li>
  </ul>
  <div class="tab-container">
    <div id="tab1" class="clear">
      <h3 class="narrow">Tab Title 1</h3>
      <p>Tab Content 1</p>
    </div>
    <div id="tab2" class="clear narrow">
      <h3 class="narrow">Tab Title 2</h3>
      <p>Tab Content 2</p>
    </div>
  </div>
</div>
```

Initialize with jQuery:
```javascript
$(".tabs").tabs()
```