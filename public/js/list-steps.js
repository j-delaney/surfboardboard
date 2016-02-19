$(document).ready(function () {
    $stepsA = $('#steps').children('a');

    function hideAllDroppers() {
        $stepsA.each(function (index, elem) {
            var $a = $(elem);

            $a.children('.dropper').hide();
        });
    }

    $stepsA.find('input,textarea').on('input', function (event) {
        var val = $(this).val().trim();
        if (val === '') {
            $(this).closest('a').find('i').removeClass('fa-check-square-o').addClass('fa-square-o');
        } else {
            var done = true;
            $stepsA.find('input,textarea').each(function (index, element) {
                if ($(this).val().trim() === '') {
                    done = false;
                }
            });

            $(this).closest('a').find('i').removeClass('fa-square-o').addClass('fa-check-square-o');

            if (done) {
                $('#request-to-rent').show();
            } else {
                $('#request-to-rent').hide();
            }
        }

    });

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

    $('#request-to-rent').on('click', function (event) {
        event.preventDefault();

        $('#request-to-rent').hide();
        var data = {
            title: $('#input-title').val().trim(),
            desc: $('#input-desc').val().trim(),
            price: $('#input-price').val().trim(),
            address: $('#input-address').val().trim(),
            holds: $('#input-holds').val().trim()
        };

        console.log(data);

        $.post('/api/list', data, function (response, textStatus) {
            var id = response.id;
            window.location.href = '/list-gear/listing-confirmation/' + id;
        });
    });
});