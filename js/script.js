$(document).ready(function() {
    $("#name").focus();
});

// const $inputArea = $("<input>", {id: "other-title", "name":"job_role_other", "placeholder":"Your Job Role"});
const inputArea = document.createElement("input");
$(inputArea).attr({"id":"title", "placeholder": "Your Job Role", "name": "job_role_other"});


// Code taken from: https://stackoverflow.com/questions/4874124/get-current-value-selected-in-dropdown-using-jquery
$('#title').on('change', function(e) {
    if (this.options[e.target.selectedIndex].text == 'Other') {
        // $('fieldset')[0].append('<input type="text" id="other-title" name="job_role_other" placeholder="Your Job Role">');
        $('fieldset')[0].append(inputArea);
        // console.log('Hello');
    } else {
        $("#title").css("backgroudColor", "red");   //Needs work
    }
});

// T-Shirt theme
if ($('#design option')[0].text == "Select Theme") {
    // const $option = $("<option> Please select a T-shirt theme </option>")
    const option = document.createElement("option");
    option.textContent = "Please select a T-shirt theme";
    $('#color').prepend(option);
    $('#color')[0].selectedIndex = 0;
}  //($('#design option')[1] ==) 

$('#design').on('change', function (e) {
    // if ($('#design option').text == '')
    // for (let i=0; i<$('#design option').length; i++) {
        const count = [];
        if (this.options[e.target.selectedIndex].value.includes('js puns')) {
            // console.log(this.options[e.target.selectedIndex].value);
            // for (let i=1; i<$('#color option').length; i++)  {
            $("#color option").each(function(i) {
                if ($(this).text().includes('JS Puns shirt')) {
                                  
                    $(this).css('display', 'block');

                    count.push($('#color option').eq(i).value);
                    // $('#color:').val('');
                    console.log($('#color option').eq(i).value)
                    // console.log(count[0]);  
                    // $("#color option[value='United State']").attr("disabled", false);
                    // $('select option:first-child').attr("selected", "selected");
                    // count.push($('#color').eq(i));
                    // count.push($('#color').options[i])
                    // $('#color').val('');
                    // console.log(count);
                    
                } else {
                    // $(this[hidden=true]).hide();
                    $(this).css('display', 'none');
                } 
            });  
            // $('#color').val('valkdkdkdk');

        }
        else if (this.options[e.target.selectedIndex].value.includes('heart js')) {
            $("#color option").each(function(elem) {
                if ($(this).text().includes('JS shirt only')) {
                    $(this).css('display', 'block');
                    
                } else {
                    $(this).css('display', 'none');
                }
            }); 
        }
        else {
            $("#color option").css('display', 'block')
        }
});

let total = 0;
let price = '';
// const div = document.createElement('div class="price"');
// div.textContent = "Hello"
$('.activities').append( "<div id='price'>Total: </div>");


// --------------”Register for Activities” section
$(':checkbox').on('click', function(e) {
    // const regex = /9(am|pm)/g;
    const checkFirst = (/9(am|pm)/g).test($(this).attr('data-day-and-time'));
    const checkSecond = (/1(pm)/g).test($(this).attr('data-day-and-time'));
    const checkedIndex = $(this).index(':checkbox');
    if(this.checked) {
        // console.log( $(this).parent().text());
        // const priceText = (/[$]\d{2,}/).test($(this).parent().text());
        price = $(this).parent().text().toString().trim();
        price = parseInt(price.substr(-3)) ;       
        total = total + price;
        $('#price').text(`Total: ${total}`)
        // console.log("Checked Total: ", total);
        // console.log("Checked price:", price);

        if (checkFirst !== false || checkSecond !== false) {
            $("label input").each(function(i, elem) {
                const checkEach = $(this).attr('data-day-and-time');
                if ( (checkFirst === (/9(am|pm)/g).test(checkEach) || checkSecond === (/1(pm)/g).test(checkEach)) && checkEach !== undefined) {
                    // console.log($(this).parent().text(), ' ', i );
                    if ( !(i === checkedIndex)){
                        $(this).attr('disabled', 'disabled');
                        $(elem).parent().css('color', 'grey');
                    } 
                }
            });
        }
        
    } else {
        const newPrice = parseInt($(this).parent().text().toString().trim().substr(-3));
        // console.log("Unchecked price:", newPrice);
        total -= newPrice;
        $('#price').text(`Total: ${total}`)
        // console.log('Unchecked Total----', total);
        
        // if ( !(/9(am|pm)/g).test($(this).parent().text()) || !(/1(pm)/g).test($(this).parent().text() == true) ) {
            if ($(this).index(':checkbox') !== 0 || (/9(am|pm)/g).test($(this).attr('data-day-and-time'))  )   {
                $("label input").each(function(i, elem) { 
                    const checkEach = $(this).attr('data-day-and-time');
                    if ( (checkFirst === (/9(am|pm)/g).test(checkEach)) ) {
                        if ( !(i === checkedIndex)) {
                            $(elem).parent().css('color', 'black');
                            $(this).attr('disabled', false);
                        }
                    }

                });
            } 

            // else if ((/9(am|pm)/g).test($(this).attr('data-day-and-time')) ) {
            //     $("label input").each(function(i, elem) {
            //         const checkEach = $(this).attr('data-day-and-time');
            //         if ( (checkFirst === (/9(am|pm)/g).test(checkEach)) )  {
            //             // || checkSecond === (/1(pm)/g).test(checkEach)) && checkEach !== undefined
            //             // console.log($(this).parent().text(), ' ', i );
            //             if ( !(i === checkedIndex)){
            //                 $(this).attr('disabled', false);
            //                 $(elem).parent().css('color', 'black');
            //             } 
            //         }
            //     });
                // $("label input").each(function(i, elem) { 
                //     if ( i===checkedIndex ) {
                //         $(elem).parent().css('color', 'black');
                //         $(this).attr('disabled', false);
                //     }
                // });
               
            // } 
            // else if ((/1(pm)/g).test($(this).attr('data-day-and-time')) ) {
            //     $("label input").each(function(i, elem) { 
            //         $(elem).parent().css('color', 'black');
            //         $(this).attr('disabled', false);
            //     });
            // } 
            
    }
});

// ================== Payment Info" section
$('#payment option:selected').attr('disabled','disabled');
$('#payment')[0].selectedIndex = $('#payment option[value = "credit card"]').index();
$('.credit-card').css('display', 'block');
$('div:last-child()',  $('fieldset').last()).prev().css('display', 'none');
$('div:last-child()',  $('fieldset').last()).css('display', 'none');
$('#payment').on('change', function(e) {
    // Code taken from: https://stackoverflow.com/questions/36476703/jquery-click-select-option-value-with-option-text
    let method = $('option:selected', this).text();
    if ( method == 'Credit Card') {
        $('.credit-card').css('display', 'block');
        $('div:last-child()',  $('fieldset').last()).prev().css('display', 'none');
        $('div:last-child()',  $('fieldset').last()).css('display', 'none');
    } else if (method == 'PayPal') {
        $('div:last-child()',  $('fieldset').last()).prev().css('display', 'block');
        $('.credit-card').css('display', 'none');
        $('div:last-child()',  $('fieldset').last()).css('display', 'none');
    } else if (method == 'Bitcoin') {
        $('div:last-child()',  $('fieldset').last()).css('display', 'block');
        $('.credit-card').css('display', 'none');
        $('div:last-child()',  $('fieldset').last()).css('display', 'none');
    } 
    // console.log( $('div:last-child() p',  $('fieldset').last() ));
});

// ============================Form Validation========================

$('#name').prop('required', true)
$('#mail').prop('required', true)
let check = 0; 
$( "input[type=checkbox]" ).on( "click", function() {
    check++;
});
 // if (/\w\S.[@]\D\S[a-z][.][A-za-z]/)
$('button[type="submit"]').on('click', function(e) {
    e.preventDefault();
    if ($('#name').val() == '') {
        $('#name').css("border","3px solid red");
    }

    // if (RegExp.test ( $('#mail').val()) || $('#mail').val() == '' ) {
    //     $('#mail').css("border","3px solid red");

    // }   
    
    if (check == 0) {
        $('.activities legend').css("color","red");
    }

    
    $('#cc-num').prop('required', true)
    $('#zip').prop('required', true)
    $('#ccv').prop('required', true)
    
    if ($('#payment option[value = "credit card"]').text() == 'Credit Card') {
        if ( $('#cc-num').val() == '' || $('#zip').val() == '' || $('#ccv').val() == '' ) {
            $('#cc-num').css("border","3px solid red");
            $('#zip').css("border","3px solid red");
            $('#cvv').css("border","3px solid red");
        } else if ( /\d{13,16}/.test($('#cc-num').val())  )
    }
    /\d{5}/
});

// console.log($('.activities input[type="checkbox"]'));
