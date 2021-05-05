var images = {
    1: [
        { href: './img/matchedbetting/MatchedBetting_Wpf_BetsPage.png' },
        { href: './img/matchedbetting/MatchedBetting_Wpf_CalculatorPage.png' },
        { href: './img/matchedbetting/MatchedBetting_Wpf_AddMatchedBet.png' },
        { href: './img/matchedbetting/MatchedBetting_Wpf_ThemePage.png' },
        { href: './img/matchedbetting/MatchedBetting_Wpf_HomePage.png' },
    ],
    2: [
        { href: './img/matchedbetting/MatchedBetting_Excel_HomePage.png' },
        { href: './img/matchedbetting/MatchedBetting_Excel_PendingPage.png' },
        { href: './img/matchedbetting/MatchedBetting_Excel_CalculatorsPage.png' },
        { href: './img/matchedbetting/MatchedBetting_Excel_EditAccount.png' },
        { href: './img/matchedbetting/MatchedBetting_Excel_DepositAccount.png' },
        { href: './img/matchedbetting/MatchedBetting_Excel_EditBet.png' },
        { href: './img/matchedbetting/MatchedBetting_Excel_PlaceBet.png' },
    ],
    3: [
        { href: './img/football/TaskiusFootball_WinFormsApp.png' }
    ],
    4: [
        { href: './img/football/TaskiusFootball_Website_MainPage.png' },
        { href: './img/football/TaskiusFootball_Website_PlayerResultsPage.png' },
        { href: './img/football/TaskiusFootball_Website_PlayerHistoryPage.png' },
        { href: './img/football/TaskiusFootball_Website_SeasonsDropDown.png' },
    ],
    5: [
        { href: './img/mediaorganiser/TaskiusMediaOrganiser_ToolTips.png' },
        { href: './img/mediaorganiser/TaskiusMediaOrganiser_OnImage_1.png' },
        { href: './img/mediaorganiser/TaskiusMediaOrganiser_ChooseBaseDirectory.png' },
        { href: './img/mediaorganiser/TaskiusMediaOrganiser_WindowsExplorer.png' }
    ],
    6: [
        { href: './img/googlestaticmaps/GoogleStaticMapImageDownloader.png' }
    ],
    7: [
        { href: './img/android/SunshineApp.png' },
        { href: './img/android/SunshineApp_2.png' }
    ],
    8: [
        { href: './img/taskius/taskius.jpg' }
    ],
	9: [
		{ href: './img/Suki/Suki_1.jpg' },
        { href: './img/Suki/Suki_2.jpg' },
        { href: './img/Suki/Suki_3.jpg' }
	]
};


$(document).ready(function () {


    $(document).bind("fullscreenerror", function () {
        alert("Browser rejected fullscreen change");
    });

    function addLinks() {
        var list = $("#links");

        if (!list.length) {
            list = $('<ul id="links">');

            for (var i = 0; i < this.group.length; i++) {
                $('<li data-index="' + i + '"><label></label></li>').click(function () { $.fancybox.jumpto($(this).data('index')); }).appendTo(list);
            }

            list.appendTo('body');
        }

        list.find('li').removeClass('active').eq(this.index).addClass('active');
    }

    function removeLinks() {
        $("#links").remove();
    }

    $('.fancybox').fancybox();

    $(".fancybox-manual").click(function () {
        var imageIndex = $(this).parent().data('image-index');

        $.fancybox.open(images[imageIndex],
            {
                nextEffect: 'fade',
                prevEffect: 'fade',
                padding: 0,
                margin: [20, 15, 40, 15],
                afterLoad: addLinks,
                beforeClose: removeLinks,
                closeBtn: true,
                arrows: true,
                afterClose: function () {
                    $(document).fullScreen(false);
                },
                helpers: {
                    title: {
                        type: 'inside'
                    },
                    buttons: {},
                    overlay: {
                        css: { 'background-color': '#f1f1f1' }
                    }
                }
            });
    });



    var portfolioSectionStart = $('#portfolioSectionStart').offset().top;
    var affixOffsetTop = portfolioSectionStart - 70;

    $('#affix2').affix({
        offset: {
            top: affixOffsetTop
        }
    });


    // var homeSectionHeight = $('#homeSection').height();
    // $('.navbar').affix({
    // offset: {
    // top: function(){return 200;}
    // }
    // });



    $('.navbar li a').click(function (event) {
        event.preventDefault();
        var element = $($(this).attr('href'))[0];
        var mainNav = $('#mainNav');
        var top = element.getBoundingClientRect().top;

        var diff = -4;
        if (element.id == 'aboutSection' && mainNav.hasClass("affix-top")) {
            diff = mainNav.height() - 3;
        }
        else if (element.id != 'aboutSection' && element.id != 'portfolioSection' && element.id != 'contactSection') {
            var diff = 67.5;
        }


        var scrollAmount = element.getBoundingClientRect().top - diff; // Navbar Height
        //$($(this).attr('href'))[0].scrollIntoView({ behavior: 'smooth', offset: 40 });

        window.scrollBy({ top: scrollAmount, left: 0, behavior: 'smooth' });

        //scrollBy(0, -40);
    });

    // Cache selectors
    var lastId,
        lastOffsetTop,
        topMenu = $("#top-menu"),
        topMenuHeight = topMenu.outerHeight() + 15,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        lastOffsetTop = offsetTop;

        if (offsetTop === lastOffsetTop)
        { return; }
        offsetTop = 30;
        window.scrollBy({ top: offsetTop, left: 0, behavior: 'smooth' });

        e.preventDefault();
    });


    // Bind to scroll
    $(window).scroll(function () {

        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("current")
                .end().filter("[href='#" + id + "']").parent().addClass("current");
        }
    });

});