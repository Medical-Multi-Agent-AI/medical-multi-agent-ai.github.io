(() => {
  'use strict';
  const dialog = document.getElementById('citation-dialog');
  const source = document.getElementById('citation-data');
  if (!dialog || !source || typeof dialog.showModal !== 'function') return;
  const citations = JSON.parse(source.textContent);
  const title = document.getElementById('citation-title');
  const text = document.getElementById('citation-text');
  const status = document.getElementById('citation-status');
  const copy = document.getElementById('copy-citation');
  let activeText = '';
  let opener;
  document.querySelectorAll('[data-citation]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const citation = citations[link.dataset.citation];
      if (!citation) return;
      event.preventDefault();
      opener = link;
      activeText = citation.text;
      title.textContent = citation.name + ' citation';
      text.textContent = activeText;
      status.textContent = '';
      copy.textContent = 'Copy citation';
      dialog.showModal();
    });
  });
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(activeText);
      status.textContent = 'Citation copied.';
      copy.textContent = 'Copied';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Citation selected. Use your copy shortcut.';
    }
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => { if (opener) opener.focus(); });
})();
