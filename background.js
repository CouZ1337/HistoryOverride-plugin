chrome.storage.sync.get('sites', function(data) {
 let sites = data.sites || [];
 chrome.history.onVisited.addListener(function(historyItem) {
   sites.forEach(site => {
     if (historyItem.url.includes(site)) {
       chrome.history.deleteUrl({url: historyItem.url});
       console.log('The visit to the ' + site + ' has been hidden.')
     }
   });
 });
});

chrome.webNavigation.onCommitted.addListener(function(details) {
  chrome.storage.sync.get('sites', function(data) {
    let sites = data.sites || [];
    sites.forEach(site => {
      if (details.url.includes(site)) {
        chrome.history.deleteUrl({url: details.url});
        console.log('The visit to the ' + site + ' has been hidden.')
      }
    });
  });
});
