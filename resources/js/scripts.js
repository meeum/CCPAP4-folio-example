

// open mobile nav

/*

here's a comment

*/


// open mobile menu

$('.nav-prompt').click(function () {

  // this changes the 'aria-expanded' attribute, which then triggers CSS to open and close the nav
  if ($('.nav-inner').attr('aria-expanded') == 'false') {
    $('.nav-inner').attr('aria-expanded', 'true');
  } else {
    $('.nav-inner').attr('aria-expanded', 'false');
  };

  // this changes the text on the button, so it's obvious what to do
  if ($('.nav-prompt').text() == 'Open Navigation') {
    $('.nav-prompt').text('Close Navigation');
  } else {
    $(".nav-prompt").text("Open Navigation");
  }
})


// nav active class

function activeMenu() {
  var url = window.location.href;

  $('.nav-inner a').filter(function () {
    return this.href == url;
  }).addClass('active');
}

activeMenu();


// image gallery
function imageGallery() {
  // if there's no image gallery, do nothing.
  if (!$('.image-gallery').length) {
    return;
  }
  $('.image-gallery a').simpleLightbox();
}

imageGallery();



//iframe


function iframeFix() {
  $("iframe").wrap('<div class="iframe-container"></div>');
}

iframeFix();