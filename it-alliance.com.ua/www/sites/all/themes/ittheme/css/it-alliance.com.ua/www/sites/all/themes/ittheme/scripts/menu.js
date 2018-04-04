
//MENU MOBILE
//jQuery(document).ready(function ($) {
//    $(window).resize(checkSize2);
//    checkSize();
//});
//
//function checkSize() {
//    if ($(".pane-menu-menu-front").css("margin-top") == "5px") {
//        //$(".pane-menu-menu-front .menu").css("background", "red");
//        $(".pane-menu-menu-front").click(function() {
//            $(".pane-menu-menu-front .menu").slideToggle(300);
//        });
//    }
//}
//
//function checkSize2() {
//    if ($(".pane-menu-menu-front").css("margin-top") !== "5px") {
//        $(".pane-menu-menu-front .menu").show();
//    } else {
//        $(".pane-menu-menu-front .menu").hide();
//    }
//}

jQuery(function($) {
    checkSize();
    $(window).resize(checkSize);
    $(window).load(checkSize);

    function checkSize() {

        function menuToggle() {
          $(".pane-menu-menu-front .menu").slideToggle(300);
        }

        if ($(window).width() < 769) {
          $(".pane-menu-menu-front").addClass("menu_active").off().click( menuToggle );
          $(".pane-menu-menu-front .menu").hide();
        } else {
          $(".pane-menu-menu-front").removeClass("menu_active");
          $(".pane-menu-menu-front .menu").show();
        }

    }
});
