/*!
 * jQuery TrEVo SideMenu v1.1
 * https://github.com/djtrevo/SideMenu
 * 
 * Copyright 2013, Marco Trevisani
 * * * * * * * * * * * * * * * * * * * * * *
 * 
 * Official Website: http://www.marcotrevisani.com
 * Music Website: http://www.djtrevo.com
 * 
 * * * * * * * * * * * * * * * * * * * * * * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */ (function ($) {
    $.fn.trevoSideMenu = function (options) {
        var defaults = {
            speed: 500,
            multi_l1_open: false,
            multi_l2_open: false,
            l1_open_css: 'open',
            l2_open_css: 'open'
        };

        var options = $.extend(defaults, options);
        var inAction = false;

        return this.each(function () {
            $(this).children('nav').children('ul').addClass('l1');
            $('ul.l1').children('li').addClass('lvl1');
            $('li.lvl1').children('ul').addClass('l2');
            $('ul.l2').children('li').addClass('lvl2');
            $('li.lvl2').children('ul').addClass('l3');
            $('ul.l3').children('li').addClass('lvl3');

            $(this).find('.l2').each(function () {
                if (!$(this).hasClass('open')) {
                    $(this).hide();
                }
            })

            $(this).find('.l3').each(function () {
                if (!$(this).hasClass('open')) {
                    $(this).hide();
                }
            })

            $(this).find('.lvl1 > a, .lvl2 > a').click(function () {
                var Link = $(this).prop("href");
                if (Link.substr(-1) == '#') {
                    var padreClass = $(this).parent().prop("class");
                    var lvl = parseInt(padreClass.substring(padreClass.indexOf("lvl") + 3, padreClass.indexOf("lvl") + 4));

                    subMenu = $(this).parent().find("ul.l" + parseInt(lvl + 1));
                    var isVisibile = subMenu.is(":visible");
                    if (subMenu.length != 0) {
                        if (!isVisibile) {
                            closeAll(lvl);
                        }

                        if (!inAction) {
                            inAction = true;
                            changeActiveStyle($(this), lvl, isVisibile);
                            subMenu.animate({
                                easing: 'swing',
                                height: 'toggle'
                            }, {
                                duration: options.speed,
                                queue: false,
                                complete: function () {
                                    if (subMenu.is(":visible")) {
                                        subMenu.addClass("open");
                                    } else {
                                        subMenu.removeClass("open");
                                    }
                                    inAction = false;
                                }
                            });
                        }
                    };
                    return false;
                }
            })
        });

        function changeActiveStyle(elem, lvl, isVisibile) {
            switch (lvl) {
                case 1:
                    if (isVisibile) {
                        elem.removeClass(options.l1_open_css)
                    } else {
                        elem.addClass(options.l1_open_css)
                    }
                    break;
                case 2:
                    if (isVisibile) {
                        elem.removeClass(options.l2_open_css)
                    } else {
                        elem.addClass(options.l2_open_css)
                    }
                    break;
                default:
            }
        }

        function closeAll(lvl) {
            if ((lvl == 1 && !options.multi_l1_open) || (lvl == 2 && !options.multi_l2_open)) {
                $('.lvl' + lvl).children('ul.open').each(function () {
                    if (!inAction) {
                        var aElement = $(this).parent().children("a");

                        changeActiveStyle($(this), lvl, true)
                        $(this).animate({
                            easing: 'swing',
                            height: 'toggle'
                        }, {
                            duration: options.speed,
                            complete: function () {
                                switch (lvl) {
                                    case 1:
                                        $(this).removeClass(options.l1_open_css)
                                        aElement.removeClass(options.l1_open_css)
                                        break;
                                    case 2:
                                        $(this).removeClass(options.l2_open_css)
                                        aElement.removeClass(options.l1_open_css)
                                        break;
                                    default:
                                }

                            }
                        })
                    }
                })
            }
        }
    };
})(jQuery);