var PicoYPlacaEngine = (function(){

	var picoYPlaca= [];

	this.init = function(agent){
		if (typeof jQuery == 'undefined') {  
		    // jQuery is not loaded
		    internalException = new InternalException("Pico y Placa App Engine requieres jQuery.");
		    throw internalException;
		} else {
		    // jQuery is loaded

			initializeVariables();

		    if (agent == "WebApp") {
	    		console.log('Is Web App');

	    		WebAppCore();
			}else if(agent == "MobileApp"){
				console.log('Is Mobile App');

				MobileAppCore();
			}
			else{
				internalException = new InternalException(agent + " is not defined.");
		    	throw internalException;
			}
		}

		
	};

	function InternalException(message) {
	   throw message; 
	}

	function initializeVariables(){
		this.picoYPlaca = 
			[
				{
					"Id" : 1,
					"City" : "Bogotá", 
					"Timetable" :
					[
						{
							"Start" : "6:00", 
							"End" : "8:30"
						},
						{
							"Start" : "15:00",
							"End" : "19:30"
						}
					],
					"Rules":
					[
						{
							"Par" : "0-2-4-6-8"
						},
						{
							"Impar" : "1-3-5-7-9"
						}
					]
				},
				{
					"Id" : 2,
					"City" : "Medellín",
					"Timetable" :
					[
						{
							"Start" : "7:00",
							"End" : "8:30"
						},
						{
							"Start" : "17:30",
							"End" : "19:00"
						}
					],
					"Rules" :
					[
						{
							"1" : "2-3-4-5"
						},
						{
							"2" : "6-7-8-9"
						},
						{
							"3" : "0-1-2-3"
						},
						{
							"4" : "4-5-6-7"
						},
						{
							"5" : "8-9-0-1"
						}
					]
				},
				{
					"Id" : 3,
					"City" : "Cali",
					"Timetable" :
					[
						{
							"Start" : "6:30",
							"End" : "8:30"
						},
						{
							"Start" : "17:30",
							"End" : "19:30"
						}
					],
					"Rules" :
					[
						{
							"1" : "7-8"
						},
						{
							"2" : "9-0"
						},
						{
							"3" : "1-2"
						},
						{
							"4" : "3-4"
						},
						{
							"5" : "5-6"
						}
					]
				},
				{
					"Id" : 4,
					"City" : "Cartagena",
					"Timetable" :
					[
						{
							"Start" : "6:30",
							"End" : "8:30"
						},
						{
							"Start" : "17:30",
							"End" : "19:30"
						}
					],
					"Rules" :
					[
						{
							"1" : "1-2"
						},
						{
							"2" : "3-4"
						},
						{
							"3" : "5-6"
						},
						{
							"4" : "7-8"
						},
						{
							"5" : "9-0"
						}
					]
				},
				{
					"Id" : 5,
					"City" : "Pereira",
					"Timetable" :
					[
						{
							"Start" : "7:00",
							"End" : "8:30"
						},
						{
							"Start" : "17:30",
							"End" : "19:00"
						}
					],
					"Rules" :
					[
						{
							"1" : "0-1"
						},
						{
							"2" : "2-3"
						},
						{
							"3" : "4-5"
						},
						{
							"4" : "6-7"
						},
						{
							"5" : "8-9"
						}
					]
				},
				{
					"Id" : 6,
					"City" : "Bucaramanga",
					"Timetable" :
					[
						{
							"Start" : "6:30",
							"End" : "8:30"
						},
						{
							"Start" : "17:30",
							"End" : "19:30"
						}
					],
					"Rules" :
					[
						{
							"1" : "1-2"
						},
						{
							"2" : "3-4"
						},
						{
							"3" : "5-6"
						},
						{
							"4" : "7-8"
						},
						{
							"5" : "9-0"
						}
					]
				},
				{
					"Id" : 7,
					"City" : "Armenia",
					"Timetable" :
					[
						{
							"Start" : "6:30",
							"End" : "8:30"
						},
						{
							"Start" : "17:30",
							"End" : "19:30"
						}
					],
					"Rules" :
					[
						{
							"1" : "1-2"
						},
						{
							"2" : "3-4"
						},
						{
							"3" : "5-6"
						},
						{
							"4" : "7-8"
						},
						{
							"5" : "9-0"
						}
					]
				}
			];
	}

	function WebAppCore(){
		InitializeWebAppComponents();

		$.each(this.picoYPlaca, function(key, value){
			var html = '<li role="presentation"><a id="city-' + value.Id + '" role="menuitem" tabindex="-1" onclick="javascript:PicoYPlacaEngine.cityOptionClicked(' + key + ', \'#city-' + value.Id + '\')" style="cursor:pointer;">' + value.City + '</a></li>';

			$("#menu1").append(html);
		});
	}

	this.cityOptionClicked = function(key, selector){
		
		UniversalHelper.slideOut("#citySelect");
		UniversalHelper.slideIn("#placaInput");
	}

	this.enterPress = function (sender, e) {
        //console.log(e.value.length);
        var value = e.value.toUpperCase();
        if(value.length == 6){
        	if(UniversalHelper.validateRegularExpression("([A-Z]{3}[0-9]{3})", value)){
        		$("#placaInput>section>p").text(calculatePlaca(value));
        	}
        	else{
        		$("#placaInput>section>p").text("Ingresa una placa colombiana");
        	}
        }
        else if(value.length > 6){
        	return false;
        }
        else{
        	if (sender.keyCode == 13) { // Enter
	            if(UniversalHelper.validateRegularExpression("([A-Z]{3}[0-9]{3})", value)){
        			$("#placaInput>section>p").text(calculatePlaca(value));
	        	}
	        	else{
	        		$("#placaInput>section>p").text("Ingresa una placa colombiana.");
	        	}
	            return false;
	        }
	        else if (sender.keyCode == 8) { // Backspace
	            if (e.value.length < 6) {
	                $("#placaInput>section>p").text("");
	            }
	        }
	        
        }
    }

    function calculatePlaca(placa){
	    var num = placa.substring(5,6);
	    
	    var date = new Date();
	    var dayOfMonth = date.getDate();
	    	    
	    if(date.getDay() != 0 && date.getDay() != 5){
	        if(num%2==0 && dayOfMonth%2==0){
	            return "Hoy tiene pico y placa";
	        }
	        else if(num%2!=0 && dayOfMonth%2!=0){
	            return "Hoy tiene pico y placa";
	        }
	        else{
	            return "Hoy no tiene pico y placa";
	        }
	    }
	    return "Hoy no tiene pico y placa";
	}

	/// Initialize all components for WebApps
	function InitializeWebAppComponents(){
		UniversalHelperImport.init();

		
	}

	function MobileAppCore(){
		// UnderConstruction
	}

    return( this );

}).call( {} );

// Used for import UniversalHelper
var UniversalHelperImport = (function () {

    this.init = function () {
        // Adding the script tag to the head as suggested before
        var head = document.getElementById('scripts');
        var script = document.createElement('script');
        script.src = 'http://rawgit.com/thEpisode/UniversalHelper/master/UniversalHelper.js';

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    };

    var callback = function () {
        console.log('UniversalHelper script imported successfully.');

        UniversalHelper.hideElements(["#placaInput"]);
    };

    return (this);
}).call({});