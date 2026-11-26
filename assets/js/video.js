// Shows a cover image with a play button; loads the YouTube player only when clicked.
document.querySelectorAll('.video-cover').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var id = btn.getAttribute('data-video');
    var wrap = document.createElement('div');
    wrap.className = 'video';
    wrap.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' +
      btn.getAttribute('aria-label').replace(/^Play /, '') + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    btn.replaceWith(wrap);
  });
});
