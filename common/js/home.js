$(document).ready(function(){
	
	
	/* Function to read and load bites scroller*/
	
	function bitesAnimation(currentIndex, bitesLength, performAutoScroll)
	{
		// scroller indicator Base marginLeft = 5px
		scrollerIndicatorLeft = 5;
		if(currentIndex >= bitesLength){
			currentIndex = 0;
		}
		scrollerIndicatorLeft += (currentIndex * 17);
		$("#dpBitesScrollerPositionIndicator").stop().animate(
		{
			marginLeft: scrollerIndicatorLeft
		},100);
		
		$("#dpBiteDiv-"+currentIndex).fadeIn(800,function(){
			if(performAutoScroll){
				$(this).delay(2000).fadeOut(800,function (){
					currentIndex++;
					bitesAnimation(currentIndex, bitesLength, performAutoScroll);
				});
			}
		});
		
	}
	
	$.get("resources/bites/index.html", function(data){
		$newBitesCanvas = $(data).appendTo("#dpBitesCanvas");
		$.each($(".dpBiteDiv"), function( index, value){
			$("#dpBitesScrollerContainer").append("<div class=\"dpBitesScrollerController\"></div>");
		});
		$(".dpBitesScrollerController").click(function(){
			// add click action for scroller controller here because scroller objects are created dynamically
			$(".dpBiteDiv").stop(true, true);
			$(".dpBiteDiv").hide();
			// stop Animation after someone clicks, let him take control
			bitesAnimation($(".dpBitesScrollerController").index(this), $(".dpBitesScrollerController").size(), false);
		});
		bitesAnimation(0, $(".dpBiteDiv").size(), true);
	});
	

	/* Function to scroll the page
	 * https://code.google.com/p/jquery-nicescroll/
	*//*
	$("html").niceScroll({
		"cursorwidth":"8px",
		"cursorcolor": "#111",
		"cursorborder":"0px solid #fff"
	});*/
	
	/* Key press handles*/
	$('html, body').keydown(function(event){
		if ((event.which == 27)){
			// on ESC, close iframe
			event.preventDefault();
			$("#dpCustomIframeMasterContainer").css("display","none");
		}
	});
	
	$("#dpIframe").click(function(event){
		if(event.srcElement.id == "dpIframe"){
			// if the event is propogated from inside the iFrame content don't close the Iframe
			$("#dpCustomIframeMasterContainer").css("display","none");
		}
	});
	
	/* Function to link iframe src*/
	$(".linkIframeClass").click(function(){
		$("#dpIframeAlienContent").load("pages/"+this.id+"/index.html");
		$("#dpCustomIframeMasterContainer").css("display","block");
	});
	
	/* Functions to set the Iframe Background height
	*/
	$("#dpIframe").height($(window).height());
	$("#dpCustomIframeMasterContainer").height($("#dpFooter").offset().top + 350 + 10);
	/* Functions to close the Iframe
	*/
	
	
	$("#dpIframeCloseButton").click(function(){
		$("#dpCustomIframeMasterContainer").css("display","none");
	});
	
	/* Function to alter category menu styles
	*/
	$("#dpHeaderCategoryContainer > div").hover(function(){
		$(this).find('div').css("background-position","0px -38px");
		$(this).find('p').css("color","#0f1113");
	},function(){
		$(this).find('div').css("background-position","0px 0px");
		$(this).find('p').css("color","#ffffff");
	});
	
	/* Function for Dinesh Prasanth title animations*/
	$("#dpNameInnerContainer").hover(function(){
		$(this).css("background-position","0px -45px");
	},function(){$(this).css("background-position","0px 0px");});
	
	/* Function for Social link (cup) animations*/
	$("#dpSocialLink > div").hover(function(){
		$(this).css("background-position","0px -80px");
	},function(){
		$(this).css("background-position","0px 0px");
	});
	
	/* Functions for category tile animations*/
	// Category tile description values 'top' and how much to translate
	var categoryTileTopValueMap = {
		"#dpProjects":{"top":"125px","alterTop":"-=10px"},
		"#dpDesign":{"top":"137px","alterTop":"-=10px"},
		"#dpAchievements":{"top":"115px","alterTop":"-=10px"},
		"#dpWebDev":{"top":"127px","alterTop":"-=10px"},
		"#dpPublications":{"top":"130px","alterTop":"-=10px"},
		"#dpArtWorks":{"top":"127px","alterTop":"-=10px"}
	};
	$.each(categoryTileTopValueMap, function(key, val){
		// move the background slowly
		$(key).hover(function(){
			$(key).stop().animate(
			{
				backgroundPosition:"-20px -30px"
			}, 200);
			categoryTileDescrAnimate($(key).find('div'), val.alterTop)
		}
		,function(){
			//	move the background back fastly
			$(key).stop().animate(
			{
				backgroundPosition:"0px -60px"
			}, 100);
			categoryTileDescrAnimateRevert($(key).find('div'), val.top)
		});
	});
	function categoryTileDescrAnimate(view, topAlterValue){
		// move the background slowly
		view.stop().animate(
		{
			top:topAlterValue
		},100);
		view.textDecoration='underline';
	}
	function categoryTileDescrAnimateRevert(view, topOriginalValue){
		//	move the background back fastly
		view.stop().animate(
		{
			top:topOriginalValue
		},100)
	}
	$("#projectsPageCategoryInnerContainer > div").click(function(){
		var finalWidth = -1 * ($("#projectPageDescriptionGeneral").width() + 60) * ($("#projectsPageCategoryInnerContainer > div").index(this) + 1);
		$("#projectPageDescriptionScroll").stop().animate(
		{
			marginLeft: finalWidth
		},100);
	});
	
	$(".popupSliderLeftPointer").live('click',function(){
		var parentContainer = $(this).parent();
		var slider = parentContainer.children(".popUpSliderBox");
		var newMarginLeft = ((parseInt(slider.css('margin-left'))/parentContainer.width()) + 1) * parentContainer.width();
		if(newMarginLeft>0)
			return;
		slider.stop().animate(
		{
			marginLeft: newMarginLeft
		},50);
	});
	$(".popupSliderRightPointer").live('click',function(){
		var parentContainer = $(this).parent();
		var slider = parentContainer.children(".popUpSliderBox");
		var newMarginLeft = ((parseInt(slider.css('margin-left'))/parentContainer.width()) - 1) * parentContainer.width();
		if(newMarginLeft<(-1 * (slider.children().length -1)*parentContainer.width()))
			return;
		slider.stop().animate(
		{
			marginLeft: newMarginLeft
		},50);
	});
	$("#webdevContentContainer > div").hover(function(){
		$(this).find('div').fadeIn(200);
	},function(){
		$(this).find('div').fadeOut(200);
	});
	
	$("#fixedSideCategorySelectContainer > div").click(function(){
		highlightSideCategorySelect(this.id.slice(-1));
	});
	
	$("#fixedSideCategorySelectContainer > div").hover(function(){
		$(this).find('p').css("display","block");
	},function(){
		$(this).find('p').css("display","none");
	});
	
	$(".timelineEventBanner").hover(function(){
		$(this).css("background-size","120%");
		$(this).parent().find(".eventDescription").stop().fadeIn(100);
	},function(){
		$(this).css("background-size","100%");
		$(this).parent().find(".eventDescription").stop().fadeOut(100);
	});
	
	$("#timelineSliderLeft").click(function(){
		var timelineContainer = $("#timelineEventContainer");
		var newMarginLeft = parseInt(timelineContainer.css('margin-left')) + parseInt($(".timelineQuaterContainer").width());
		if(newMarginLeft>0)
			return;
		timelineContainer.stop().animate(
		{
			marginLeft:  newMarginLeft
		},100);
	});
	
	$("#timelineSliderRight").click(function(){
		var timelineContainer = $("#timelineEventContainer");
		var newMarginLeft = parseInt(timelineContainer.css('margin-left')) - parseInt($(".timelineQuaterContainer").width());
		if(newMarginLeft<(timelineContainer.parent().width()-timelineContainer.width()))
			return;
		timelineContainer.stop().animate(
		{
			marginLeft:  newMarginLeft
		},100);
	});
	
});