
var PopupController = function() {
  this.enabled = true;
  this.siteList = [];
}

PopupController.prototype.start = function() {
  this.loadSites();
  this.registerEvents();
}

PopupController.prototype.registerEvents = function() {
  var that = this;
  document.querySelector(".enabled").addEventListener("change", function(event) {
    event.preventDefault();
    that.switchEnabled(this.checked);
  });

  document.querySelector(".btn.add").addEventListener("click", function(event) {
    event.preventDefault();
    that.addSite();
  });

  document.querySelector(".btn.save").addEventListener("click", function(event) {
    event.preventDefault();
    that.saveSites();
  });
}

PopupController.prototype.switchEnabled = function(isEnabled) {
  this.isEnabled = isEnabled;
  chrome.storage.local.set({ enabled: this.isEnabled }, function() {
    console.log("Saved enabled state");
  });
}

PopupController.prototype.loadSites = function() {
  var that = this;
  chrome.storage.local.get(["productionSites", "enabled"], function(obj) {
      this.enabled = obj.enabled;
      this.siteList = obj.productionSites || [];

      if (this.enabled === true) {
        document.querySelector(".enabled").setAttribute("checked", "checked");
      } else {
        document.querySelector(".enabled").removeAttribute("checked");
      }

      for (var i in this.siteList) {
        that.addSite(this.siteList[i]);
      }
  });
}

PopupController.prototype.saveSites = function() {
  var elements = document.getElementsByClassName("site");
  this.siteList = [];
  for (var i in elements) {
    if (typeof elements[i] == 'object' && elements[i].getAttribute) {
      this.siteList.push({ id: elements[i].getAttribute("data-id"), url: elements[i].value });
    }
  }

  chrome.storage.local.set({ productionSites: this.siteList, enabled: this.enabled }, function() {
    console.log("Saved production sites");
  });
}

PopupController.prototype.addSite = function(siteUrl) {
  document.querySelector(".site-list").appendChild(this.buildSiteRow(siteUrl));
}

PopupController.prototype.removeSite = function(event) {
  event.preventDefault();

  var elem = this.parentNode;
  elem = elem.parentNode.removeChild(elem);
}

PopupController.prototype.buildSiteRow = function(site) {
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("class", "site");
  if (site) {
    input.setAttribute("data-id", site.id);
    input.value = site.url;
  } else {
    input.setAttribute("data-id", this.siteList.length + 1);
    input.setAttribute("placeholder", "http://example.com");
  }

  var button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("class", "btn remove");
  button.innerHTML = "Remove";
  button.addEventListener('click', this.removeSite);

  var row = document.createElement("div");
  row.setAttribute("class", "entry");

  row.appendChild(input);
  row.appendChild(button);

  return row;
}

document.addEventListener('DOMContentLoaded', function(event) {
  var controller = new PopupController();
  controller.start();
});
