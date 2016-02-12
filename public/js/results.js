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

    //$('#filter-container').on('click', showFilterOverlay);
});
