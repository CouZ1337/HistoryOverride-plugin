async function updateSites() {
  let data = await browser.storage.sync.get('sites');
  let sites = data.sites || [];
  let sitesList = document.getElementById('sites');
  sitesList.innerHTML = '';
  for (let site of sites) {
    if (!site.trim()) continue;
    let li = document.createElement('li');
    li.textContent = site;
    let removeBtn = document.createElement('button');
    removeBtn.textContent = '-';
    removeBtn.className = 'remove-btn';
    removeBtn.onclick = () => removeSite(site);
    li.appendChild(removeBtn);
    sitesList.appendChild(li);
  }
}

async function removeSite(site) {
  let data = await browser.storage.sync.get('sites');
  let sites = data.sites || [];
  let index = sites.indexOf(site);
  if (index > -1) {
    sites.splice(index, 1);
    await browser.storage.sync.set({ sites });
    updateSites();
  }
}

document.getElementById('add').onclick = async function() {
  let btn = this;
  btn.classList.add('clicked');
  setTimeout(() => btn.classList.remove('clicked'), 250);

  let siteInput = document.getElementById('site');
  let site = siteInput.value.trim();
  if (!site) return;
  let data = await browser.storage.sync.get('sites');
  let sites = data.sites || [];
  if (!sites.includes(site)) {
    sites.push(site);
    await browser.storage.sync.set({ sites });
    updateSites();
  }
  siteInput.value = '';
};

updateSites();