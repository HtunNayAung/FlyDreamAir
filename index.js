$(document).ready(function() {
    $("#departure").datepicker({
        minDate: 0
    });

    $("#return").datepicker({
        minDate: 0
    });

    $('input[type="radio"]').change(function() {
        if ($(this).val() === 'One Way') {
            $('#return').prop('disabled', true).val('N/A');
        } else {
            $('#return').prop('disabled', false).val('');
        }
    });

    $('#searchButton').click(function(event) {
        var origin = $('#origin').val();
        var destination = $('#destination').val();
        var departureDate = $('#departure').val();
        event.preventDefault();
        var queryParams = `flights.html?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&departureDate=${encodeURIComponent(departureDate)}`;
        window.location.href = queryParams;
    });

    
});



