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

// --------------”Register for Activities” section
$(':checkbox').on('change', function(e) {
    const regex = /9(am|pm)/g;
    if(this.checked) {
        
        if( regex.test($(this).attr('data-day-and-time') )) {
            // console.log($('.activities label').text());
            // console.log($(this).attr('data-day-and-time')); 
            console.log('hey')
        }
    }
});

