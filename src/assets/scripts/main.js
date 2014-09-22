(function() {
  'use strict';

  function getTemplate(id) {
    return Handlebars.compile($('#' + id).html());
  }

  var tpl = getTemplate('team-tpl');
  $('#team').html(tpl({members: Data.team}));

}());
