(function() {
    var swiper = new Swiper ('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });

    function dataList () {
        var $table1 = $('.table-1'),
            $table1Tr = $table1.find('tr'),
            $listBox = $('.list-box'),
            status = false,
            defaultNum = 10,
            $table2 = $('.table-2'),
            $table2Td = $table2.find('td'),
            $showMoreBtn = $('#show-more-btn'),

            btnText = ['收起', '点击展开全部球员'],

            switchOption = function () {
                var $span = $(this).find('span');

                $table2Td.find('span').removeClass('active');
                $span.addClass('active');
                //ajax
            },

            toggleData = function () {
                if (!status) {
                    status = true;
                    $table1Tr.show();
                    $showMoreBtn.html(btnText[0]);
                }
                else {
                    status = false;
                    hideData();
                    $showMoreBtn.html(btnText[1]);
                }
            },

            hideData = function () {
                $table1Tr.each(function(i) {
                    if (i > defaultNum) $(this).hide();
                });
            },

            init = function () {
                hideData();
                $table2Td.on('tap', switchOption);
                $showMoreBtn.on('tap', toggleData);
            };

        return init;
    }

    var datalist = dataList();
    datalist();
})();