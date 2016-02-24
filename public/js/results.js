var $menuDarkOverlay, $filterOverlay;

function showFilterOverlay() {
    $menuDarkOverlay.show().animate({
        opacity: 0.5
    }, 500);

    $filterOverlay.show();

    $menuDarkOverlay.one('click', hideFilterOverlay);
}

function hideFilterOverlay() {
    $menuDarkOverlay.animate({
        opacity: 0
    }, 500, function () {
        $menuDarkOverlay.hide();
    });

    $filterOverlay.hide();
}

$(document).ready(function () {
    $menuDarkOverlay = $('#menu-dark-overlay');
    $filterOverlay = $('#filter-overlay');

    $('#filter-container').on('click', showFilterOverlay);

    var $checkin = $('#checkin');
    var $checkinInput = $checkin.children('input');
    var $checkinDateBox = $checkin.children('.date-box');

    $checkinInput.datepicker({});

    $checkinDateBox.on('click', function (event) {
        $checkinInput.datepicker('show');
    });

    var $checkout = $('#checkout');
    var $checkoutInput = $checkout.children('input');
    var $checkoutDateBox = $checkout.children('.date-box');

    $checkoutInput.datepicker({});

    $('#apply-filter').on('click', hideFilterOverlay);

    $checkoutDateBox.on('click', function (event) {
        $checkoutInput.datepicker('show');
    });
});
