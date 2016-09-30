(function() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    }),
    $tabs = $('#tabs'),
    $li = $tabs.children('li'),
    $tabContent = $('.tab-content')
    $tabContent.eq(1).hide();
    $li.on('tap', function() {
        $(this).addClass('active').siblings().removeClass('active');
        $tabContent.hide().eq($(this).index()).show();
    }),
    $plateModule = $('.plate-module'),
    $li = $plateModule.find('li');
    $li.on('click', function() {
        alert(this);
    });
})();