browser.history.onVisited.addListener(async (historyItem) => {
  let data = await browser.storage.sync.get('sites');
  let sites = data.sites || [];
  for (let site of sites) {
    if (site && historyItem.url.includes(site)) {
      await browser.history.deleteUrl({ url: historyItem.url });
      console.log(`Сайт ${site} убран из истории.`);
    }
  }
});

browser.webNavigation.onCommitted.addListener(async (details) => {
  let data = await browser.storage.sync.get('sites');
  let sites = data.sites || [];
  for (let site of sites) {
    if (site && details.url.includes(site)) {
      await browser.history.deleteUrl({ url: details.url });
      console.log(`Сайт ${site} убран из истории.`);
    }
  }
});
