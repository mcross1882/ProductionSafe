
(function($) {

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
    $(".enabled").on("change", function(event) {
      that.switchEnabled(this.checked);
    });

    $(".action.add").click(function(event) {
      event.preventDefault();
      that.addSite();
    });

    $(".action.dismiss").click(function(event) {
      event.preventDefault();
      window.close();
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
          $(".enabled").attr("checked", "checked");
        } else {
          $(".enabled").removeAttr("checked");
        }

        for (var i in this.siteList) {
          that.addSite(this.siteList[i]);
        }
    });
  }

  PopupController.prototype.saveSites = function() {
    var urlId = false;
    var that = this;
    this.siteList = [];
    
    $(".site-url").each(function() {
      urlId = Number($(this).data("id"));
      if (!isNaN(urlId)) {
        that.siteList.push({ id: urlId, url: $(this).val() });
      }
    });
    
    chrome.storage.local.set({ productionSites: this.siteList, enabled: this.enabled }, function() {
      console.log("Saved production sites");
    });
  }

  PopupController.prototype.addSite = function(siteUrl) {
    $(".site-list").append(this.buildSiteRow(siteUrl));
  }

  PopupController.prototype.removeSite = function(event) {
    event.preventDefault();
    var elem = this.parentNode.parentNode.parentNode;
    elem = elem.parentNode.removeChild(elem);
  }

  PopupController.prototype.buildSiteRow = function(site) {
    var row = $("<li>");
    row.addClass("list-group-item site");
    row.append(this.buildInputGroup(site));

    return row;
  }

  PopupController.prototype.buildInputGroup = function(site) {
    var input = $("<input>");
    input.attr("type", "text");
    input.attr("class", "form-control site-url");
    if (site) {
      input.attr("data-id", site.id);
      input.val(site.url);
    } else {
      input.attr("data-id", this.siteList.length + 1);
      input.attr("placeholder", "http://example.com");
    }
    input.focusout($.proxy(this.saveSites, this));
    
    var glyphicon = $("<i>");
    glyphicon.addClass("glyphicon glyphicon-remove");
    
    var button = $("<a>");
    button.attr("class", "input-group-addon action remove");
    button.append(glyphicon);
    button.click(this.removeSite);
    
    var buttonGroup = $("<div>");
    buttonGroup.addClass("input-group-btn");
    buttonGroup.append(button);
    
    var group = $("<div>");
    group.addClass("input-group");
    group.append(input);
    group.append(button);
    
    return group;
  }

  document.addEventListener('DOMContentLoaded', function(event) {
    var controller = new PopupController();
    controller.start();
  });

})(window.jQuery);