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
// if user is signed in.
			$('#loginLink').html('sign out');
			userId = user.uid;
			console.log(userId);
			database.ref('users/' + userId).on('value', function(snapshot){
				snap = snapshot.val();
				$("#aboutDisplay").append(snap.aboutme);
				$("#aboutInput").attr('value', snap.aboutme);
				$("#genderDisplay").append(snap.gender);
				$("#genderInput").attr('value', snap.gender);
				$("#usernameDisplay").append(snap.username);
				$("#usernameInput").attr('value', snap.username);
				$("#teamDisplay").append(snap.team);
				$("#teamInput").attr('selected', snap.team);
				$("#levelDisplay").append(snap.level);
				$("#levelInput").attr('selected', snap.level);
				$("#ageDisplay").append(snap.age);
				$("#ageInput").attr('value', snap.age);
				$("#emailDisplay").append(snap.email);
				$("#emailInput").attr('value', snap.email);
				$("#pokemonInput").attr('value', snap.favepoke);
				$("#pokeDisplay").append("<img src='"+snap.favpokeimg+"'>")
				.append("<p>" + snap.favepoke + "</p>")
				$("#profileImage").append("<img id='profileImg' src='"+snap.profilepic+"'>");
				});
		} else {
		$(location).attr('href','index.html');

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

// // Edit the Profile Page
	$('#editProfile').on('click', function(){
		$('.display').hide();
		$('.work').show();
	});

//save profile edits and push them to firebase
	$("#saveProfileButton").on('click', function(){
		$('.display').show();
		$(".work").hide();
		about = $("#aboutInput").val().trim();
		username = $('#usernameInput').val().trim();
		team = $('#teamInput :selected').text();
		level = $('#levelInput :selected').text();
		email = $('#emailInput').val().trim();
		age = $('#ageInput').val().trim();
		gender = $('#genderInput').val().trim();
		favepoke = $('#pokemonInput').val().trim().toLowerCase();
		var queryURL = "http://pokeapi.co/api/v2/pokemon/"+favepoke+"/";
    	$.ajax({url: queryURL, method: "GET"})
    	.done(function(response) {
    	favpokeimg = (response.sprites.front_default)	

		console.log(username, team, level, email, age, gender, favpokeimg)
		if (!(gender == 'male') && !(gender == 'female')){
			alert('please select a valid gender (either male or female)')
		}
		else {
		$('#saveProfileButton').hide();
				userId = firebase.auth().currentUser.uid;
				console.log(userId);
				$('.display').empty();		
				database.ref('users/' + userId).update({
					aboutme: about,
					age: age, 
					email: email,
					gender: gender,
					level: level,
					team: team,
					username: username,
					favepoke: favepoke,
					favpokeimg: favpokeimg
				})

		}
    	});	
    });


    //when this function is called it will call the api input the img fron the div with the ID fileinfo
    //window is nessesary due to the form type. 

//submit user picture to API and firebase and display on profile page
	window.submitForm = function() {
	            console.log("submit event");
	            var fd = new FormData(document.getElementById("fileinfo"));
	            fd.append("label", "WEBUPLOAD");
	            $.ajax({
	              url: "http://uploads.im/api?",
	              type: "POST",
	              data: fd,
	              processData: false,  // tell jQuery not to process the data
	              contentType: false   // tell jQuery not to set contentType
	            }).done(function( data ) {
	                console.log("PHP Output:");
	                console.log( data.data.thumb_url );
	                // sets the avatar var to the url of the image
	                avatar = data.data.thumb_url;
	                console.log( avatar);
	                showImg();
	                userId = firebase.auth().currentUser.uid;
	                database.ref('users/' + userId).push({
	                	profilepic: avatar
	                })

	            });
	            return false;
	        }
	        //checks to see if there is an image already saved, if so it will show it, if not it leaves it the same.
	function showImg() {
	    if (avatar != ""){
	        $("#avatar").empty();
	        $("#avatar").append("<img id='profileImg' src='"+avatar+"'>");
	    }
	    }

//confusing Twitter typeahead code.   
	var substringMatcher = function(strs) {
	  return function findMatches(q, cb) {
	    var matches, substringRegex;

	    // an array that will be populated with substring matches
	    matches = [];

	    // regex used to determine if a string contains the substring `q`
	    substrRegex = new RegExp(q, 'i');

	    // iterate through the pool of strings and for any string that
	    // contains the substring `q`, add it to the `matches` array
	    $.each(strs, function(i, str) {
	      if (substrRegex.test(str)) {
	        matches.push(str);
	      }
	    });

	    cb(matches);
	  };
	};
	//Do you know how painful it is to go through a list of ~900 pokemon to fix the array syntax? It's better if no one does.
		var pokemon = ["bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran-f", "nidorina", "nidoqueen", "nidoran-m", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio", "meowth", "persian", "psyduck", "golduck", "mankey", "primeape", "growlithe", "arcanine", "poliwag", "poliwhirl", "poliwrath", "abra", "kadabra", "alakazam", "machop", "machoke", "machamp", "bellsprout", "weepinbell", "victreebel", "tentacool", "tentacruel", "geodude", "graveler", "golem", "ponyta", "rapidash", "slowpoke", "slowbro", "magnemite", "magneton", "farfetchd", "doduo", "dodrio", "seel", "dewgong", "grimer", "muk", "shellder", "cloyster", "gastly", "haunter", "gengar", "onix", "drowzee", "hypno", "krabby", "kingler", "voltorb", "electrode", "exeggcute", "exeggutor", "cubone", "marowak", "hitmonlee", "hitmonchan", "lickitung", "koffing", "weezing", "rhyhorn", "rhydon", "chansey", "tangela", "kangaskhan", "horsea", "seadra", "goldeen", "seaking", "staryu", "starmie", "mr-mime", "scyther", "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "gyarados", "lapras", "ditto", "eevee", "vaporeon", "jolteon", "flareon", "porygon", "omanyte", "omastar", "kabuto", "kabutops", "aerodactyl", "snorlax", "articuno", "zapdos", "moltres", "dratini", "dragonair", "dragonite", "mewtwo", "mew", "chikorita", "bayleef", "meganium", "cyndaquil", "quilava", "typhlosion", "totodile", "croconaw", "feraligatr", "sentret", "furret", "hoothoot", "noctowl", "ledyba", "ledian", "spinarak", "ariados", "crobat", "chinchou", "lanturn", "pichu", "cleffa", "igglybuff", "togepi", "togetic", "natu", "xatu", "mareep", "flaaffy", "ampharos", "bellossom", "marill", "azumarill", "sudowoodo", "politoed", "hoppip", "skiploom", "jumpluff", "aipom", "sunkern", "sunflora", "yanma", "wooper", "quagsire", "espeon", "umbreon", "murkrow", "slowking", "misdreavus", "unown", "wobbuffet", "girafarig", "pineco", "forretress", "dunsparce", "gligar", "steelix", "snubbull", "granbull", "qwilfish", "scizor", "shuckle", "heracross", "sneasel", "teddiursa", "ursaring", "slugma", "magcargo", "swinub", "piloswine", "corsola", "remoraid", "octillery", "delibird", "mantine", "skarmory", "houndour", "houndoom", "kingdra", "phanpy", "donphan", "porygon2", "stantler", "smeargle", "tyrogue", "hitmontop", "smoochum", "elekid", "magby", "miltank", "blissey", "raikou", "entei", "suicune", "larvitar", "pupitar", "tyranitar", "lugia", "ho-oh", "celebi", "treecko", "grovyle", "sceptile", "torchic", "combusken", "blaziken", "mudkip", "marshtomp", "swampert", "poochyena", "mightyena", "zigzagoon", "linoone", "wurmple", "silcoon", "beautifly", "cascoon", "dustox", "lotad", "lombre", "ludicolo", "seedot", "nuzleaf", "shiftry", "taillow", "swellow", "wingull", "pelipper", "ralts", "kirlia", "gardevoir", "surskit", "masquerain", "shroomish", "breloom", "slakoth", "vigoroth", "slaking", "nincada", "ninjask", "shedinja", "whismur", "loudred", "exploud", "makuhita", "hariyama", "azurill", "nosepass", "skitty", "delcatty", "sableye", "mawile", "aron", "lairon", "aggron", "meditite", "medicham", "electrike", "manectric", "plusle", "minun", "volbeat", "illumise", "roselia", "gulpin", "swalot", "carvanha", "sharpedo", "wailmer", "wailord", "numel", "camerupt", "torkoal", "spoink", "grumpig", "spinda", "trapinch", "vibrava", "flygon", "cacnea", "cacturne", "swablu", "altaria", "zangoose", "seviper", "lunatone", "solrock", "barboach", "whiscash", "corphish", "crawdaunt", "baltoy", "claydol", "lileep", "cradily", "anorith", "armaldo", "feebas", "milotic", "castform", "kecleon", "shuppet", "banette", "duskull", "dusclops", "tropius", "chimecho", "absol", "wynaut", "snorunt", "glalie", "spheal", "sealeo", "walrein", "clamperl", "huntail", "gorebyss", "relicanth", "luvdisc", "bagon", "shelgon", "salamence", "beldum", "metang", "metagross", "regirock", "regice", "registeel", "latias", "latios", "kyogre", "groudon", "rayquaza", "jirachi", "deoxys-normal", "turtwig", "grotle", "torterra", "chimchar", "monferno", "infernape", "piplup", "prinplup", "empoleon", "starly", "staravia", "staraptor", "bidoof", "bibarel", "kricketot", "kricketune", "shinx", "luxio", "luxray", "budew", "roserade", "cranidos", "rampardos", "shieldon", "bastiodon", "burmy", "wormadam-plant", "mothim", "combee", "vespiquen", "pachirisu", "buizel", "floatzel", "cherubi", "cherrim", "shellos", "gastrodon", "ambipom", "drifloon", "drifblim", "buneary", "lopunny", "mismagius", "honchkrow", "glameow", "purugly", "chingling", "stunky", "skuntank", "bronzor", "bronzong", "bonsly", "mime-jr", "happiny", "chatot", "spiritomb", "gible", "gabite", "garchomp", "munchlax", "riolu", "lucario", "hippopotas", "hippowdon", "skorupi", "drapion", "croagunk", "toxicroak", "carnivine", "finneon", "lumineon", "mantyke", "snover", "abomasnow", "weavile", "magnezone", "lickilicky", "rhyperior", "tangrowth", "electivire", "magmortar", "togekiss", "yanmega", "leafeon", "glaceon", "gliscor", "mamoswine", "porygon-z", "gallade", "probopass", "dusknoir", "froslass", "rotom", "uxie", "mesprit", "azelf", "dialga", "palkia", "heatran", "regigigas", "giratina-altered", "cresselia", "phione", "manaphy", "darkrai", "shaymin-land", "arceus", "victini", "snivy", "servine", "serperior", "tepig", "pignite", "emboar", "oshawott", "dewott", "samurott", "patrat", "watchog", "lillipup", "herdier", "stoutland", "purrloin", "liepard", "pansage", "simisage", "pansear", "simisear", "panpour", "simipour", "munna", "musharna", "pidove", "tranquill", "unfezant", "blitzle", "zebstrika", "roggenrola", "boldore", "gigalith", "woobat", "swoobat", "drilbur", "excadrill", "audino", "timburr", "gurdurr", "conkeldurr", "tympole", "palpitoad", "seismitoad", "throh", "sawk", "sewaddle", "swadloon", "leavanny", "venipede", "whirlipede", "scolipede", "cottonee", "whimsicott", "petilil", "lilligant", "basculin-red-striped", "sandile", "krokorok", "krookodile", "darumaka", "darmanitan", "maractus", "dwebble", "crustle", "scraggy", "scrafty", "sigilyph", "yamask", "cofagrigus", "tirtouga", "carracosta", "archen", "archeops", "trubbish", "garbodor", "zorua", "zoroark", "minccino", "cinccino", "gothita", "gothorita", "gothitelle", "solosis", "duosion", "reuniclus", "ducklett", "swanna", "vanillite", "vanillish", "vanilluxe", "deerling", "sawsbuck", "emolga", "karrablast", "escavalier", "foongus", "amoonguss", "frillish", "jellicent", "alomomola", "joltik", "galvantula", "ferroseed", "ferrothorn", "klink", "klang", "klinklang", "tynamo", "eelektrik", "eelektross", "elgyem", "beheeyem", "litwick", "lampent", "chandelure", "axew", "fraxure", "haxorus", "cubchoo", "beartic", "cryogonal", "shelmet", "accelgor", "stunfisk", "mienfoo", "mienshao", "druddigon", "golett", "golurk", "pawniard", "bisharp", "bouffalant", "rufflet", "braviary", "vullaby", "mandibuzz", "heatmor", "durant", "deino", "zweilous", "hydreigon", "larvesta", "volcarona", "cobalion", "terrakion", "virizion", "tornadus-incarnate", "thundurus-incarnate", "reshiram", "zekrom", "landorus-incarnate", "kyurem", "keldeo-ordinary", "meloetta-aria", "genesect", "chespin", "quilladin", "chesnaught", "fennekin", "braixen", "delphox", "froakie", "frogadier", "greninja", "bunnelby", "diggersby", "fletchling", "fletchinder", "talonflame", "scatterbug", "spewpa", "vivillon", "litleo", "pyroar", "flabebe", "floette", "florges", "skiddo", "gogoat", "pancham", "pangoro", "furfrou", "espurr", "meowstic-male", "honedge", "doublade", "aegislash-shield", "spritzee", "aromatisse", "swirlix", "slurpuff", "inkay", "malamar", "binacle", "barbaracle", "skrelp"]
//function that controls the input box. Autocompletes pokemon names for the stability of the API.
	$('#favePokemon .typeahead').typeahead({
	  hint: true,
	  highlight: true,
	  minLength: 1,
	},
	{
	  name: 'pokemon',
	  source: substringMatcher(pokemon)
	});

});



