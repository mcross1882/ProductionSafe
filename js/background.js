
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (!changeInfo.url) {
    return;
  }

  chrome.storage.local.get(["productionSites", "enabled"], function(obj) {
    if (!obj.enabled) {
      return;
    }

    var sites = obj.productionSites;
    for (var i in sites) {
      if (changeInfo.url.indexOf(sites[i].url) > -1) {
        chrome.tabs.insertCSS(tabId, {file: "css/ps-inject-banner.css"});
        chrome.tabs.executeScript(tabId, {file: "js/ps-inject-banner.js"});
        break;
      }
    }
  });
});
