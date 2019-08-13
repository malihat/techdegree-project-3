//        ----------------------------- *** I am aiming for Meets Expectations *** -----------------------

// When page loads, the 'name' input field is focused.
$(document).ready(function() {
    $("#name").focus();
});

// ----------Job Role-----------------
// Creates text field
const inputArea = document.createElement("input");
$(inputArea).attr({"id":"other-title", "placeholder": "Your Job Role", "name": "job_role_other"});

// If 'Other' option is selected, the text field appears.
// Code taken from: https://stackoverflow.com/questions/4874124/get-current-value-selected-in-dropdown-using-jquery
$('#title').on('change', function(e) {
    if (this.options[e.target.selectedIndex].text == 'Other') {
        $('fieldset')[0].append(inputArea);
    } 
    //  If 'Other' option is not selected, the text field is removed.
    if ( !(this.options[e.target.selectedIndex].text == 'Other') ) {
        $('#other-title').remove();
    }
});

// ----------”T-Shirt Info” section-----------------
    
// Hides color menu if 'Select Theme' is chosen in design menu and creates "Please select a T-shirt theme"
if ($('#design option')[0].text == "Select Theme") {
    const option = document.createElement("option");
    option.textContent = "Please select a T-shirt theme";
    $('#color').prepend(option);
    $('#color')[0].selectedIndex = 0;

    $('#color option').each(function (i, elem) {
        $(elem).css('display', 'none');
    });
}

// Changes the color menu when any option is selected from the design menu
$('#design').on('change', function (e) {
    // Checks the text of design menu 
    if (this.options[e.target.selectedIndex].value.includes('js puns')) {
        const newList = [];
        // Loops over color menu options to display the matched options
        $("#color option").each(function() {
            if ($(this).text().includes('JS Puns shirt')) {
                newList.push($(this));              
                $(this).css('display', 'block');
                // Selects the display option to be the first one from the new options
                $('#color')[0].selectedIndex = $('#color option[value='+newList[0].val()+']').index();                
            } else {
                $(this).css('display', 'none');
            } 
        });  
    }
    else if (this.options[e.target.selectedIndex].value.includes('heart js')) {
        const newList = [];
        $("#color option").each(function() {
            if ($(this).text().includes('JS shirt only')) {
                newList.push($(this)); 
                $(this).css('display', 'block');
                $('#color')[0].selectedIndex = $('#color option[value='+newList[0].val()+']').index() ;
                
            } else {
                $(this).css('display', 'none');
            }
        }); 
    }   
    else {
        $('#color')[0].selectedIndex = 0;
        $("#color option").css('display', 'none');
    }
        
});

// --------------”Register for Activities” section-------------------

$('.activities').append( "<div id='price'>Total: </div>");
let total = 0;
let price = '';
let newPrice = 0;
// Checks which checkbox is clicked and disables the events that are at the same time.
$(':checkbox').on('click', function(e) {
    // Select the events that start at the same time.
    const checkedInput = $(this).attr('data-day-and-time'); 
    const checkedIndex = $(this).index(':checkbox');
        
    if ($(this).is(':checked')) {
        // Gets the price and adds to the total variable
        price = $(this).parent().text().toString().trim();
        price = parseInt(price.substr(-3)) ;       
        total = total + price;
        $('#price').text(`Total: ${total}`);

        $("label input").each(function(i, elem) {
            const checkEach = $(elem).attr('data-day-and-time');
            if (checkedInput == checkEach) {
                // Checks if the other options are not the one that is checked and turns them grey.
                if ( !(i === checkedIndex)){
                    $(elem).attr('disabled', 'disabled');
                    $(elem).parent().css('color', 'grey');
                } 
            }
        });
    } else {
        // When unchecked price is subtracted to get the new total 
        newPrice = parseInt($(this).parent().text().toString().trim().substr(-3));
        total -= newPrice;
        $('#price').text(`Total: ${total}`);
    }
    
    // When unchecked, the options that were disabled are now back to normal
    if ($(this).is(":not(:checked)")) {      
        $("label input").each(function(i, elem) {
            const checkEach = $(elem).attr('data-day-and-time');
            if (checkedInput == checkEach) {
                // Checks if the other options are not the one that is checked.
                if ( !(i === checkedIndex)){
                    $(elem).attr('disabled', false);
                    $(elem).parent().css('color', 'black');
                } 
            }
        });
    }
});

// -------------------"Payment Info" section-------------------------
// Credit card option from dropdown menu is selected as default.
$('#payment option:selected').attr('disabled','disabled');
$('#payment')[0].selectedIndex = $('#payment option[value = "credit card"]').index();

// Displays credit card payment option only and hides others
$('.credit-card').css('display', 'block');
$('div:last-child()',  $('fieldset').last()).prev().css('display', 'none');
$('div:last-child()',  $('fieldset').last()).css('display', 'none');

// Changes the payment options as selected from the dropdown menu
$('#payment').on('change', function(e) {
    // Code taken from: https://stackoverflow.com/questions/36476703/jquery-click-select-option-value-with-option-text
   let method = $('option:selected', this).text();
    if ( method == 'Credit Card') {
        $('.credit-card').css('display', 'block');
        $('div:last-child()',  $('fieldset').last()).prev().css('display', 'none');
        $('div:last-child()',  $('fieldset').last()).css('display', 'none');
    } 
    if (method == 'PayPal') {
        $('div:last-child()',  $('fieldset').last()).prev().css('display', 'block');
        $('.credit-card').css('display', 'none');
        $('div:last-child()',  $('fieldset').last()).css('display', 'none');
    }
    if (method == 'Bitcoin') {
        $('div:last-child()',  $('fieldset').last()).css('display', 'block');
        $('.credit-card').css('display', 'none');
        $('div:last-child()',  $('fieldset').last()).prev().css('display', 'none');
    } 
});

// ----------------------Form validation-------------------------
// Checks how many times was checkbox clicked
let check = 0; 
$( "input[type=checkbox]" ).on( "click", function() {
    check++;
});

$('form').on('submit', function(e) {
    let method = $('option:selected', "#payment").text();

    // Checks if name input field has no input and makes a red border and prevents form submission
    if ($('#name').val() == '') {
        $('#name').css("border","3px solid red");
        e.preventDefault();
    }
    // Checks if email has the right format and it has no input; makes red border and prevents form submission
    if ( !(/[^@]+@[^@.]+\.[a-z]+$/i.test( $('#mail').val())) || $('#mail').val() == '' ) {
        $('#mail').css("border","3px solid red");
        e.preventDefault();
    }   
    // Checks if there are no checked activities, then makes red border and prevents form submission
    if (check == 0) {
        $('.activities legend').css("color","red");
        e.preventDefault();
    }
    // Checks if payment option is credit card and prevents form submission if value is incorrect
    if ($('#payment option[value = "credit card"]').text() == method) {
        // Checks if input field in not empty and it contains numbers between 13 and 16
        if ( $('#cc-num').val() == '' ||  !(/[^A-Za-z\s]\d{13,16}$/.test($('#cc-num').val())) ) {
            $('#cc-num').css("border","3px solid red");
            e.preventDefault();
        } 
        // Checks if input field in not empty and it contains 5 numbers
        if ( $('#zip').val() == '' || !(/^\d{5}$/.test($('#zip').val()) )) {
            $('#zip').css("border","3px solid red");
            e.preventDefault();
        } 
        // Checks if input field in not empty and it contains 3 numbers
        if ($('#cvv').val() == '' || !(/^\d{3}$/.test($('#cvv').val())) ) {
            $('#cvv').css("border","3px solid red");
            e.preventDefault();
        }
    }
});

