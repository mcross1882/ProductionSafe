

function getTabUrl(tabId, sites) {
  chrome.tabs.get(tabId, function(tab) {
    var urlToSearch = tab.url;
    for (var i in sites) {
      if (urlToSearch.indexOf(sites[i].url) > -1) {
        chrome.tabs.insertCSS(tabId, {file: "css/ps-inject-banner.css"});
        chrome.tabs.executeScript(tabId, {file: "js/ps-inject-banner.js"});
        break;
      }
    }
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.storage.local.get(["productionSites", "enabled"], function(obj) {
    if (!obj.enabled) {
      return;
    }
    getTabUrl(tabId, obj.productionSites);
  });
});
