# Tabs

Content tabs that toggle content when clicked.

## Usage

Example DOM structure:
```html
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

Initialize with jQuery:
```javascript
$(".tabs").tabs()
```