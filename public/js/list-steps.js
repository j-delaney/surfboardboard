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
        var $dropper = $(this).children('.dropper');
        $dropper.show();
        var $inputs = $dropper.find('input,textarea');
        if ($inputs.length) {
            $inputs[0].focus();
        }

        return false;
    });
});