$(document).ready(function () {
    blueimp.Gallery(
        document.getElementById('links').getElementsByTagName('a'),
        {
            container: '#view-img',
            carousel: true
        }
    );
});