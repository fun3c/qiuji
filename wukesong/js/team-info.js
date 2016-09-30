(function() {
    var $plateModule = $('.plate-module'),
        $plateModuleLi = $plateModule.find('li');
        $plateModuleLi.on('click', function() {
            var url = $(this).attr('data-url');
            location.href = url;
        }),
        $plateTable = $('.plate-table'),
        $li = $plateTable.find('li'),
        len = $li.length;

        if(len % 2 === 0) {
            $li.eq(len-1).css({borderBottom: 0});
            $li.eq(len-2).css({borderBottom: 0});
        }
        else {
            $li.eq(len-1).css({borderBottom: 0});
        }
})();