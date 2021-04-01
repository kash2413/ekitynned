/**
 * Copyright 2014 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
 
 var NUMBER_OF_PARAGRAPHS=4,AD_PLACEMENT_PERCENT=5,$article=$(".article-wrapper"),paragraphs=$article.find("p").length,brs=$article.find("br").length,placementIndex=paragraphs>brs?paragraphs:brs,pOrBr=paragraphs>brs?"p":"br",invideo='<div id="videopwp"></div><div id=ind-vid><video muted playsinline id="content_video" class="video-js vjs-default-skin" controls preload="auto" width="640" height="360"></video><div id="simple-close-button"></div></div>',placepercent1=0, placepercent=Math.round(placementIndex*AD_PLACEMENT_PERCENT/100);$(invideo).insertAfter($article.find(pOrBr).eq(placepercent1)),createWaypoint();var elementOffset=$("#ind-vid").offset().top,Adwidth=$("#ind-vid").width(),Adratio=(Adwidth/1.75).toFixed()-7,Adheight=$("#ind-vid").height();$("#content_video").css({height:Adratio}),$("#ind-vid").css({height:Adratio});var NewWidth=1/640*$(".article-wrapper").width();function createWaypoint(){new Waypoint({element:document.getElementById("videopwp"),handler:function(e){"down"===e&&($(".vjs-big-play-button").trigger("click"),this.destroy())},offset:"130%"})};$(window).resize(function(){if( $('#ind-vid').length ) {var e=$("#ind-vid").offset().top,t=($("#ind-vid").width()/1.75).toFixed()-7;$("#ind-vid").height();$("#content_video").css({height:t}),$("#ind-vid").css({height:t});var i=1/640*$(".article-wrapper").width()}}),$("#simple-close-button").click(function(){$("#ind-vid, #640x360").animate({height:0},1e3,function(){$('#320x50_top').css({'margin-left':'0px'}); $('#ind-vid, #640x360').css({'visibility':'hidden'}); /*$("#ind-vid, #640x360").remove()*/})});
$(document).ready( function() { 

if (screen.width <= 668)
{$("#simple-close-button").css({"width":"40px","height":"40px","left":"0px","top":"0px","background-size":"55%","background-repeat":"no-repeat"}).after('<div id="640x360" style="right: 0px; width: 100%; height: 100%; position: absolute; top: 0px; z-index: 10000; overflow: hidden; display: none"></div>'); 
$(".ima-controls-div").css("opacity","0"); 
$(".vjs-loading-spinner").css("display","none");
$("#content_video iframe:first").css("height","120%");
var waypoint = new Waypoint({element: document.getElementById("videopwp"),handler: function(down) 
{vadh=$("#ind-vid").height(); $("#videopwp").css({"height":vadh, "margin-bottom":"20px"}), $("#ind-vid").css({"position":"fixed","height":"","bottom":"0%","right":"0%","width":"100%","z-index":"10000000", "margin-bottom": "0px"}), $("#content_video").css({"height":"225px"});  if ($('#ind-vid').length) {$("#cookie-bar").css({"display":"none"})}; if ($('#ind-vid').length && $("#320x50_top").css("position")==="fixed"){$("#320x50_top").css({"margin-left":"110vh"})};
this.destroy();},offset: -200}) 
} else {
var waypoint = new Waypoint({element: document.getElementById("videopwp"),handler: function(down) 
{vadh=$("#ind-vid").height(); $("#videopwp").css({"height":vadh, "margin-bottom":"20px"}), $("#ind-vid").css({"position":"fixed","height":"","bottom":"0%","right":"0%","width":"400px","z-index":"10000000"}); $("#content_video").css({"height":"225px"});
this.destroy();},offset: -200})
}
});
 

var player = videojs('content_video');


player.ima(options);

// Remove controls from the player on iPad to stop native controls from stealing
// our click
var contentPlayer =  document.getElementById('content_video_html5_api');
if ((navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/Android/i)) &&
    contentPlayer.hasAttribute('controls')) {
  contentPlayer.removeAttribute('controls');
}

// Initialize the ad container when the video player is clicked, but only the
// first time it's clicked.
var startEvent = 'click';
if (navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/Android/i)) {
  startEvent = 'touchend';
}


//Request ads only after the CMP has been loaded and the user has given consent
__tcfapi('addEventListener', 2, function(tcData, success) {
 if (success && tcData.gdprApplies) {
 if (tcData.eventStatus === 'tcloaded') {
player.ima.requestAds();
 } else if (tcData.eventStatus === 'useractioncomplete') {
player.ima.requestAds();
 }
 }
})


player.one(startEvent, function() {
    player.ima.initializeAdDisplayContainer();
    player.play();
});
