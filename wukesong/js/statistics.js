(function() {
    var $scrollWraper = $('.scroll-wraper'),
        $tabs = $('#tabs'),
        $li = $tabs.children('li'),
        $tabContent = $('.tab-content'),
        $videoBox = $('.player-box'),
        $playBtn = $videoBox.find('.play-btn'),
        $wraper = $('.wraper'),
        $vList = $('.v-list'),
        $loadingMore = $('.loading-more'),
        $loadingMoreLabel = $('.loading-more-label');

    $scrollWraper.each(function() {
        var $tableData = $(this).find('.table-data'),
            $tableDataTr = $tableData.find('tr'),
            $tableDataTd = $tableData.find('td'),
            wraperHeight = $tableDataTr.length * ($tableDataTd.height());
        $(this).height(wraperHeight);
    });

    $tabContent.eq(1).hide();
    $li.on('tap', function() {
        var video = document.getElementsByTagName('video');
        var idx = $(this).index();
        if (video.length) {
            video[0].src = video[0].src;
            video[0].pause();
            $playBtn.removeClass('pause');
        }

        $(this).addClass('active').siblings().removeClass('active');
        $tabContent.hide().eq(idx).show();
        if (idx === 1) {
            $wraper.addClass('drag-wraper');
        } else {
            $wraper.removeClass('drag-wraper');
        }
    });


    var ajax = function () {
        $.ajax({
            url: 'https://randomuser.me/api/',
            dataType: 'json',
            success: function(result) {
                var data = {
                    vurl: './images/video/JzMSLrpXYks8hUbOvjyMfw__.mp4',
                    vimg: './images/video/player.jpg',
                    img: './images/video/v1.jpg',
                    userimg: './images/video/v1.jpg',
                    username: '我是阿正',
                    comment: '这添球手感真好！！',
                    time: '10月22日 10:22'
                };
                addItem(data);
                $loadingMoreLabel.html('点击加载更多');
            }
        });
    },
    addItem = function (data) {
        var template = '<li data-url="'+ data.vurl +'" data-img="'+ data.vimg +'" class="newitem">'+
                '<img src="'+ data.img +'">' +
                '<div class="v-content">' +
                    '<div class="item1">' +
                        '<img src="'+ data.userimg +'">' +
                        '<span>'+ data.username +'</span>' +
                    '</div>' +
                    '<div class="item2">'+ data.comment +'</div>' +
                    '<div class="item3">'+ data.time +'</div>' +
                '</div>' +
            '</li>';
        $vList.append(template);
        adaptUILayout.adapt(750);
    };
    $loadingMore.on('tap', function () {
        $loadingMoreLabel.html('正在加载中...');
        ajax();
    });
})();