chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'downloadVideo') {
      fetch(`https://player.vimeo.com/video/${request.videoId}/config`)
        .then(response => response.json())
        .then(data => {
          const videoUrl = data.request.files.progressive[0].url;
          chrome.downloads.download({
            url: videoUrl,
            filename: `vimeo-${request.videoId}.mp4`
          });
        })
        .catch(error => console.error('Download failed:', error));
    }
  });
