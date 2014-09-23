(function() {
  'use strict';

  function getTemplate(id) {
    return Handlebars.compile($('#' + id).html());
  }

  var tpl = getTemplate('people-tpl');
  $('.people-slider').html(tpl({person: Data.team}));

  // var $elements = $('ul.team').children();

  // var interval = setInterval(function() {
  //   $('#team-slider ul').animate({marginLeft:-480}, 1000, function() {
  //     $(this).find('li:last').after($(this).find('li:first'));
  //     $(this).css({marginLeft:0});
  //   });
  // }, 3000);
}());
