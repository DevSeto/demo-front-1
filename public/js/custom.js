jQuery(document).on('click','.custom-dropdown',function(){
    jQuery(this).find('.dropdown-content').slideToggle();
});
// jQuery(document).on('click','#left-sidebar li.menu-item > a',function(){
//     jQuery(this).parent('li.menu-item').find('.sidebar-sub-menu').slideToggle();
// });
// jQuery(document).on('click','#left-sidebar .sidebar-sub-menu li.menu-item > a',function(){
//     jQuery(this).parents('.sidebar-sub-menu').find('.sub-sub-menu').slideToggle();
// });
// jQuery(document).on('click','.right-sidebar-menu li.menu-item > a',function(){
//     jQuery(this).parents('li.menu-item').find('.sidebar-sub-menu').slideToggle();
//     jQuery(this).parents('li.menu-item').find('.la-fw').toggleClass('la-angle-up');
// });
jQuery(document).on('click','.toggle-icon',function(){
    jQuery('#left-sidebar').toggleClass('mobile-menu');
    jQuery('.toggle-icon i').toggleClass('la-close');
    jQuery('.page-main-content .main-content').toggleClass('mobile-content');
    jQuery('.page-main-content').css('overflow','hidden');
});
jQuery(document).on('click','#left-sidebar .sidebar-sub-menu li ',function(){
    jQuery('#left-sidebar .sidebar-sub-menu li.active').removeClass('active');
    jQuery(this).addClass('active');
});
jQuery(document).on('click','.site-header .header-menu li.menu-item',function(){
    jQuery('.site-header .header-menu li.menu-item.active').removeClass('active');
    jQuery(this).addClass('active');
});
jQuery(document).on('click','.text-editor-box .toolbar li.toolbar-dropdown>a',function(){
    jQuery('.toolbar-dropdown ul').toggle();
    //jQuery(this).parent('li.toolbar-dropdown').find('li.toolbar-dropdown ul').toggle();
    jQuery(this).toggleClass('active');

});

jQuery('.selectpicker').selectpicker({

});
// jQuery(document).on('click','ul.tabs li',function(){
//     var tab_id = jQuery(this).attr('data-tab');
//
//     jQuery('ul.tabs li').removeClass('current');
//     jQuery('.custom-tab-content').removeClass('current');
//
//     jQuery(this).addClass('current');
//     jQuery("#"+tab_id).addClass('current');
// });
// jQuery(document).on('click','.color_selection .color-items',function(){
//     jQuery(".color_selection .color-items.active").toggleClass('active');
//     jQuery(this).addClass('active');
//     jQuery('.create_label_form').addClass('selected-label');
//     jQuery('.create_label_form button').html('<i class="la la-check"></i>');
// });

// $(document).ready(function(){
//
//     // $('#welcome-popup ul.tabs li').click(function(){
//     //     var tab_id = $(this).attr('data-tab');
//     //
//     //     $('#welcome-popup ul.tabs li').removeClass('current');
//     //     $('#welcome-popup .tab-content').removeClass('current');
//     //
//     //     $(this).addClass('current');
//     //     $("#"+tab_id).addClass('current');
//     })
//
// });

// jQuery(document).on('click','.onoffswitch-label',function(){
//     $('.autoreply-on').toggle();
// });

// $(document).ready(function(){
//     $('.header-menu .toggle-icon').click{function () {
//      $('#left-sidebar').toggle();
//     }
//
//     }
// }

//MOBILE ---- OPEN/CLOSE LEFT SIDEBAR
const touchstart = 140 * window.devicePixelRatio;
const touchend = 200 * window.devicePixelRatio;

if(window.innerWidth <= 560) {
    window.onload = () => {
        document.body.addEventListener('touchstart', touchstartHandler);
    }
}

function touchstartHandler(event) {
    console.log(event.changedTouches[0].screenX);
    if(event.changedTouches[0].screenX <= touchstart) {
        document.body.addEventListener('touchend', touchendHandler, {once: true});
    }
}

function touchendHandler(event) {
    let nav_bar = document.querySelector('.nav-bar');
    let tickets_panel = document.querySelector('.tickets-panel');
    let header_panel__right = document.querySelector('.header-panel__right');

    if(event.changedTouches[0].screenX >= touchend && (nav_bar && tickets_panel && header_panel__right)) {
        nav_bar.classList.toggle('open');
        tickets_panel.classList.toggle('close');
        header_panel__right.classList.toggle('show');
    }
}
//-------------------
