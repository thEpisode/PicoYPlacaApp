var PicoYPlacaEngine = (function(){

	var picoYPlaca= [];
	var cityId = null;

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
			var html = '<li role="presentation"><a id="city-' + value.Id + '" role="menuitem" tabindex="-1" onclick="javascript:PicoYPlacaEngine.cityOptionClicked(' + value.Id + ', \'#city-' + value.Id + '\')" style="cursor:pointer;">' + value.City + '</a></li>';

			$("#menu1").append(html);
		});
	}

	this.cityOptionClicked = function(key, selector){		
		cityId = key;

		UniversalHelper.slideOut("#citySelectBox");
		UniversalHelper.slideIn("#placaInputBox");
	}

	this.resetEngine = function(){
		UniversalHelper.slideOut("#placaInputBox");
		UniversalHelper.slideIn("#citySelectBox");

		$("#placaInputBox>section>p").text("\u00A0");
		$("#placaInputBox>section>input").val("");
	}

	this.showCalender = function(){
		document.getElementById('light').style.display='block';
		document.getElementById('fade').style.display='block';
	}

	this.enterPress = function (sender, e) {
        //console.log(e.value.length);
        var value = e.value.toUpperCase();
        if(value.length == 6){
        	if(UniversalHelper.validateRegularExpression("([A-Z]{3}[0-9]{3})", value)){
        		$("#placaInputBox>section>p").text(calculatePlaca(value));
        	}
        	else{
        		$("#placaInputBox>section>p").text("Ingresa una placa colombiana");
        	}
        }
        else if(value.length > 6){
        	return false;
        }
        else{
        	if (sender.keyCode == 13) { // Enter
	            if(UniversalHelper.validateRegularExpression("([A-Z]{3}[0-9]{3})", value)){
        			$("#placaInputBox>section>p").text(calculatePlaca(value));
	        	}
	        	else{
	        		$("#placaInputBox>section>p").text("Ingresa una placa colombiana.");
	        	}
	            return false;
	        }
	        else if (sender.keyCode == 8) { // Backspace
	            if (e.value.length < 6) {
	                $("#placaInputBox>section>p").text("\u00A0");
	            }
	        }
	        
        }
    }

    function calculatePlaca(placa){
    	if(cityId != null){
		    var lastNum = placa.substring(5,6);

		    switch(cityId){
		    	case 1:
		    		return bogotaAlgorithm(lastNum);
		    		break;
		    	case 2:
		    		return colombianCityAlgorithm(lastNum, 2);
		    		break;
		    	case 3:
		    		return colombianCityAlgorithm(lastNum, 3);
		    		break;
		    	case 4:
		    		return colombianCityAlgorithm(lastNum, 4);
		    		break;
		    	case 5:
		    		return colombianCityAlgorithm(lastNum, 5);
		    		break;
		    	case 6:
		    		return colombianCityAlgorithm(lastNum, 6);
		    		break;
		    	case 7:
		    		return colombianCityAlgorithm(lastNum, 7);
		    		break;
		    }
		}
		else{
			return "Ha ocurrido un error, por favor reintente."
		}
	}

	function bogotaAlgorithm(placa){
		var date = new Date();
	    var dayOfMonth = date.getDate();
	    	    
	    if(date.getDay() != 0 && date.getDay() != 5){
	        if(placa % 2 == 0 && dayOfMonth % 2 == 0){
	            return "Hoy tiene pico y placa";
	        }
	        else if(placa % 2 != 0 && dayOfMonth % 2 != 0){
	            return "Hoy tiene pico y placa";
	        }
	        else{
	            return "Hoy no tiene pico y placa";
	        }
	    }
	    return "Hoy no tiene pico y placa";
	}

	function colombianCityAlgorithm(placa, idCity){
		var date = new Date();
		var today = date.getDay();

		var city = getCity(idCity);

		if(city != null){
			switch(today){
				case 1:
					return validateRule(city, placa, 0);
					break;
				case 2:
					return validateRule(city, placa, 1);
					break;
				case 3:
					return validateRule(city, placa, 2);
					break;
				case 4:
					return validateRule(city, placa, 3);
					break;
				case 5:
					return validateRule(city, placa, 4);
					break;
			}
		}
		else{

			return "Ha ocurrido un error catastrófico, estamos trabajando para resolver este problema.";
		}
	}

	function validateRule(city, placa, keyRule){
		var dataRules = '', response = 'Hoy no tiene pico y placa';
		$.each(city.Rules[keyRule], function(key, data){
			dataRules = data;
		});

		var placaRules = dataRules.split('-');

		$.each(placaRules, function(key, value){
			if(parseInt(placa) == parseInt(value)){
				response = 'Hoy tiene pico y placa';
				return false;
			}
		});

		return response;
	}

	function getCity(idCity){
		var city = $.grep(this.picoYPlaca, function(e){ return e.Id == idCity; });
		if (city.length == 0) {
		  return null;
		}
		else if (city.length == 1) {
		  return city[0];
		}
		else {
		  return null;
		}
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

        UniversalHelper.hideElements(["#placaInputBox"]);
    };

    return (this);
}).call({});