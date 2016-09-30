$(function() {
	var $vList = $('.v-list'),
		$li = $vList.find('li'),
		$videoBox = $('.player-box'),
		$myVideo = $('#my-video'),
		$videoImg = $('#video-img'),
		$loading = $videoBox.find('.loading'),
		$controls = $('.player-controls'),
		$playBtn = $videoBox.find('.play-btn'),
		$timeupdate = $('.timeupdate'),
		$duration = $('.duration'),
		$fullScreen = $('.full-screen'),
		$playingBtn = $timeupdate.find('b'),
		$playerBar = $timeupdate.find('span'),
		$stime = $('.stime'),
		$etime = $('.etime'),
		video, timer;
	var data = {
		vurl: [$myVideo.attr('data-url')],
		index: $myVideo.attr('data-index'),
		vimg: $videoImg.attr('src')
	};

	$vList.on('click','li', switchV);

	function switchV(event) {
		document.body.scrollTop = 0;
		var index = $(this).attr('data-index');
		var vurl = $(this).attr('data-url');
		var vimg = $(this).attr('data-img');
		var currentData = {
			vurl: [vurl],
			vimg: vimg
		};
		$(this).addClass('active');
		myVideo(currentData);
	}

	// 播放器按钮
	$playBtn.on('tap', function(event) {
		if (video) {
			canplay.call();
			return false;
		}
		myVideo(data);
		event.stopPropagation();
	});

	function formatTime(time, forceHours, showFrameCount, fps) {
		if (typeof showFrameCount == 'undefined') {
			showFrameCount = false;
		} else if (typeof fps == 'undefined') {
			fps = 25;
		}
		var hours = Math.floor(time / 3600) % 24,
			minutes = Math.floor(time / 60) % 60,
			seconds = Math.floor(time % 60),
			frames = Math.floor(((time % 1) * fps).toFixed(3)),
			result = ((forceHours || hours > 0) ? (hours < 10 ? '0' + hours : hours) + ':' : '') + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds) + ((showFrameCount) ? ':' + (frames < 10 ? '0' + frames : frames) : '');
		return result;
	}


	var controlsH = 90;
	function showControls() {
		clearTimeout(timer);
		$controls.css({height: controlsH });
		timer = setTimeout(function() {
			$controls.css({height: 0 });
		}, 5000);
	}

	function togglePlay() {
		if(video.paused) {
			video.play();
			showControls();
			$playBtn.addClass('pause');
			$loading.hide();
		}
		else {
			video.pause();
			showControls();
			$playBtn.removeClass('pause');
		}
	}

	function canplay() {
		var currentTime = 0, duration = 0;
		togglePlay();
		video.played.length == 0 && $loading.show();
		video.addEventListener('canplay', function() {
			$loading.hide();
			$videoImg.hide();
			$etime.text(formatTime(this.duration));
		}, false);

		video.addEventListener('timeupdate', function() {
			currentTime = this.currentTime;
			duration = this.duration;
			$playerBar.css({
				width: (currentTime / duration) * 100 + '%'
			});
			$playingBtn.css({
				left: (currentTime / duration) * 100 + '%'
			});
			$stime.text(formatTime(currentTime));
			$etime.text(formatTime(duration));
		}, false);

		video.addEventListener('ended', function() {
			$playBtn.show();
			$playerBar.css({width: '0%'});
			$playingBtn.css({left: '0%'});
			$controls.css({height: controlsH });
			$playBtn.removeClass('pause');
			$duration.find('span').eq(0).text('00:00');
			if(video.webkitExitFullScreen) {
				video.webkitExitFullScreen();
			}
		}, false);

		$fullScreen.on('tap', function() {
			video.webkitEnterFullscreen();
		});
		video.addEventListener('webkitfullscreenchange', function(e) {
			if(!document.webkitIsFullScreen) {
				togglePlay();
			}
		}, false);

		var ix = 0, per;
		$playingBtn.on('touchstart', function(event) {
			var touch = event.touches[0];
			ix = touch.clientX - this.offsetLeft;
		});
		$playingBtn.on('touchmove', function(event){
			var touch = event.touches[0];
			var dx = touch.clientX - ix;
			per = dx / $timeupdate.width();
			if(per <= 0) {
				per = 0;
			}
			else if(per >= 1) {
				per = 1;
			}
			video.pause();
			$(this).css({left: per * 100 + '%' });
			$playerBar.css({width: per * 100 + '%' });
			showControls();
		});
		$playingBtn.on('touchend', function(event) {
			video.currentTime = per * duration;
			video.play();
			$playBtn.addClass('pause');
		});

		showControls();
	}

	function myVideo(data) {
		var w = $videoBox.width(),
			h = $videoBox.height();
		if (!video) {
			video = document.createElement('video');
			$(video).css({width: w, height: h })
			.attr('x-webkit-airplay', 'allow')
			.attr('webkit-playsinline', true);
			$videoBox.append(video);
		}
		video.src = data.vurl[0];
		$videoImg.attr('src', data.vimg).show();
		canplay.call();
		$(video).on('tap', function() {
			if($controls.height() == 0) {
				showControls();
			}
			else {
				$controls.css({height: 0 });
			}
		});
	}

	var $cancel = $('.cancel'),
		$shareWrap = $('.share-wrap'),
		$shareBox = $('.share-box'),
		$shareBtn = $('.share-btn');
	$shareBtn.on('tap', function() {
		$shareWrap.show();
		setTimeout(function() {
			$shareBox.css({bottom: 0});
		}, 100);
	});
	$cancel.on('tap', function() {
		$shareBox.css({bottom: -$shareBox.height()});
		setTimeout(function() {
			$shareWrap.hide();
		}, 400);
	});
});