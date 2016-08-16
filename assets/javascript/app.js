$(document).ready(function(){
	$(".navbutton").click(function(){
	    $("#loginModal").modal('show');
	});


// @tthompson942010: 
	// Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyBEqFl3BXnWkAUERtW56Kd8uCh5TAw3XBY",
	    authDomain: "dating-go.firebaseapp.com",
	    databaseURL: "https://dating-go.firebaseio.com",
	    storageBucket: "dating-go.appspot.com",
	  };
	  firebase.initializeApp(config);
	// Create a variable to reference the database.
	  var database = firebase.database()
	  
	$("#submit").on("click", function() {
	  // Get the input values
	  var userEmail = ($('#userEmail').val().trim());
	  var userPassword = ($('#userPassword').val().trim());
	  var confirmPassword = $('#confirmPassword').val().trim();
	  
	  // Log the new user information 
	  console.log(userEmail);
	  console.log(userPassword);
	  console.log(confirmPassword);
	  if (userPassword != confirmPassword){
	  	console.log("incorrect")
		$('#userPassword').val("");
		$('#confirmPassword').val("");	  	
	  }
	  else {
	  	console.log("correct")

		$('#userEmail').val("");
		$('#userPassword').val("");
		$('#confirmPassword').val("");
	    // Save the new user in Firebase
	    database.ref().push({
	      dataUserEmail: userEmail,
	      dataUserPassword: userPassword,
	      dataConfirmPassword: confirmPassword,
	    });
	  }	  
	return false;
	});
});