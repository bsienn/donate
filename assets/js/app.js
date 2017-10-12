function clickEventHandler(e) {
    e = e || window.event;
    var target;
    target = e.target || e.srcElement;

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

if (document.attachEvent) { // For older browsers
    document.body.attachEvent('onclick', clickEventHandler);
} else if (document.addEventListener) { // WC3 browsers
    document.body.addEventListener('click', clickEventHandler, false);
}

document.getElementById('customButton').addEventListener('click', function(e) {
    var is_selected = false;
    var aItems = document.querySelectorAll(".select_amount_item");

    for (var i = 0; i < aItems.length; i++) {
        if( aItems[i].className.match(/\bactive\b/) && aItems[i].id !== 'other_option' ) {
            is_selected = true;
            break;
        }
    }

    if(!is_selected && document.getElementById("other_amount").value === '') {
        if(document.getElementById("other_amount_parent").style.display === 'none') {
            document.getElementById("other_amount_parent").style.display = 'block';
            document.getElementById("other_option").className += ' active';
        }

        document.getElementById("other_amount").focus();
        alert('Please select an amount to donate');

        return false;
    }

    // Open Checkout with further options :
    handler.open({
        name: 'Bsienn',
        description: '2 widgets',
        amount: 2000
    });

    e.preventDefault();
});

var handler = StripeCheckout.configure({
    key: 'pk_test_PvaQH5BvPVNZzQ35bC9XxSFF',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function(token) {
    // You can access the token ID with `token.id`.
    // Get the token ID to your server-side code for use.
    }
});
// Close Checkout on page navigation:
window.addEventListener('popstate', function() {
    handler.close();
});

