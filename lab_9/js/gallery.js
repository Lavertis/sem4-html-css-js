$(document).ready(function () {
    $('.photo>a').attr('data-lightbox', 'gallery').each(function (index) {
        const value = `Obraz ${++index}`;
        $(this).attr('data-title', value)
    })
});