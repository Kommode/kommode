(function($, u) {
  'use strict';

  var $el = $('#people-slider');
  $el.html(u.getTemplate('person-tpl')({person: Data.people}));

}(jQuery, Utils));
