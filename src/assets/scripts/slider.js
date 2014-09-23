(function() {
  'use strict';

  function getTemplate(id) {return Handlebars.compile(document.getElementById(id).innerHTML);}

  var peopleSlider = document.getElementById('people-slider');
  peopleSlider.innerHTML = getTemplate('person-tpl')({person: Data.people});

  // var $elements = $('ul.team').children();

  // var interval = setInterval(function() {
  //   $('#team-slider ul').animate({marginLeft:-480}, 1000, function() {
  //     $(this).find('li:last').after($(this).find('li:first'));
  //     $(this).css({marginLeft:0});
  //   });
  // }, 3000);
}());
