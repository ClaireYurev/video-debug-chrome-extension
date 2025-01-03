function addDebugButtons() {
  requestAnimationFrame(() => {
    const iframes = Array.from(document.querySelectorAll('iframe[src*="player.vimeo.com"]:not(.debug-processed)'));
    
    iframes.forEach(iframe => {
      if (iframe.closest('.debug-processed-container')) return;
      
      const container = document.createElement('div');
      container.className = 'debug-processed-container';
      
      const button = document.createElement('button');
      button.textContent = 'Offline use';
      button.className = 'debug-button';
      
      iframe.classList.add('debug-processed');
      iframe.parentNode.insertBefore(container, iframe.nextSibling);
      container.appendChild(button);
      
      button.addEventListener('click', () => {
        const videoId = iframe.src.match(/video\/(\d+)/)?.[1];
        if (videoId) {
          chrome.runtime.sendMessage({
            action: 'downloadVideo',
            videoId: videoId
          });
        }
      });
    });
  });
}

const observer = new MutationObserver(() => {
  addDebugButtons();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

document.addEventListener('DOMContentLoaded', addDebugButtons);
window.addEventListener('load', addDebugButtons);
setTimeout(addDebugButtons, 1000);
