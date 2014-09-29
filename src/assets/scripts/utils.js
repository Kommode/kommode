var Utils = Utils || (function() {
  'use strict';

  var Utils = {};

  Utils.getTemplate = function(id) {
    return Handlebars.compile(document.getElementById(id).innerHTML);
  };

  Utils.breakpoints = {
    huge: 1800,
    large: 1400,
    medium: 1024,
    small: 768
  };

  return Utils;

})();
