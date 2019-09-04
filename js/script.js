//code for loader, and first part of isotope,the reason isotope is here is to fix a bug that picures overlap
$(window).on("load", function() {
  $(".loader").fadeOut(500);

  $(".items").isotope({
    filter: '*',  //means filter starts from the element with data-filter="*"
    animationOptions: {
      duration: 1500,
      easing: 'linear',
      queue: false
    }
  });
});


//this makes sure the code will be executed when the document (the page) is ready
$(document).ready(function() {
  $('#slides').superslides({
    animation: 'fade',
    play: 5000,
    pagination: false
  }); //start the super slider, the parameter in superslides() is the options

  var typed = new Typed('.typed', {
    strings: ["Software Engineer.", "Web Developer.", "Student."],
    typeSpeed: 70,
    loop: true,
    startDelay: 1000,
    showCursor: false
  }); //typed js, first element is the selector to choose which element to be typed js, then the second parameter is the options

  $('.owl-carousel').owlCarousel({
    loop:true,
    items: 4,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive:{  //set how many items to show when the screen is at certain size
        0:{
            items:1
        },
        480:{
            items:2
        },
        768:{
            items:3
        },
        938:{
          items: 4
        }
    }
  });   //for owl carousel

  let skillsTopOffset = $(".skillsSection").offset().top;  //to make a jQuery object of the skillsSection offset top, the pixel distance from the top of the website to the top of the skillsSection
  // console.log(skillsTopOffset);  //this will print the position number in pixel 1368, the pixel distance from the top of the entire webpage to the top of the skillsSection
  let statsTopOffset = $(".statsSection").offset().top;
  let countUpFinished = false;  //to let the countup in statsSection only trigger once
  $(window).scroll(function() {  //this means when the window scrolls, it will execute the funciton()
    // console.log(window.pageYOffset);  //window.pageYOffset is the pixel distance from the top of the entire webpage to the top of the current window screen (scrolled down)
    // console.log($(window).height());  //.height() returns the height of the window screen
    if(window.pageYOffset > skillsTopOffset - $(window).height() + 200) {

      $('.chart').easyPieChart({
        easing: 'easeInOut',
        barColor: '#fff',
        trackColor: false,
        scaleColor: false,
        lineWidth: 4,
        size: 152,
        onStep: function(from, to, percent) {  //the animation of number increase as the circle line moves
          $(this.el).find('.percent').text(Math.round(percent));
        }
      }); //for easy pie chart

    }

    if(!countUpFinished && window.pageYOffset > statsTopOffset - $(window).height() + 200) {

      countUpFinished = true;
      $(".counter").each(function() {
        let element = $(this);
        let endVal = parseInt(element.text());
        element.countup(endVal);
      });

    }


  });

  $("[data-fancybox]").fancybox();  //all you need to set up fancybox

  $("#filters a").click(function() {  //for the isotope, the first part of isotope code is at the top
    $("#filters .current").removeClass("current");  //remove the current class
    $(this).addClass("current");

    let selector = $(this).attr("data-filter");

    $(".items").isotope({
      filter: selector,  //means filter changes to the one clicked
      animationOptions: {
        duration: 1500,
        easing: 'linear',
        queue: false
      }
    });

    return false;  //return false in click listener means don't do anything else, because this is an <a>, it will go to the top of home page as default action even you didn't put any href
  });

  $("#navigation li a").click(function(e) {  //smooth transition to the section when click on navbar, instead of teleporting, parameter e is to prevent the default action of <a>
    e.preventDefault();  //prevent the <a> to go to the section by default action, then we can make our way there in our way
    let targetElement = $(this).attr("href");
    let targetPosition = $(targetElement).offset().top;
    $("html, body").animate({scrollTop: targetPosition - 50}, "slow");  //the jQuery animation
  });

  const nav = $("#navigation");
  const navTop = nav.offset().top;
  $(window).on("scroll", stickyNavigation);
  function stickyNavigation() {
    let body = $("body");
    if($(window).scrollTop() >= navTop) {  //$(window).scrollTop() is just like window.pageYOffset
      body.css("padding-top", nav.outerHeight() + "px"); //add a padding to the website top by the same height as the navbar so the window won't bruptly jump when the navbar becomes position fixed, because this is when the navbar's position is not taken into account by the other elements
      body.addClass("fixedNav");
    } else {
      body.css("padding-top", 0);  //remove the padding at the website top when the navbar cancel position fixed
      body.removeClass("fixedNav");
    }
  }
});
