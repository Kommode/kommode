(function() {
  'use strict';

  function $(id) {
    return document.getElementById(id);
  }

  function getTemplate(id) {
    return Handlebars.compile($(id).innerHTML);
  }

  var tpl = getTemplate('team-tpl');
  $('team').innerHTML = tpl({members: Data.team});

  // console.log(JSON.stringify(Data.team));

}());
