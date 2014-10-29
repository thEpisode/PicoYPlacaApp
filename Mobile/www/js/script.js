var isOpenMenu;
var placa;
var isAcuerdoChecked, isPublicidadChecked;
var title;

$(document).ready(function(){
    var width = 0;
    isOpenMenu = false;
    isAcuerdoChecked = isPublicidadChecked = false;
    
    if(title === 'Index'){
        $("#body>article:eq(0)").css("opacity", 0);
        $("#body>article:eq(1)").css("opacity", 0);
    }
        
    $("nav").css("left", "-220px");
    
    if (storageConnection.isAvaibleLocalStorage()) {
        var isFirstTime = storageConnection.get("isFirstTime");
        
        if(isFirstTime == null){
            storageConnection.add("isFirstTime", "True");
            // Hide Home Button
            $("nav>ul>li:eq(0)").hide();
            // Hide Calendar Button
            $("nav>ul>li:eq(1)").hide();
            $("#body>article:eq(1)").hide();
            $("#body>article:eq(0)").animate({
                "opacity": 1
            },500, function(){});
        }
        else{
            placa = storageConnection.get("Placa");            
            if(placa != null){
                
                if(title === 'Index'){
                    $("#body>article:eq(0)").hide();
                    $("body>section:eq(2)>article:eq(1)>.placa>h2").text(prepareStringPlaca(placa));
                    $("body>section:eq(2)>article:eq(1)>p").text(calculateNumOfPlaca(placa));
                    $("#body>article:eq(1)").animate({
                        "opacity": 1
                    },500, function(){});
                }
                else if(title === 'About us'){
                }
                
            }
            else{
                storageConnection.delete("isFirstTime");
                location.reload();
            }
        }
    }
    else{
        // Message Alert
    }
});

// Prevent Default Scrolling  
var preventDefaultScroll = function(event) 
{
    // Prevent scrolling on this element
    event.preventDefault();
    window.scroll(0,0);
    return false;
};

function calculateNumOfPlaca(placa){
    var num = placa.substring(5,6);
    
    var date = new Date();
    var dayOfMonth = date.getDate();
    
    console.log(num%2==0 + " : " + dayOfMonth%2==0);
    
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

function prepareStringPlaca(placa){
    return placa.substring(0, 3) + " " + placa.substring(3,6);
}

function menu(){
    
    if(isOpenMenu){
        width = "-220px";
        isOpenMenu = false;
        $("nav>section").animate({
            "opacity": 1
        },500);
    }
    else{
        width = "0px";
        isOpenMenu = true;
        $("nav>section").animate({
            "opacity": 0.1
        },500);
    }
    
    $("nav").animate({
        "left":width
    },500);
    
}

function menuLeft(){
    width = "-220px";
    isOpenMenu = false;
    $("nav>section").animate({
        "opacity": 1
    },500);
    $("nav").animate({
        "left":width
    },500);
}
function menuRight(){
    width = "0px";
    isOpenMenu = true;
    $("nav>section").animate({
        "opacity": 0.1
    },500);
    $("nav").animate({
        "left":width
    },500);
}

function publicidadChecked(e){
    if(e.currentTarget.id == "publicidadCheck" && $("#publicidadCheck").is(':checked')){
        isPublicidadChecked = true;
        validateChecks();
    }
    else{
        isPublicidadChecked = false;
    }
}

function acuerdoChecked(e){
    if(e.currentTarget.id == "acuerdoCheck" && $("#acuerdoCheck").is(':checked')){
        isAcuerdoChecked = true;
        validateChecks();
    }
    else{
        isAcuerdoChecked = false;
    }
}

function validateChecks(){
    if(isAcuerdoChecked && isPublicidadChecked){
        $("#footerFirstTime>button").prop('disabled', false);
        $("#footerFirstTime>button").animate({
            backgroundColor: "#FFFB0D"
        },500);
    }
}

function saveData(){
    var newPlaca;
    newPlaca = $("#placaInput").val();
    if(newPlaca.length>0){
        storageConnection.add("Placa", newPlaca.toUpperCase());
        location.reload();
    }
    return;
}

$("nav>section").on("click", menu);
$("#publicidadCheck").on("click", publicidadChecked);
$("#acuerdoCheck").on("click", acuerdoChecked);
$("#footerFirstTime>button").on("click", saveData);
//$("body").on('tap',updateHtml);
//$("body").on('dbltap',updateHtml);
//$("body").on('swipeup',updateHtml);
//$("body").on('swipedown',updateHtml);
$("body").on('swipeleft',menuLeft);
$("body").on('swiperight',menuRight);
window.document.addEventListener("touchmove", preventDefaultScroll, false);