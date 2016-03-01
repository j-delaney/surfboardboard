$(document).ready(function () {
    $stepsA = $('#steps').children('.link-list-item');

    $('#input-upload').on('change', function (event) {
        var val = $(this).val().trim();
        if (val === '') {
            $('#upload').text('Add Photo')
        } else {
            $('#upload').text('Photo Uploaded!')
        }
    });

    $('#photos-icon, #upload').on('click', function () {
        $('#input-upload').click();
    });

    function hideAllDroppers() {
        $stepsA.each(function (index, elem) {
            var $a = $(elem);

            $a.children('.dropper').hide();
        });
    }

    $stepsA.find('input,textarea').on('input', function (event) {
        var $container = $(this).closest('a');

        var done = true;
        $container.find('input,textarea,select').each(function () {
            var val = $(this).val().trim();
            if (val === '') {
                done = false;
            }
        });

        if (done) {
            $(this).closest('a').find('i').addClass('fa-check-square-o');
        } else {
            $(this).closest('a').find('i').removeClass('fa-check-square-o');
        }
    });

    $stepsA.on('click', function (event) {
        if (event.target.tagName.toLowerCase() === 'input' ||
            event.target.tagName.toLowerCase() === 'textarea' ||
            event.target.tagName.toLowerCase() === 'select' ||
            event.target.tagName.toLowerCase() === 'option') {
            return;
        }
        event.preventDefault();

        hideAllDroppers();
        var $dropper = $(this).children('.dropper');
        $dropper.show();
        var $inputs = $dropper.find('input,textarea,select');
        if ($inputs.length) {
            $inputs[0].focus();
        }

        return false;
    });

    $('#post-listing').on('click', function () {
        $('form').submit();
    });

    var $error = $('#errors');
    if ($error.length) {
        $.post('/api/track/error', {}, function () {
        });
    }
});