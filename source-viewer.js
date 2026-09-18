(() => {
  const dialog = document.getElementById('source-image-viewer');
  if (!dialog) return;

  const image = document.getElementById('viewer-image');
  const title = document.getElementById('viewer-title');
  const pageLink = document.getElementById('viewer-page-link');
  const closeButton = dialog.querySelector('.source-viewer-close');
  const triggers = [...document.querySelectorAll('.source-preview-button')];
  let lastTrigger = null;

  const closeViewer = () => {
    if (dialog.open) dialog.close();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const preview = trigger.querySelector('img');
      lastTrigger = trigger;
      image.src = trigger.dataset.full || preview?.src || '';
      image.alt = preview?.alt || trigger.dataset.title || 'Source image';
      title.textContent = trigger.dataset.title || preview?.alt || 'Source preview';
      pageLink.href = trigger.dataset.page || '#';
      pageLink.textContent = trigger.dataset.actionLabel || 'Open source page';
      document.body.classList.add('viewer-open');
      dialog.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener('click', closeViewer);

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeViewer();
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('viewer-open');
    image.removeAttribute('src');
    if (lastTrigger) lastTrigger.focus();
  });
})();
