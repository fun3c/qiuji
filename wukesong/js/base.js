(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth,
                defalutSize = 24, fontsize;
            if (!clientWidth) return;
            fontsize = 12 * (clientWidth / 320);
            fontsize = fontsize > defalutSize ? defalutSize : fontsize;
            docEl.style.fontSize = fontsize + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);