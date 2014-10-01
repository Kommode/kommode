var $header = $('.header');

function headerSlide() {

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
    $header.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
      enableScroll();
    });
    if ($(window).scrollTop() >= 0 && $header.hasClass('visible')) {
      $header.addClass('active').removeClass('visible');
      disableScroll();
      fadeContent();
    }
    if ($header.hasClass('active') && $(window).scrollTop() === 0) {
      $header.removeClass('active').addClass('visible');
    }
  });
}

if (screen.width > 600) {
  headerSlide();
}
