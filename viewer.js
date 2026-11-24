// Click a project image to view it full size in the page.
// Close with Escape, the close button, or a click outside the image.
(function () {
  var links = document.querySelectorAll('a.zoom');
  if (!links.length || typeof HTMLDialogElement !== 'function') return; // old browsers keep the plain link

  var dialog = document.createElement('dialog');
  dialog.className = 'viewer';
  dialog.setAttribute('aria-label', 'Image viewer');
  dialog.innerHTML =
    '<button type="button" class="viewer-close" aria-label="Close image">&times;</button>' +
    '<img alt="">' +
    '<p class="viewer-caption"></p>';
  document.body.appendChild(dialog);

  var img = dialog.querySelector('img');
  var caption = dialog.querySelector('.viewer-caption');
  var opener = null;

  function close() { if (dialog.open) dialog.close(); }

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let new-tab clicks work
      e.preventDefault();
      var thumb = link.querySelector('img');
      var fig = link.closest('figure');
      var cap = fig && fig.querySelector('figcaption');
      img.src = link.getAttribute('href');
      img.alt = thumb ? thumb.alt : '';
      caption.textContent = cap ? cap.textContent.trim() : '';
      caption.hidden = !caption.textContent;
      opener = link;
      dialog.showModal();
      document.documentElement.classList.add('viewer-open');
    });
  });

  dialog.querySelector('.viewer-close').addEventListener('click', close);
  // A click on the dark backdrop (anything that isn't the image or caption) closes it.
  dialog.addEventListener('click', function (e) {
    if (e.target !== img && e.target !== caption) close();
  });
  dialog.addEventListener('close', function () {
    document.documentElement.classList.remove('viewer-open');
    img.removeAttribute('src');
    if (opener) opener.focus({ preventScroll: true });
  });
})();
