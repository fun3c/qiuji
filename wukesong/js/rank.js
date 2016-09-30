(function() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    }),
    $table1 = $('.table-1'),
    $name = $table1.find('.name');
    $name.on('click', function() {
        alert(this);
        return false;
    });
})();