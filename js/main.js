$(document).ready(function () {
    var controller = new ScrollMagic.Controller();

    function isMobile() {
        if ($('.is-mobile').css('display') === 'block') {
            return true;
        } else {
            return false;
        }
    }

    //animate on scroll
    if (window.ScrollReveal) {
        var sr = window.ScrollReveal();

        var fadeIn = {
            distance: '0',
            origin: 'bottom',
            opacity: 0,
            interval: 200,
            duration: 1500
        };

        var slideUp = {
            distance: '40px',
            origin: 'bottom',
            opacity: 0,
            interval: 200,
            duration: 1500
        };

        var slideLeft = {
            distance: '30px',
            origin: 'left',
            opacity: 0,
            interval: 200,
            duration: 1500
        };

        var slideRight = {
            distance: '30px',
            origin: 'right',
            opacity: 0,
            interval: 200,
            duration: 1500
        };

        sr.reveal('.fade-in', fadeIn);
        sr.reveal('.slide-up', slideUp);
        sr.reveal('.slide-left', slideLeft);
        sr.reveal('.slide-right', slideRight);
    }


    //reseting header

    function headerReset() {
        $('.hamburger').removeClass('is-active');
        $('.header').removeClass('is-opened');
        $('body, html').removeClass('no-scroll-initial');
    }

    $('.hamburger').on('click', function (e) {
        $(this).toggleClass('is-active');
        $('.header').toggleClass('is-opened');
        $('body, html').toggleClass('no-scroll-initial');
    });

    $('.header-nav__dropdown-parent').on('click', function (e) {
        if (isMobile()) {
            $(this).find('.header-nav__dropdown').slideToggle();
        }
    });

    //header search

    function setFocus() {
        setTimeout(function () {
            $('.search__input').get(0).focus();
        }, 750);
    }

    $('.header__search-link').on('click', function (e) {
        e.stopPropagation();
        headerReset();
        $('.modal-search').addClass('is-active');
        setFocus();
    });

    $('.modal__close').on('click', function (e) {
        e.stopPropagation();
        $(this).parent().removeClass('is-active');
    });

    $(document).on('click', function (e) {
        if (!e) e = window.event;  //for mozilla
        if ($('.modal-search').hasClass('is-active')) {
            if (!$(e.target).closest('.modal-search__inner').length) {
                $('.modal-search.is-active').removeClass('is-active');
            }
        }
    });

    //font size control

    $('.header-content__font-increase').on('click', function (e) {
        e.preventDefault();
        var fsize = parseInt($('html').css('font-size'));
        $(this).siblings('.header-content__font-controls').removeClass('is-inactive');
        if (fsize >= 16) {
            $(this).addClass('is-inactive');
        }
        else {
            $('html').css({
                fontSize: fsize + 2 + 'px'
            });
        }
    });

    $('.header-content__font-decrease').on('click', function (e) {
        e.preventDefault();
        var fsize = parseInt($('html').css('font-size'));
        $(this).siblings('.header-content__font-controls').removeClass('is-inactive');
        if (fsize <= 12) {
            $(this).addClass('is-inactive');
        }
        else {
            $('html').css({
                fontSize: fsize - 2 + 'px'
            });
        }
    });

    //hero banner animation

    $('.hero-banner__inner').each(function (i, el) {
        var $this = $(el),
            timer = $this.attr('data-timer');

        setInterval(function () {
            $this.find('.hero-banner__img').toggleClass('is-animated');
        }, timer)
    });

    //category item animation - number and border

    $('.category-item').each(function (i, el) {

        var $this = $(el),
            count = $this.find('.count'),
            path = $this.find('.category__path'),
            dot = $this.find('.category__path-dot');
        // length = path.get(0).getTotalLength();
        // console.log(length);

        new ScrollMagic.Scene({
            triggerElement: el,
            offset: 0,
            triggerHook: 0.75,
            duration: $this.height(),
        })
            .on('enter', function (e) {
                if (!count.hasClass('increased')) {
                    count.prop('Counter', 0).animate({
                        Counter: count.text()
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function (now) {
                            count.text(parseInt(now));
                        }
                    });
                    count.addClass('increased');
                    path.addClass('is-animated');
                    dot.addClass('is-visible');
                }
            })
            .addTo(controller);
    });

    //range

    function rangeActiveInit() {
        $('.category-range__item.is-active').find('.category-range__item-content').addClass('is-active');
        $('.category-range__item.is-active').find('.category-range__item-content').addClass('is-active');
    }


    $('.category-range__item-content').on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            dataProgress = $this.attr('data-progress'),
            dataList = $this.attr('href'),
            target = $('.category-range__item-content'),
            targetDot = $('.category-range__content-dot'),
            currentI = target.index($this),
            progressBar = $('.category-range__body-progress'),
            progressDot = $('.category-range__body-dot'),
            list = $('.category-event__list');

        target.removeClass('is-active');
        list.hide();
        $this.addClass('is-active');
        $('.category-item__event').find('.category-event__list' + dataList).fadeIn();

        targetDot.removeClass('is-colored');
        progressDot.removeClass('is-colored');

        for (var i = 0; i <= currentI; i++) {
            targetDot.eq(i).addClass('is-colored');
        }

        if (currentI === (target.length - 1)) {
            progressDot.addClass('is-colored');
        } else {
            progressDot.removeClass('is-colored');
        }

        progressBar.css({
            width: dataProgress + '%'
        })

    });


    rangeActiveInit();

    $(window).resize(function () {
        // headerReset();
    });

    $(window).on('orientationchange', function () {
        // headerReset();
    });

});

$(window).on('load', function () {

});
