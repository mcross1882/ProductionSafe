(function() {

  var Injector = function() {
    this.MAX_TIMEOUT = 1000 * 60 * 5; // 5 minutes
  }

  Injector.prototype.showBanner = function() {
    if (!this.hasBanner() && !this.isBannerDisabled()) {
      document.body.appendChild(this.buildBanner());
    }
  }

  Injector.prototype.hasBanner = function() {
    return null != document.querySelector(".production-safe-banner-wrapper");
  }

  Injector.prototype.isBannerDisabled = function() {
    var rawTime = localStorage.getItem('ps-inject-banner-timeout');
    if (!rawTime) {
      return false;
    }

    var startTime = new Date(rawTime);
    var endTime = new Date();
    var ellapsedTime = endTime - startTime;

    return ellapsedTime < this.MAX_TIMEOUT;
  }

  Injector.prototype.buildBanner = function() {
    var wrapper = document.createElement("div");
    wrapper.setAttribute("class", "production-safe-banner-wrapper");
    wrapper.addEventListener('click', function(event) {
      wrapper.parentNode.removeChild(wrapper);
    });

    var disableButton = this.createButton('Disable for 5 minutes');
    disableButton.setAttribute("class", "btn-timeout");
    disableButton.onclick = function() {
      localStorage.setItem('ps-inject-banner-timeout', (new Date()).toISOString());
    };

    var border = document.createElement("div");
    border.setAttribute("class", "border-wrapper");
    border.innerHTML = "<p>You are currently on a production site. Watch the fuck out!</p>";
    border.appendChild(disableButton);
    wrapper.appendChild(border);

    return wrapper;
  }

  Injector.prototype.createButton = function(title) {
    var button = document.createElement("button");
    button.setAttribute("type", "button");
    button.textContent = title;
    return button;
  }

  var inject = new Injector();
  inject.showBanner();

})();
