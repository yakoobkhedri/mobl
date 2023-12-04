
var portfolio = $('#portfolio-container').isotope({
    originLeft: false
});
$('#portfolio-filter > li').on('click', function () {
    $("#portfolio-filter > li").removeClass('active');
    $(this).addClass('active');
    portfolio.isotope({
        filter: $(this).data('filter')
    });
});