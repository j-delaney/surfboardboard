$(document).ready(function () {
    $stepsA = $('#steps').children('a');

    function hideAllDroppers() {
        $stepsA.each(function (index, elem) {
            var $a = $(elem);

            $a.children('.dropper').hide();
        });
    }

    $stepsA.on('click', function (event) {
        event.preventDefault();

        hideAllDroppers();
        $(this).children('.dropper').show();

        return false;
    });
});