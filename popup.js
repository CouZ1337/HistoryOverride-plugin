function updateSites() {
  chrome.storage.sync.get('sites', function(data) {
    let sites = data.sites || [];
    let sitesList = document.getElementById('sites');
    sitesList.innerHTML = '';

    for (let site of sites) {
      if (!site || !site.trim()) continue;

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

    chrome.storage.sync.set({ sites: sites }, updateSites);
  });
}

document.getElementById('add').onclick = function() {
  let btn = this;

  btn.classList.add('clicked');
  setTimeout(() => btn.classList.remove('clicked'), 250);

  let siteInput = document.getElementById('site');
  let site = siteInput.value.trim();

  if (!site) {
    siteInput.value = "";
    return;
  }

  chrome.storage.sync.get('sites', function(data) {
    let sites = data.sites || [];

    if (!sites.includes(site)) {
      sites.push(site);
      chrome.storage.sync.set({ sites: sites }, updateSites);
    }
  });

  siteInput.value = "";
};

updateSites();