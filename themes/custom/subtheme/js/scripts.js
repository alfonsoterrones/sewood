
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}

function getURL() {
	return "whatsapp://send?text=" + window.location.href
}

jQuery(document).ready(function() {
alert(`hola`)

	$(".botones-perfil-difunto").click(function () {
		$("form#comment-form").css("display", "block");
	});

	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), $('nav').outerHeight());
	});
	// toggle "navbar-no-bg" class
	$('.top-content .carousel-caption h1').waypoint(function() {
		$('nav').toggleClass('navbar-no-bg');
	});

    /*
        Background slideshow
    */
    $('.section-4-container').backstretch("assets/img/pexels-pixabay-531972.jpg");

    /*
	    Wow
	*/
	new WOW().init();

});
