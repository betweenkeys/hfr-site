// Renders the shop grid from /data/products.json.
// Each product links to its page in the Square Online store, where the cart and checkout live.
(function () {
  var grid = document.getElementById('products');
  var chips = document.getElementById('chips');
  if (!grid) return;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function current() {
    var c = new URLSearchParams(location.search).get('c');
    return c || 'all';
  }

  fetch('/data/products.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      function render() {
        var c = current();
        chips.innerHTML = data.categories.map(function (cat) {
          return '<button class="chip" type="button" data-c="' + esc(cat.id) + '" aria-pressed="' + (cat.id === c) + '">' + esc(cat.label) + '</button>';
        }).join('');
        var list = data.products.filter(function (p) { return c === 'all' || p.category === c; });
        grid.innerHTML = list.map(function (p) {
          return '<a class="product" href="' + esc(p.url) + '">' +
            '<div class="ph"><img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy" width="600" height="600"></div>' +
            '<h3>' + esc(p.name) + '</h3><div class="price">' + esc(p.price) + '</div></a>';
        }).join('');
      }
      chips.addEventListener('click', function (e) {
        var b = e.target.closest('.chip');
        if (!b) return;
        var c = b.getAttribute('data-c');
        var url = c === 'all' ? location.pathname : location.pathname + '?c=' + encodeURIComponent(c);
        history.replaceState(null, '', url);
        render();
      });
      render();
    })
    .catch(function () {
      grid.innerHTML = '<p class="note">The shop could not load. <a href="https://houseoffluidreflections.square.site/s/shop">Visit the shop on Square</a>.</p>';
    });
})();
