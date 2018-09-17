$(window).on('load', function () {
    "use strict";
    //Preloader
    if ($('body').hasClass('loading')) {
        var $preLoader = $('body>.tw-preloader');
        if ($preLoader.length) {
            $preLoader.animate({
                opacity: 0,
                visibility: "hidden"
            }, 500);
            $('body').removeClass('loading');
            $(window).trigger('tw-resize');
        } else {
            $('body').removeClass('loading');
        }
    }
    $('div.code').each(function (i, block) {
        hljs.highlightBlock(block);
    });

    $('.tw-lovely-slider').each(function () {
        var $cFeatPost = $(this);
        var $cFeatPostItems = $cFeatPost.children('.post-item');
        var $auto = true;
        var $time = 0;
        var $timeInt = 1000;
        var $timeMax = 3000;
        $cFeatPostItems.each(function () {
            var $cFeatPostItem = $(this);
            $cFeatPostItem.on({
                mouseenter: function () {
                    $cFeatPostItem.addClass('active').siblings('.post-item').removeClass('active');
                    $auto = false;
                },
                mouseleave: function () {
                    $time = 0;
                    $auto = true;
                }
            });
        });
        if ($cFeatPostItems.length > 1) {
            setInterval(function () {
                if ($auto && $time > $timeMax) {
                    $time = 0;
                    var $activeItem = $cFeatPost.children('.post-item.active');
                    var $nextItem = $activeItem.next('.post-item').hasClass('post-item') ? $activeItem.next('.post-item') : $cFeatPostItems.eq(0);
                    $nextItem.addClass('active');
                    $activeItem.removeClass('active');
                } else {
                    $time += $timeInt;
                }
            }, $timeInt);
        }
    });

    $('.tw-text-animate').each(function () {
        var $this = jQuery(this);
        var arr = $this.html().trim().split('');
        var $html = '';
        var $tag = false;
        var $delay = 0;
        arr.forEach(function (element) {
            if (element === '<') {
                $tag = true;
            }
            if (!$tag) {
                $delay += 0.040;
                $html += "<span style=\"transition-delay: " + $delay + "s\">" + element + "</span>";
            } else {
                $html += element;
            }
            if (element === '>') {
                $tag = false;
            }
        });
        $this.html($html);
        setTimeout(function () {
            $this.addClass('active');
        }, 500);
    });

    // OnePage Scroll
    // handle links with @href started with '#' only
    jQuery(document).on('click', 'a[href^="#"]', function (e) {
        // target element id
        var id = $(this).attr('href');
        if (id === '#') { return false; }
        // target element
        var $id = $(id);
        if ($id.length === 0) { return false; }
        // prevent standard hash navigation (avoid blinking in IE)
        e.preventDefault();
        // top position relative to the document
        var pos = $id.offset().top;
        // animated top scrolling
        jQuery('body, html').animate({ scrollTop: pos });
    });
    // PROGRESS
    $('.progress-item').each(function () {
        var $crProgCont = $(this);
        var $crProg = $('progress', $crProgCont);
        var $crVal = $crProg.attr('value');
        $crProg.on('tw-animate', function () {
            $crProg.addClass('no-trans').val(0);
            setTimeout(function () {
                $crProg.removeClass('no-trans').val($crVal);
            }, 100);
        }).trigger('tw-animate');
        $crProgCont.on('inview', function () {
            $crProg.trigger('tw-animate');
        });
    });
    // Counter Up
    $('.tw-counterup').each(function () {
        /*  data-txt="$" data-sep="," data-dur="3000" */
        var $crCntrUpCont = $(this);
        var $crSlctr = $crCntrUpCont.data('slctr') ? $crCntrUpCont.data('slctr') : 'h1';
        var $crCntrUp = $($crSlctr, $crCntrUpCont);
        var $crCnt = parseInt($crCntrUp.text().replace(/ /gi, ''), 10);
        var $crDur = $crCntrUpCont.data('dur') ? parseInt($crCntrUpCont.data('dur'), 10) : 300;
        var $crTxt = $crCntrUpCont.data('txt') ? $crCntrUpCont.data('txt') : '';
        var $crSep = $crCntrUpCont.data('sep') ? $crCntrUpCont.data('sep') : '';
        var $crInt = 3;
        if ($crInt > $crDur) { $crInt = $crDur; }
        var $crStp = $crCnt / ($crDur / $crInt);
        if ($crStp <= 0 || isNaN($crStp)) { $crStp = $crCnt; }
        $crCntrUp.on('tw-animate', function () {
            if ($crCntrUp.data('tw-counting') !== 'true') {
                $crCntrUp.data('tw-counting', 'true');
                var $i = 0;
                var $iTxt = '';
                var $iTmp = '';
                var $ml = setInterval(function () {
                    $iTxt = '';
                    $i = $i + $crStp;
                    if ($i >= $crCnt) {
                        $i = $crCnt;
                        clearInterval($ml);
                        $crCntrUp.data('tw-counting', 'false');
                    }
                    $iTmp = (parseInt($i, 10) + '').split('');
                    for (var i = 0, l = $iTmp.length; i < l; i++) {
                        if (i !== 0 && i % 3 === 0) {
                            $iTxt = $crSep + $iTxt;
                        }
                        $iTxt = $iTmp[l - 1 - i] + $iTxt;
                    }
                    $crCntrUp.text($iTxt + $crTxt);
                }, $crInt);
            }
        }).trigger('tw-animate');
        $crCntrUpCont.on('inview', function () {
            $crCntrUp.trigger('tw-animate');
        });
    });
    // Chart Circle
    $('.tw-chart-circle').each(function () {
        var $currentCircleChartCont = $(this);
        var $currentCircleChart = $('>.tw-chart', $currentCircleChartCont);
        $currentCircleChart.easyPieChart({
            animate: 1000,
            lineWidth: $currentCircleChart.attr('data-width'),
            size: $currentCircleChart.attr('data-size'),
            barColor: $currentCircleChart.attr('data-color'),
            trackColor: $currentCircleChart.attr('data-trackcolor'),
            scaleColor: false,
            lineCap: 'butt',
            onStep: function () {
                $currentCircleChart.css('line-height', $currentCircleChart.attr('data-size') + 'px');
                $currentCircleChart.css('width', $currentCircleChart.attr('data-size') + 'px');
                $currentCircleChart.css('height', $currentCircleChart.attr('data-size') + 'px');
            }
        });
        $currentCircleChartCont.on('inview', function () { $currentCircleChart.data('easyPieChart').disableAnimation().update(0).enableAnimation().update($currentCircleChart.attr('data-percent')); });
    });
    $(".tw-box.flip").on({
        mouseenter: function () {
            $(this).addClass('flipped');
        },
        mouseleave: function () {
            $(this).removeClass('flipped');
        }
    });

    // Animated Background Colors
    $('.tw-hover-btn').each(function () {
        var $color = $(this).css('background-color');
        $(this).on({
            mouseenter: function () {
                $(this).css('background-color', 'transparent');
                $(this).css('border-color', $color);
                $(this).css('color', $color);
            },
            mouseleave: function () {
                $(this).css('color', '#fff');
                $(this).css('background-color', $color);
            }
        });
    });

    // Blog hover
    $(".tw-blog.metro-blog article").on({
        mouseenter: function () {
            var $height = $('.entry-content p:not(.more-link)', this).height();
            $('.entry-title, .entry-date', this).css('top', -$height);
        },
        mouseleave: function () {
            $('.entry-title, .entry-date', this).css('top', 0);
        }
    });

    /* Video Modal Autoplay */
    $('#modal-close').each(function (i) {
        var $crVidMod = $(this);
        if ($crVidMod.data('auto-play')) {
            var $iFs = $('iframe', $crVidMod);
            $iFs.each(function (j) {
                var $id = 'tw-video-player-' + i + '-' + j;
                var $iFO = $(this);
                var $iF = $iFO.attr('id', $id);
                var $iFSrc = $iF.attr('src');
                if ($iFSrc.indexOf('youtube.com') !== -1) {
                    $iF.attr('src', $iFSrc + (($iFSrc.indexOf('?') === -1) ? '?' : '&') + 'enablejsapi=1');
                    $iF.on('load', function () {
                        var $playerYT = new YT.Player($id, {
                            playerVars: {
                                'autoplay': 0, /*options.autoplay,*/
                            },
                            events: {
                                onReady: function () {
                                    $crVidMod.on('show', function () {
                                        setTimeout(function () {
                                            $playerYT.playVideo();
                                        }, 1000);
                                    });
                                    $crVidMod.on('hide', function () {
                                        $playerYT.pauseVideo();
                                    });
                                },
                                onStateChange: function (event) {
                                    /* 'loop': 1, Not Working !!! - then use hard code */
                                    if ($crVidMod.data('loop') && event.data === 0) {
                                        $playerYT.playVideo();
                                    }
                                }
                            }
                        });
                    });
                }
            });
        }
    });
    /* Mobile Menu Animation */
    $('#mobile-menu-modal').each(function () {
        var $crMobMod = $(this);
        $('ul.uk-nav', $crMobMod).on('show hide', function (e) { e.preventDefault(); return false; });
        tw_anim_data_con($('[data-uk-scrollspy],[uk-scrollspy]', $crMobMod));
        $crMobMod.on('show', function () {
            tw_in($('[data-uk-scrollspy],[uk-scrollspy]', $crMobMod));
        });
        $crMobMod.on('hide', function () {
            tw_out($('[data-uk-scrollspy],[uk-scrollspy]', $crMobMod));
        });
        $('a', $crMobMod).on('click', function () {
            if ($(this).attr('href') && $(this).attr('href') !== '#' && $(this).attr('href').indexOf('#') !== -1) {
                $('a.mobile-menu').trigger('click');
            }
        });
    });
    /* Resize */
    var $twRes = 'no-resize';
    var $twResIntStep = 100;
    $(window).resize(function () { $twRes = 1000; });
    setInterval(function () {
        if ($twRes !== 'no-resize') {
            $twRes -= $twResIntStep;
            if ($twRes <= 0) {
                $twRes = 'no-resize';
                $(window).trigger('tw-resize');
            }
        }
    }, $twResIntStep);
    $(window).trigger('tw-resize');
    $twRes = 100;
    /* Scroll */
    jQuery(window).scroll();
});
$(window).on('tw-resize', function () {
    "use strict";
    /* Sidebar Menu */
    $('.tw-header-sidebar .sub-menu').each(function () {
        var $crSub = $(this).css({ opacity: '0', display: 'block', marginTop: 0 });
        var $crSubH = $crSub.offset().top - $(window).scrollTop() + $crSub.outerHeight();
        var $wH = $(window).height();
        var $mT = '';
        if ($crSubH > $wH) {
            $mT = ($wH - $crSubH) + 'px';
        }
        $crSub.css({ opacity: '', display: '', marginTop: $mT });
    });

    /* Calc Width */
    $('.tw-calc-width').each(function () {
        var $cr = $(this).css('width', '');
        var $crW = $cr.width();
        var $col = tw_get_col($cr);
        $crW += $col - $crW % $col;
        var $colW = $crW / $col;
        $cr.width($crW);
        $cr.find('>*').each(function () {
            var $crSecItem = $(this);
            $crSecItem.width($colW * tw_get_col($crSecItem, 'uk-width-1-'));
        });
    });
    var $tw_iso_conts = $(window).data('tw_iso_conts') || [];
    setTimeout(function () {
        $tw_iso_conts.forEach(function ($crIsoCont) {
            var $crItemSelector = $crIsoCont.closest('.tw-isotope-container').data('isotope-item') ? $crIsoCont.closest('.tw-isotope-container').data('isotope-item') : '.uk-grid>*';
            var $crType = $crIsoCont.data('type');
            var $crSlct = $crIsoCont.data('selector');
            $($crItemSelector, $crIsoCont).each(function () {
                var $SSFixer = $(this);
                if ($SSFixer.hasClass('uk-scrollspy-inview')) {
                    $SSFixer.addClass('tw-scrollspy-fixer');
                }
            });
            if ($crType === 'masonry' && $crSlct) {
                $($crSlct, $crIsoCont).each(function () {
                    var $crIsIt = $(this);
                    var $crSize = $crIsIt.data('size');
                    var $crIsItW = $crIsIt.width();
                    var $crIsItP = $crIsIt.innerWidth() - $crIsItW;
                    $crIsIt.css('height', '');
                    switch ($crSize) {
                        case 'vertical':
                            $crIsIt.height($crIsItW * 2 + $crIsItP);
                            break;
                        case 'horizontal':
                            $crIsIt.height(($crIsItW - $crIsItP) / 2);
                            break;
                        default:
                            $crIsIt.height($crIsItW);
                    }
                    var $crIm = $('.portfolio-media>img', $crIsIt);
                    if ($crIm.length) {
                        $crIm.css({ maxWidth: '', width: '', height: '', left: '', top: '' });
                        var $crIsItW = $crIsIt.width();
                        var $crIsItH = $crIsIt.height();
                        var $crImW = $crIm.width();
                        var $crImH = $crIm.height();
                        var $crImD = $crImH / $crImW;
                        var $top = 0;
                        var $left = 0;
                        if ($crIsItH < $crImH) {
                            $top = ($crIsItH - $crImH) / 2;
                        } else if ($crIsItH > $crImH) {
                            $crImW = $crIsItH / $crImD;
                            $crIm.css({ maxWidth: $crImW + 'px', width: $crImW + 'px' });
                            $left = ($crIsItW - $crImW) / 2;
                        }
                        $crIm.css({ marginTop: $top + 'px', marginLeft: $left + 'px' });
                    }
                }).promise().done(function () {
                    $crIsoCont.isotope('reloadItems').isotope({ sortBy: 'original-order' });
                });
            } else {
                $crIsoCont.isotope('reloadItems').isotope({ sortBy: 'original-order' });
            }
        });
    }, 100);
});

function tw_get_col($cr, $colPtrn) {
    "use strict";
    if (!$colPtrn) { $colPtrn = 'uk-child-width-1-'; }
    var $crClasses = $cr.attr('class').split(' ');
    var $crClsWs = [];
    var $crSize = 'default';
    var $col = 1;
    var $sizes = {
        s: '(min-width: 640px)',
        m: '(min-width: 960px)',
        l: '(min-width: 1200px)',
        xl: '(min-width: 1600px)'
    };
    for (var i = 0; i < $crClasses.length; i++) {
        if ($crClasses[i].search($colPtrn) > -1) {
            var $crClsW = $crClasses[i].split('@');
            $crClsWs[$crClsW.length > 1 ? $crClsW[1] : 'default'] = $crClsW[0];
        }
    }
    for (var size in $sizes) {
        if (window.matchMedia($sizes[size]).matches && $crClsWs.hasOwnProperty(size)) {
            $crSize = size;
        }
    }
    if (Object.keys($crClsWs).length) {
        if ($crClsWs.hasOwnProperty($crSize)) {
            $col = parseInt($crClsWs[$crSize].replace($colPtrn, ''), 10);
        }
    }
    return $col;
}
$(document).ready(function () {
    "use strict";
    tw_anim_init('[data-anim]');
});
function tw_anim_init($items) {
    "use strict";
    $($items).each(function () {
        var $sAc = $(this);
        var $sAcAnim = $sAc.data('anim');
        var $sAcAnimTarget = $sAcAnim ? $($sAcAnim, $sAc) : false;
        var $sAcAnimIn = $sAc.data('anim-in');
        if ($sAcAnimTarget && $sAcAnimTarget.length && $sAcAnimIn) {
            $sAcAnimTarget.addClass('tw-outview');
        }
    });
}
function tw_out($outs) {
    "use strict";
    $outs.each(function () {
        var $sAc = $(this);
        var $sAcAnim = $sAc.data('anim-out-target') ? $sAc.data('anim-out-target') : $sAc.data('anim');
        var $sAcAnimTarget = $sAcAnim ? $($sAcAnim, $sAc) : false;
        var $sAcAnimOut = $sAc.data('anim-out') ? $sAc.data('anim-out') : 'tw-anim-hide';
        var $sAcAnimDelay = $sAc.data('anim-delay') ? parseInt($sAc.data('anim-delay'), 10) : 0;
        if ($sAcAnimTarget && $sAcAnimTarget.length && $sAcAnimOut) {
            $sAcAnimTarget.each(function (i) {
                var $delAnim = $(this).removeClass($sAcAnimOut).removeClass('tw-outview').css({ opacity: '', visibility: '' });
                setTimeout(function () {
                    $delAnim.addClass($sAcAnimOut);
                    setTimeout(function () {
                        $delAnim.removeClass($sAcAnimOut).addClass('tw-outview');
                    }, 500);
                }, i * $sAcAnimDelay);
            });
        }
    });
}
function tw_in($ins) {
    "use strict";
    $ins.each(function (j) {
        var $sAc = $(this);
        var $sAcAnim = $sAc.data('anim');
        var $sAcAnimTarget = $sAcAnim ? $($sAcAnim, $sAc) : false;
        var $sAcAnimIn = $sAc.data('anim-in');
        var $sAcAnimDelay = $sAc.data('anim-delay') ? parseInt($sAc.data('anim-delay'), 10) : 0;
        if ($sAcAnimTarget && $sAcAnimTarget.length && $sAcAnimIn) {
            $sAcAnimTarget.addClass('tw-outview');
            setTimeout(function () {
                $sAcAnimTarget.each(function (i) {
                    var $delAnim = $(this).removeClass($sAcAnimIn);
                    setTimeout(function () {
                        $delAnim.removeClass('tw-outview').addClass($sAcAnimIn).css({ opacity: '', visibility: '' });
                        if ($delAnim[0]._scrollspy) {
                            $delAnim[0]._scrollspy.inview = true;
                        }
                        var $cntrUpAnim = $delAnim.filter('.tw-counterup').length ? $delAnim.filter('.tw-counterup') : $('.tw-counterup', $delAnim);
                        $cntrUpAnim.each(function () {
                            var $crCntrUpCont = $(this);
                            var $crSlctr = $crCntrUpCont.data('slctr') ? $crCntrUpCont.data('slctr') : 'h1';
                            var $crCntrUp = $($crSlctr, $crCntrUpCont);
                            if ($crCntrUp.length) {
                                $crCntrUp.trigger('tw-animate');
                            }
                        });
                        setTimeout(function () {
                            $delAnim.removeClass($sAcAnimIn);
                        }, 500);
                    }, (i + 1) * $sAcAnimDelay);
                });
            }, (j + 1) * $sAcAnimDelay);
        }
    });
}
function tw_data_parse($data) {
    "use strict";
    var $newData = [];
    $data.split(';').forEach(function ($item) {
        $item = $item.trim();
        if ($item) {
            $item = $item.split(':');
            $newData[$item[0].trim()] = $item[1].trim();
        }
    });
    return $newData;
}
function tw_anim_data_con($els, $preIn, $preOut) {
    "use strict";
    var $datas = [];
    $els.each(function () {
        var $el = $(this);
        var $elData = $el.data('uk-scrollspy') ? $el.data('uk-scrollspy') : ($el.attr('uk-scrollspy') ? $el.attr('uk-scrollspy') : false);
        if ($elData) {
            $elData = tw_data_parse($elData);
            $datas.push($elData);
            if ($elData.target) {
                $el.data('anim', ($preIn ? $preIn : '') + $elData.target);
                $el.data('anim-out-target', ($preOut ? $preOut : '') + $elData.target);
            }
            if ($elData.cls) {
                $el.data('anim-in', $elData.cls);
            }
            if ($elData.delay) {
                $el.data('anim-delay', $elData.delay);
            }
        }
    });
    return $datas;
}