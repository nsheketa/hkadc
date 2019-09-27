$(document).ready(function () {

    function isMobile() {
        if ($('.is-mobile').css('display') === 'block') {
            return true;
        } else {
            return false;
        }
    }

    /* Init object fit polyfill */
    /* To make it work, add 'font-family: 'object-fit: cover;';' to image */
    if (window.objectFitImages) {
        window.objectFitImages();
    }

    //Scroll library init
    // https://github.com/michalsnik/aos
    AOS.init({
        offset: 40, // offset (in px) from the original trigger point
        delay: 50, // values from 0 to 3000, with step 50ms
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease-in-sine', // default easing for AOS animations
        once: true, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
    });

    //reseting header
    function headerReset() {
        $('.page-menu').removeClass('is-active');
        $('.hamburger').removeClass('is-active');
        $('.header').removeClass('is-opened');
        $('body, html').removeClass('no-scroll-initial');
    }

    $('.scroll-link').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);

        $('html,body').animate({
                scrollTop: $($this.attr('href')).offset().top
            },
            1000
        );
    });

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

    //range

    function rangeActiveInit(){
        $('.category-range__item.is-active').find('.category-range__item-content').addClass('is-active');
        $('.category-range__item.is-active').find('.category-range__item-content').addClass('is-active');
    }

    $('.category-range__item-content').on('click', function () {
        var $this = $(this),
            dot = $('.category-range__item-content'),
            parent = dot.parent(),
            dataList = $this.parent().attr('data-list'),
            list = $('.category-event__list'),
            parentSiblings = parent.siblings('.category-range__item');

        parentSiblings.removeClass('is-active');
        list.hide();
        $this.parent().addClass('is-active');
        $('.category-item__event').find('.category-event__list' + '.' + dataList).fadeIn();
        $this.addClass('is-active');
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
