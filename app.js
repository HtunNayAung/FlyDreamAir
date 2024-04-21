$(document).ready(function() {
    $("#departure").datepicker({
        minDate: 0
    });
});

$(document).ready(function() {
    $("#return").datepicker({
        minDate: 0
    });
});

$(document).ready(function() {
    console.log($(this).val());
    $('input[type="radio"]').change(function() {
        console.log($(this).val());
        if ($(this).val() === 'One Way') {
            $('#return').prop('disabled', true).val('N/A');
        } else {
            $('#return').prop('disabled', false).val('');
        }
    });
});