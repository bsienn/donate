function clickEventHandler(e) {
    e = e || window.event;
    var target;
    target = e.target || e.srcElement;

    if (target.className.match(/\bactive\b/)) {
        return false;
    }

    if (target.className.match(/\bselect_amount_item\b/)) {
        if (target.className.match(/\bactive\b/)) {
            return false;
        }

        var select_amount_item = document.querySelectorAll(".select_amount_item.active");

        for (var i = 0; i < select_amount_item.length; i++) {
            var item = select_amount_item[i];
            item.className = item.className.replace('active', '');
        }

        target.className += ' active';

        document.getElementById("other_amount").value = '';
        if (target.id === 'other_option') {
            document.getElementById("other_amount_parent").style.display = 'block';
            document.getElementById("other_amount").focus();
        } else {
            document.getElementById("other_amount_parent").style.display = 'none';
        }
    }
}

if (document.body.addEventListener) {
    document.body.addEventListener('click', clickEventHandler, false);
} else {
    document.body.attachEvent('onclick', clickEventHandler); //for IE
}
