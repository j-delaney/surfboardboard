$(document).ready(function () {
    function makeInput($element) {
        var $container = $('<div class="input-group">'+
            '<input type="text" class="form-control">'+
            '<div class="input-group-addon"><i class="fa fa-check"></i></div>' +
            '</div>');

        var $input = $container.find('input');

        // See whether the user has set this once already.
        if ($element.hasClass('edited')) {
            $input.val($element.text())
        }

        var placeholder = $element.data('placeholder');
        $input.attr('placeholder', placeholder);

        return $container;
    }

    function makeTextarea($element) {
        var $container = $('<div class="input-group">'+
            '<textarea class="form-control"></textarea>'+
            '<div class="input-group-addon"><i class="fa fa-check"></i></div>' +
            '</div>');

        return $container;
    }

    function bindEditingEvents($container) {
        var $doneButton = $container.find('.input-group-addon');

        $doneButton.on('click', function (event) {
            event.preventDefault();
            var $parent = $(this).closest('.editable');
            var $input = $parent.find('input,textarea');

            var val = $input.val().trim();

            $parent.removeClass('editing');

            if (val === '') {
                $parent.text('Tap to edit').addClass('edit');
            } else {
                $parent.addClass('edited').text(val);
            }

        });
    }

    $('.editable').on('click', function (event) {
        if ($(event.target).hasClass('input-group-addon') || $(event.target).hasClass('fa-check')) {
            return;
        }
        if ($(this).hasClass('editing')) {
            return;
        }

        var $container;
        if ($(this).hasClass('textarea')) {
            $container = makeTextarea($(this));
        } else {
            $container = makeInput($(this));
        }
        bindEditingEvents($container);

        $(this).removeClass('edit').removeClass('edited').addClass('editing');
        $(this).html('').append($container);
        $container.find('input,textarea').focus();
    });

    function shake($e) {
        $e.css('transform', 'rotate(5deg)');
        setTimeout(function () {
            $e.css('transform', 'rotate(-5deg)');
            setTimeout(function () {
                $e.css('transform', 'rotate(5deg)');
                setTimeout(function () {
                    $e.css('transform', 'rotate(-5deg)');
                    setTimeout(function () {
                        $e.css('transform', 'rotate(0deg)');
                    }, 50);
                }, 50);
            }, 50);
        }, 50);
    }

    $('#post-listing').on('click', function (event) {
        var done = true;

        $('.editable').each(function (index, $element) {
            if ($(this).hasClass('edit') || $(this).hasClass('editing')) {
                done = false;
                shake($(this));
            }
        });

        if (done) {
            var data = {
                title: $('#set-title').text().trim(),
                desc: $('#set-desc').text().trim(),
                price: $('#set-price').text().trim(),
                address: $('#set-location').text().trim(),
                holds: 2
            };

            $.post('/api/list', data, function (response, textStatus) {
                var id = response.id;
                window.location.href = '/list-gear/listing-confirmation/' + id;
            });
        }
    });
});