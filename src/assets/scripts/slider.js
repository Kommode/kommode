(function($, u) {
  'use strict';

  function Slider(id) {
    this.$el = $('#' + id);
  }

  Slider.prototype.init = function() {
    this.$el.html(u.getTemplate('person-tpl')({person: Data.people}));

    this.$items = this.$el.find('li');

    this.setWidths();
    this.handleEvents();

    this.timer = 180;
    this.count = 0;

    var self = this;
    (function loop() {
      requestAnimationFrame(loop);
      self.play();
    }());
  };

  Slider.prototype.play = function() {
    if (this.isPaused || this.count++ < this.timer) {return;}
    this.step();
    this.next();
    this.count = 0;
  };

  Slider.prototype.step = function() {
    var stepSize = '-' + this.itemWidth;
    this.$el.css({
      transition: '-webkit-transform 500ms ease',
      transform: 'translateX(' + stepSize + 'px)'
    });
  };

  Slider.prototype.next = function() {
    var self = this;
    setTimeout(function() {
      self.$el.find('li:first')
        .clone(true)
        .appendTo(self.$el);
    }, 500);
    setTimeout(function() {
      self.$el.find('li:first').remove();
      self.$el.css({
        transition: 'none',
        transform: 'translateX(0)'
      });
    }, 1000);
  };

  Slider.prototype.handleEvents = function() {
    $(window).resize(this.handleResize.bind(this));
    this.$el.on('click', this.handleClick.bind(this));
  };

  Slider.prototype.handleClick = function() {
    this.isPaused = !this.isPaused;
  };

  Slider.prototype.handleResize = function(event) {
    this.setWidths();
  };

  Slider.prototype.setWidths = function() {
    this.itemsOnScreen = this.getNumItemsOnScreen($(window).width());
    this.itemWidth = ($(window).width() - 40) / this.itemsOnScreen;
    this.elWidth = this.itemWidth * (this.itemsOnScreen + 2);

    this.$items.width(this.itemWidth);
    this.$el.width(this.elWidth);
  };

  Slider.prototype.getNumItemsOnScreen = function(width) {
    return width < u.breakpoints.small ? 1 :
      (width < u.breakpoints.medium ? 2 :
      (width < u.breakpoints.large ? 3 : 4));
  };

  var slider = new Slider('people-slider');
  slider.init();

}(jQuery, Utils));
