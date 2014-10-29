// storageHelper.js
// ----------------------------------------------
//
// Helper created for simplify the use for localStorage in HTML5.
//
// This library have functions for create, modify, get, delete and 
// check the status. Enjoy.
//
// Copyrigth: Creative Commons - attribution 4.0 - http://creativecommons.org/licenses/by/4.0/
// Author: Camilo Rodriguez
// Blog: http://ingcamilorodriguez.wordpress.com

var storageConnection = (function(){

      var  validateStorage = false;

      // Add a value as JSON Document
      this.add = function(key, value){
          localStorage[key] = JSON.stringify(value);
      };
    
      // Set a value from LocalStorage
      this.set = function(key, value){
          localStorage.setItem(key, JSON.stringify(value));
      };

      // Get a value as object
      this.get = function(key) {
          try{
            return JSON.parse(localStorage[key]);
          }
          catch(err){
            console.log(err);
            return null;
          }
      };

      // Delete a key from LocalStorage 
      this.delete = function(key){
        localStorage.removeItem(key);
      };
    
      // Check if the LocalStorage is avaible in the browser or App
      this.isAvaibleLocalStorage = function (){
          if(typeof(Storage) !== "undefined") {
              validateStorage = true;
          }else{
              validateStorage = false;
          }
          return (validateStorage);
      };
    
      return( this );
    
  }).call( {} );