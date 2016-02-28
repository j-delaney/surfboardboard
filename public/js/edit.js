$(document).ready(function () {
    function makeInput($element) {
        var $container = $('<div class="input-group">'+
            '<input type="text" class="form-control">'+
            '<div class="input-group-addon"><i class="fa fa-check"></i></div>' +
            '</div>');

        var $input = $container.find('input');

        // See whether the user has set this once already.
        if ($element.hasClass('edit-done')) {
            $input.val($element.text())
        }

        var placeholder = $element.data('placeholder');
        $input.attr('placeholder', placeholder);

        var type = $element.data('type');
        if (type) {
            $input.attr('type', type);
        }

        return $container;
    }

    function makeTextarea($element) {
        var $container = $('<div class="input-group">'+
            '<textarea class="form-control"></textarea>'+
            '<div class="input-group-addon"><i class="fa fa-check"></i></div>' +
            '</div>');

        var $textarea = $container.find('textarea');

        var placeholder = $element.data('placeholder');
        $textarea.attr('placeholder', placeholder);

        return $container;
    }

    function bindEditingEvents($container) {
        var $doneButton = $container.find('.input-group-addon');

        $doneButton.on('click', function (event) {
            event.preventDefault();
            var $parent = $(this).closest('.editable');
            var $input = $parent.find('input,textarea');

            var val = $input.val().trim();

            $parent.removeClass('edit-in-progress');

            if (val === '') {
                $parent.text($parent.data('default')).addClass('edit-undone');
            } else {
                $parent.addClass('edit-done').text(val);
            }

        });
    }

    /**
     * Finds all edits in progress and automatically finishes them.
     */
    function finishInProgress() {
        $('.edit-in-progress').each(function () {
            $(this).find('.input-group-addon').click();
        });
    }

    $('.editable').on('click', function (event) {
        if ($(event.target).hasClass('input-group-addon') || $(event.target).hasClass('fa-check')) {
            return;
        }
        if ($(this).hasClass('edit-in-progress')) {
            return;
        }

        finishInProgress();

        var $container;
        if ($(this).hasClass('textarea')) {
            $container = makeTextarea($(this));
        } else {
            $container = makeInput($(this));
        }
        bindEditingEvents($container);

        $(this).removeClass('edit-undone').removeClass('edit-done').addClass('edit-in-progress');
        $(this).html('').append($container);
        $container.find('input,textarea').focus();
    }).each(function () {
        $(this).addClass('edit-undone');
        $(this).text($(this).data('default'));
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
        finishInProgress();

        var done = true;

        $('.editable').each(function (index, $element) {
            if ($(this).hasClass('edit-undone') || $(this).hasClass('edit-in-progess')) {
                done = false;
                shake($(this));
            }
        });

        if (done) {
            var data = {};
            $('.editable').each(function (index, $element) {
                data[$(this).data('field')] = $(this).text().trim();
            });

            $.ajax({
                type: 'POST',
                url: '/api/create/tent',
                data: data,
                success: function (response, textStatus) {
                    var id = response.id;
                    window.location.href = '/list-gear/listing-confirmation/' + id;
                },
                error: function (response, textStatus) {
                    if (response.status === 401) {
                        return alert('You must be logged in');
                    }
                    console.log(response);
                }
            });
        }
    });
});