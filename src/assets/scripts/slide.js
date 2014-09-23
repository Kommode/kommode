var height = $(window).height();
var width = $(window).width();
var $header = $('.header');

(function() {
  $(window).resize(function() {
    $header.height(height);
    $header.width(width);
    height = $(window).height();
    width = $(window).width();
  });

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  }
  function wheel(e) {
    preventDefault(e);
  }

  function disableScroll() {
    if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
  }

  function enableScroll() {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = null;
  }

  $(window).scroll(function() {
    //console.log($(window).scrollTop());
    $header.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
      enableScroll();
    });
    if ($(window).scrollTop() >= 5 && $header.hasClass('visible')) {
      $header.addClass('active').removeClass('visible');
      disableScroll();
    }
    if ($header.hasClass('active') && $(window).scrollTop() === 0) {
      $header.removeClass('active').addClass('visible');
      $('.wrapper').removeClass('active');
    }
  });
}());
