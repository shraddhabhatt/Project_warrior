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
	
	$('select').material_select();

	$("#registration-form").validate({
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
	      childfirstname: "required",
	      childlastname: "required",
	      dob: "required",
	      playdate: "required",
	      email: {
	        required: true,
	        email: true
	      },
	      phone: {
	      	 required: true,
             number: true,
             length: 10
	      }
	      
	    },
	    // Specify validation error messages
	    messages: {
	      firstname: "Please enter your firstname",
	      lastname: "Please enter your lastname",
	      childfirstname: "Please enter your child's firstname",
	      childlastname: "Please enter your child's lastname",
	      dob: "Please select your child's date of birth",
	      playdate: "Please select the playdate",
	      phone: {
                required: "Please enter your phone number",
                number: "Please enter only numeric value"
          },
	      email: "Please enter a valid email address"
	    },
	    // Make sure the form is submitted to the destination defined
	    // in the "action" attribute of the form when valid
	    submitHandler: function(form) {
	    	signup();
	    }
	  });
});