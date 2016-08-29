$(document).ready(function(){
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

// checks login status
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
	    // User is signed in.
	    	$('#loginLink').html('sign out');
			// var userId = firebase.auth().currentUser.uid;
	  //   	console.log(userId)
		} else {
	    // No user is signed in.
		}
	});

// Login/signup/signout function. if statement checks to see if it is currently a login or signout button. If login, open #loginModal, else sign out.
	$("#loginLink").click(function(){
		if (($('#loginLink').html()) == 'sign out'){
			firebase.auth().signOut().then(function() {
				  // Sign-out successful.
			}, function(error) {
				  // An error happened.
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode);
				console.log(errorMessage);
				});
		$('#loginLink').html('login/signup')
		}
		else {
			$("#loginModal").modal('show')
		}
	});

//on-click function for logging-in existing users
	$("#loginSub").on('click', function(){
		var loginemail = ($("#emailLogin").val().trim());
		var loginpassword = ($("#passwordLogin").val().trim());
//Sign-in function from Firebase
		firebase.auth().signInWithEmailAndPassword(loginemail, loginpassword).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log(errorCode);
		  console.log(errorMessage);
		}).then(function(){
		$("#loginModal").modal('hide')
		$(location).attr('href','profile.html')
		});
	})

//on-click function for submitting new users	  
	$("#newuserSub").on("click", function() {
		// Get the input values
		var email = ($('#userEmail').val().trim());
		var password = ($('#userPassword').val().trim());
		var confirmPassword = ($('#confirmPassword').val().trim());

		// Log the new user information 
		console.log(email);
		console.log(password);
		console.log(confirmPassword);
		//checks if password + confirmpassword match before sending userinfo to db
		if (password !== confirmPassword){
			console.log("incorrect")
			$('#userPassword').val("");
			$('#confirmPassword').val("");	  	
		}
		else {
			console.log("correct")
			$("#loginModal").modal('hide')

			$('#userEmail').val("");
			$('#userPassword').val("");
			$('#confirmPassword').val("");

	
			//passes firebase the account info
			firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
				var userId = user.uid
				console.log('uid',userId)
				database.ref('users/' + userId).set({
					ID: userId,
					age: "", 
					email: email,
					gender: "",
					level: "",
					team: "",
					username: "",
					profilepic: "",
					aboutme: "",
					favepoke: "",
					favpokeimg:"",
				})

				//Here if you want you can sign in the user
				}).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode);
				console.log(errorMessage);
				// ...
			});				
			// var userId = firebase.auth().currentUser.uid;
			// 	database.ref('users/' + userId).set({
			// 		age: "",
			// 		email: email,
			// 		gender: "",
			// 		level: "",
			// 		team: "",
			// 		username: ""

			// 	});



		}	  
	return false;
	});



}); 



