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
var userId;
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
	    // User is signed in.
	    	$('#loginLink').html('sign out');
		// 	userId = user.uid;
	 //    	database.ref('users')
		// } else {
		// 	console.log('no user')
	    // No user is signed in.
		}
	});
//sign out, redirects to main page
	$("#loginLink").click(function(){
			firebase.auth().signOut().then(function() {
				  // Sign-out successful.
			}, function(error) {
				  // An error happened.
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode);
				console.log(errorMessage);
				});
		$('#loginLink').html('login/signup');
		$(location).attr('href','index.html')
	});

		// // var userId = user.uid;
		// var userdata = database.ref('users/' + userId)
		// console.log(userId)
// 	function pageload(){
// 		var database = firebase.database()
// 		var userId = user.uid;
// 		var userdata = database.ref('users/' + userId)
// 		userdata.once('value').then(function(snapshot) {
// 			console.log(userdata)
// 			var snap = snapshot.val()
// 			$("#username").html(snap.username);
// 			$("#team-level").html("Team: "+ snap.team + "<br>" + "Level: " + snap.level);
// 			$("#email").html(snap.email);
// 			$("#age-gender").html("Age: " + snap.age + "<br>" + "Gender: " + snap.gender);
// 		});
// 	};
// pageload();
})