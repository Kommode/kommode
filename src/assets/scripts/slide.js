var height = $(window).height();
var width = $(window).width();

(function() {
  $(window).resize(function() {
    $('.slide').height(height);
    $('.slide').width(width);

    height = $(window).height();
    width = $(window).width();
  });
}());
