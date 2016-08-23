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
	var userId;

// checks login status
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
// User is signed in.
			$('#loginLink').html('sign out');
			userId = user.uid;
			console.log(userId);
			database.ref('users/' + userId).on('value', function(snapshot){
				snap = snapshot.val();
				$("#username").html(snap.username);
				$("#team-level").html("Team: "+ snap.team + "<br>" + "Level: " + snap.level);
				$("#email").html(snap.email);
				$("#age-gender").html("Age: " + snap.age + "<br>" + "Gender: " + snap.gender);
				$("#avatar").empty();
				// $("#avatar").append("<img id='profileImg' src='"+snap.avatar+"'>");	    		
			})
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
		$(location).attr('href','index.html');
	});

	// Edit the Profile Page
$('#editProfile').on('click', function(){
	console.log("button works!");
	$('#username').hide();
	$('#team-level').hide();
	$('#email').hide();
	$('#age-gender').hide();
	$('form').show();
	$('#usernameForm').show();
	$('#teamLevelForm').show();
	$('#emailForm').show();
	$('#ageGenderForm').show();
	$('#saveProfileButton').show();
});

// window.submitForm = function() {
//             console.log("submit event");
//             var fd = new FormData(document.getElementById("fileinfo"));
//             fd.append("label", "WEBUPLOAD");
//             $.ajax({
//               url: "http://uploads.im/api?",
//               type: "POST",
//               data: fd,
//               processData: false,  // tell jQuery not to process the data
//               contentType: false   // tell jQuery not to set contentType
//             }).done(function( data ) {
//                 console.log("PHP Output:");
//                 console.log( data.data.thumb_url );
//                 avatar = data.data.thumb_url;
//                 console.log( avatar);
//                 showImg();
//             	userId = firebase.auth().currentUser.uid;
// 				console.log(userId);
// 				database.ref('users/' + userId).set({
// 					profilepic: avatar
// 				})
//             });
//             return false;
//         }
// function showImg() {
// 	if (avatar != ""){
// 	 	$("#avatar").empty();
// 	 	$("#avatar").append("<img id='profileImg' src='"+avatar+"'>");
// }};


$("#saveProfileButton").on('click', function(){
	username = $('#usernameInput').val().trim();
	team = $('#teamInput :selected').text();
	level = $('#levelInput').val().trim();
	email = $('#emailInput').val().trim();
	age = $('#ageInput').val().trim();
	gender = $('#genderInput').val().trim();
	console.log(username, team, level, email, age, gender)
	if (!(gender == 'male') && !(gender == 'female')){
		alert('please select a valid gender (either male or female)')
	}
	else {
	$('#editProfile').hide();
	$('#saveProfileButton').hide();
			userId = firebase.auth().currentUser.uid;
			console.log(userId);
			database.ref('users/' + userId).set({
				age: age, 
				email: email,
				gender: gender,
				level: level,
				team: team,
				username: username
			})

	$('#username').show();
	$('#team-level').show();
	$('#email').show();
	$('#age-gender').show();
	$('form').hide();
	$('#usernameForm').hide();
	$('#teamLevelForm').hide();
	$('#emailForm').hide();
	$('#ageGenderForm').hide();
	$('#saveProfileButton').hide();
	}
})

});



