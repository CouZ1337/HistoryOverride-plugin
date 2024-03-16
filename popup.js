function updateSites() {
  chrome.storage.sync.get('sites', function(data) {
    let sites = data.sites || [];
    let sitesList = document.getElementById('sites');
    sitesList.innerHTML = '';
    for (let site of sites) {
      let li = document.createElement('li');
      li.textContent = site;
      let removeButton = document.createElement('button');
      removeButton.textContent = '-';
      removeButton.className = 'remove-btn';
      removeButton.onclick = function() {
        removeSite(site);
      };
      li.appendChild(removeButton);
      sitesList.appendChild(li);
    }
  });
}

function removeSite(site) {
  chrome.storage.sync.get('sites', function(data) {
    let sites = data.sites || [];
    let index = sites.indexOf(site);
    if (index > -1) {
      sites.splice(index, 1);
    }
    chrome.storage.sync.set({sites: sites}, updateSites);
  });
}

document.getElementById('add').onclick = function() {
  let site = document.getElementById('site').value;
  chrome.storage.sync.get('sites', function(data) {
    let sites = data.sites || [];
    if (!sites.includes(site)) {
      sites.push(site);
      chrome.storage.sync.set({sites: sites}, updateSites);
    }
  });
  document.getElementById('site').value = "";
};

updateSites();