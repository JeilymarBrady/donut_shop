/* ***************************
  Code from CSS-Tricks Forum
  author:  Chris McClean
  http://wheelercentral.net
***************************** */

$(document).ready(function() {
   $('a[href*=#]').bind('click', function(e) {
  e.preventDefault(); //prevent the "normal" behaviour which would be a "hard" jump

  var target = $(this).attr("href"); //Get the target

  // perform animated scrolling by getting top-position of target-element and set it as scroll target
  $('html, body').stop().animate({ scrollTop: $(target).offset().top - 80}, 1500, function() {
       location.hash = target; //attach the hash (#jumptarget) to the pageurl
  });

  return false;
   });
});
