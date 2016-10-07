(function() {

  var Injector = function() {

  }

  Injector.prototype.showBanner = function() {
    if (!this.hasBanner()) {
        document.body.appendChild(this.buildBanner());
    }
  }

  Injector.prototype.hasBanner = function() {
    return null != document.querySelector(".production-safe-banner-wrapper");
  }

  Injector.prototype.buildBanner = function() {
    var wrapper = document.createElement("div");
    wrapper.setAttribute("class", "production-safe-banner-wrapper");
    wrapper.addEventListener('click', function(event) {
      wrapper.parentNode.removeChild(wrapper);
    });

    var border = document.createElement("div");
    border.setAttribute("class", "border-wrapper");
    border.innerHTML = "You are currently on a production site. Watch the fuck out!";
    wrapper.appendChild(border);

    return wrapper;
  }

  var inject = new Injector();
  inject.showBanner();

})();
