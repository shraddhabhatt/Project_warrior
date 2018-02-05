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
	      username: "required",
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
	      username: "Create your own username",
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
	    	signup();
	    }
	  });
});
function clearform()
{
	$("#email").val("");
	$("#password").val("");
	$("#first_name").val("");
	$("#last_name").val("");
	$("#username").val("");
	$("#email-signin").val("");
	$("#password-signin").val("");
}
function signup(){
		
		let email = $("#email").val().trim();
		let password = $("#password").val().trim();
		let firstname = $("#first_name").val().trim();
		let lastname = $("#last_name").val().trim();
		let username = $("#username").val().trim();

		console.log("email:: "+email+"  password ::: "+password);

		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
			  
			  var user = firebase.auth().currentUser;

			  user.sendEmailVerification().then(function() {

			  		firebase.database().ref('users/'+username).set({
   						 firstname: firstname,
   						 lastname: lastname,
   						 email: email,
   						 password: password
  					});
  					clearform();
  					window.location.href = "registration.html";

  				// Email sent.
			 }).catch(function(error) {
  				// An error happened.
  				console.log("Errors when sending email :: "+error);
			});
			  // ...
			}).catch(function(error) {
  				// An error happened.
  			console.log("Errors in authentication :: "+error);
		});
 }
 $("#connect").on("click", function(){

		console.log("inside connect");
 		var user = firebase.auth().currentUser;
 		if(user!= null){
 			firebase.auth().signOut().then(function() {
  				// Sign-out successful.
			}).catch(function(error) {
  					// An error happened.
			});
 		}
 		let email_signin = $("#email-signin").val().trim();
		let password_signin = $("#password-signin").val().trim();
 		firebase.auth().signInWithEmailAndPassword(email_signin, password_signin).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
	  		  // ...
	  		 console.log("ERRORS :: "+ errorCode);
			
			});
 		firebase.auth().onAuthStateChanged(function(user) {
  		if (user!=null) {
    		// User is signed in.
    		console.log("auth changed :: "+user);
  		} else {
    		// No user is signed in.
    		console.log("auth changed NO:: "+user);
  		}
	});
 });
 $("#googlesignin").on("click", function(){

 		console.log("User Inside!! ");
 			var provider = new firebase.auth.GoogleAuthProvider();
			provider.addScope("profile");
			provider.addScope("email");
			firebase.auth().signInWithPopup(provider).then(function(result) {
			  // This gives you a Google Access Token. You can use it to access the Google API.
			  var token = result.credential.accessToken;
			  // The signed-in user info.
			  var user = result.user;

			  console.log("Auth :: "+user);
			
			}).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
	  		  // ...
	  		 console.log("ERRORS :: "+ errorCode);
			
			});
	});
 	$("#fbsignin").on("click", function() 	{

 		var provider = new firebase.auth.FacebookAuthProvider();
 		provider.addScope("profile");
		provider.addScope("email");
			
 		firebase.auth().signInWithPopup(provider).then(function(result) {
  		// This gives you a Facebook Access Token. You can use it to access the Facebook API.
  		var token = result.credential.accessToken;
  		// The signed-in user info.
  		var user = result.user;
  		console.log("FB Login :: "+user);
  		// ...
		}).catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		// The email of the user's account used.
  		var email = error.email;
  		// The firebase.auth.AuthCredential type that was used.
  		var credential = error.credential;
  		// ...
  		console.log("FB Erorr:: "+errorMessage);
		});
 	});
