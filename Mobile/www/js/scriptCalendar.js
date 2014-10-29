$("#view-calendar").live('pageinit', function(event, ui) {
    if (storageConnection.isAvaibleLocalStorage()) {
       placa = storageConnection.get("Placa");
        var calendarEvents = [];
        if(placa != null){
            var num = placa.substring(5,6);
            
            var baseDate = new Date();
            var dayOfMonth = baseDate.getDate();
            var month = baseDate.getMonth();
            month++;
            for(var i = 0; i < 100; i++){
                if((month === 2 && dayOfMonth >28) || 
                   (month === 4 && dayOfMonth > 30) || 
                   (month === 6 && dayOfMonth > 30) || 
                   (month === 9 && dayOfMonth > 30) || 
                   (month === 11 && dayOfMonth > 30)){
                    dayOfMonth = 0;
                    month++;
                }
                else if (dayOfMonth>31){
                    dayOfMonth = 0;
                    month++;
                }
                    
                var actualDate = new Date(baseDate.getFullYear() + "-" + month + "-" + dayOfMonth + " 1: 00:00");
                
                if(actualDate.getDay() != 0 && actualDate.getDay() != 6){ // If isn't saturday or sunday
                    if(num%2==0 && dayOfMonth%2==0){
                        // Hoy tiene pico y placa
                        calendarEvents.push({'summary': 'Tienes pico y placa', 
                                             'begin':new Date(baseDate.getFullYear() + "-" + month + "-" + dayOfMonth + " 6:00:00"), 
                                             'end': new Date(baseDate.getFullYear() + "-" + month + "-" + dayOfMonth + " 8:30:00")
                                            });
                        calendarEvents.push({'summary': 'Tienes pico y placa', 
                                             'begin':new Date(baseDate.getFullYear() + "-" + month + "-" + dayOfMonth + " 15:00:00"), 
                                             'end': new Date(baseDate.getFullYear() + "-" + month + "-" + dayOfMonth + " 19:30:00")
                                            });
                    }

                }
                dayOfMonth++;
            }
        }
        else{
        }
        console.log(calendarEvents);
       $("#calendar").jqmCalendar({
          events :  calendarEvents
                   /*
                   { 
                        "summary" : "Evento ficti", 
                        "begin" : new Date("2014-09-04 06:30:00"), 
                        "end" : new Date("2014-09-04 08:00:00") 
                    }
                   */,
          months : ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
         days : ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
          startOfWeek : 0
       });
    }
    
   
});
            