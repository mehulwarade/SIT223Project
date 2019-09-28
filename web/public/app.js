const API_URL = 'https://mjsx.now.sh/api';

//#region predef

(function ($) {
    "use strict";

    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function(){
        console.log("1");
        $(this).on('blur', function(){
            if(validate(this) == false){
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        console.log("2");
        var check = true;
        
        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        console.log("4");
        $(this).focus(function(){
           hideValidate(this);
           $(this).parent().removeClass('true-validate');
        });
    });

     function validate (input) {
        console.log("5");
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else if($(input).attr('type') == 'ID' || $(input).attr('name') == 'ID') {
            if($(input).val().trim().match(/[a-z,A-Z]/gi) != null) {
                return false;
            }
        }
        else{
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        console.log("6");
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
        $(thisAlert).append('<span class="btn-hide-validate">&#xf135;</span>')
        $('.btn-hide-validate').each(function(){
            $(this).on('click',function(){
               hideValidate(this);
            });
        });
    }

    function hideValidate(input) {
        console.log("7");
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
        $(thisAlert).find('.btn-hide-validate').remove();
    }
    
    

})(jQuery);


  //#endregion
$('#register').on('click', function () {    
    const name = $('#reg_name').val();
    const email = $('#reg_email').val();
    const user = $('#reg_username').val();
    const password = $('#reg_password').val();
    const confirm_password = $('#reg_confirm_password').val();
    const ID = $('#reg_ID').val();

    if(password == confirm_password){
       $.post(`${API_URL}/register`, { name,ID, user, password, email}).then((response) =>{
            if (response.success) {  
                $('#messeged').toggle();             
                window.open('/sarms.html#t2','_parent');
                location.href = '/sarms.html#t2';
            } 
            else {
                console.log($,{response});
                $('#message').append(`<p class="alert alert-danger">${response}</p>`);
            }
        });       
    }
    else{$('#messege').append(`<p class="alert alert-danger">Passwords do not match</p>`);  
    console.log($,{response});}
});

$('#login').on('click', function () {
    const user = $('#log_name').val();
    const password = $('#log_password').val();
    console.log(user + password);

    $.post(`${API_URL}/authenticate`, { user, password }).then((response) =>{
        console.log('2');
        if (response.success) {
            console.log("hehehehe");
            console.log(response.name);
            localStorage.setItem('user', response.name);
            localStorage.setItem('password', password);
            localStorage.setItem('email', response.email);            
            localStorage.setItem('ID', response.ID);
            
            if(response.name == 'admin'){ window.open('./whole_web_pages/adstulec/admin.html','_parent');}
            else if(response.ID < 200000000){window.open('./whole_web_pages/adstulec/lecturer.html','_parent');}
            else if(response.ID >= 200000000){window.open('./whole_web_pages/adstulec/student.html','_parent');}
           
        } 
        else {
            $('#messege').append(`<p class="alert alert-danger">${response}</p>`);
            console.log($,{response});
        }
    });
});
function searcht(){
    const input = $('#instudentdetails').val();    
    console.log(input);
    console.log("1234567890");
    $.get(`${API_URL}/userdata`).then(response => {
        console.log("BAWAWAWAWA");
                response.forEach((user) => {
                console.log(user.ID);
                
                if(input == user.ID || input == user.name){
                    if(user.ID >=200000000){var type = 'Student';}
					else if(user.ID <200000000){var type = 'Lecturer';}

                    $('#userdata tbody').append(`
                    <tr class="row100 body">
                        <td class="cell100 column1">${user.name}</td>
                        <td class="cell100 column2">${user.username}</td>
                        <td class="cell100 column3">${user.ID}</td>
                        <td class="cell100 column4">${type}</td>
                        <td class="cell100 column5">${user.email}</td>
                        <td class="cell100 column5">${user.password}</td>
                    </tr>`			
                    );
                }

               
                });
             })         
            .catch(error => {
                console.error(`Error: ${error}`);
            });

}