$(document).ready(function(){
	
	var config = {
	    apiKey: "AIzaSyBJEf-9pGFWooqFdxd-sLAkozFU-YV369M",
	    authDomain: "project-weeken-warrior.firebaseapp.com",
	    databaseURL: "https://project-weeken-warrior.firebaseio.com",
	    projectId: "project-weeken-warrior",
	    storageBucket: "project-weeken-warrior.appspot.com",
	    messagingSenderId: "11980125710"
	  };
	    
	firebase.initializeApp(config);

	// Create a variable to reference the database
	var database = firebase.database();

	$("#signup-form").validate({
		errorClass: 'invalid',
             errorPlacement: function (error, element) {
        $(element)
            .closest("form")
            .find("label[for='" + element.attr("id") + "']")
            .attr('data-error', error.text());
    	},
	    // Specify validation rules
	    rules: {
	      firstname: "required",
	      lastname: "required",
	      email: {
	        required: true,
	        email: true
	      },
	      password: {
	        required: true,
	        minlength: 5
	      },
	      confirm_password: {
	         required: true,
	         minlength: 6,
	         equalTo: "#password"
	       }
	    },
	    // Specify validation error messages
	    messages: {
	      firstname: "Please enter your firstname",
	      lastname: "Please enter your lastname",
	      password: {
	        required: "Please provide a password",
	        minlength: "Your password must be at least 6 characters long"
	      },
	      confirm_password: {
	        required: "Please provide a password",
	        minlength: "Your password must be at least 6 characters long",
	        equalTo: "Password doesn't match"
	      },
	      email: "Please enter a valid email address"
	    },
	    // Make sure the form is submitted to the destination defined
	    // in the "action" attribute of the form when valid
	    submitHandler: function(form) {
	      form.submit();
	      signup();
	    }
	  });

	function signup(){
		
		let email = $("#email").val().trim();
		let password = $("#password").val().trim();

		console.log("email:: "+email+"  password ::: "+password);
		firebase.auth().createUserWithEmailAndPassword(email, password)
 					.catch(function (err) {
   					// Handle errors
   					console.log("Errors :: "+err);
 		});
	}
});