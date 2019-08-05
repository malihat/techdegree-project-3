$(document).ready(function() {
    $("#name").focus();
});

const inputArea = $('<textarea id="other-title" name="job_role_other" placeholder="Your Job Role"> </textarea>')
// if ($('#title').val('Other')) {
//     $('#title').append(textarea);
//     console.log('hello')
// }
// console.log( $('#title option:selected').text() );

// $('option:selected', 'select[name="options"]').removeAttr('selected')

// Code taken from: https://stackoverflow.com/questions/4874124/get-current-value-selected-in-dropdown-using-jquery
$('#title').on('change', function(e) {
    if (this.options[e.target.selectedIndex].text == 'Other') {
        $('fieldset')[0].append('<textarea id="other-title" name="job_role_other" placeholder="Your Job Role"> </textarea>');
        // $('#title').

    }
});