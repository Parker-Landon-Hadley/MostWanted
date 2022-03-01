"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  
  let searchResults = people
  while (searchResults.length > 1) {
    let searchType = promptFor('1 Search by name. 2 Search by eye-color. 3 Search by gender. Search by occupation. 5 Search by weight. 6 Search by height.',autoValid)
    
  switch(searchType){
    case '1':
      searchResults = searchByName(people);
      break;
    case '2':
      searchResults = searchByEyeColor(searchResults);
      displayPeople(searchResults);
      break;
      //return app(eyeResults);
    case '3':  
      searchResults = searchByGender(searchResults);
      displayPeople(searchResults);
      break;
      //return app(genderResults);
    case '4':  
      searchResults = searchByOccupation(searchResults);
      displayPeople(searchResults);
      break;
      //return app(occupationResults);
    case '5':  
      searchResults = searchByWeight(searchResults);
      displayPeople(searchResults);
      break;
      //return app(weightResults);
    case '6': 
      searchResults = searchByHeight(searchResults);
      displayPeople(searchResults);
      break;
      //return app(heightResults);
      default:
    app(people); // restart app
      break;
  }
}


  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
  

}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(person.length === 0){
    alert("Could not find that individual.");
    return app(people); // restart
  }





  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);
  
  switch(displayOption){
    case "info":
    displayPerson(person)
    break;
    case "family":
    displayFamily(person, people)
    break;
    case "descendants":
    displayParents(person, people)
    break;
    case "restart":
    app(people);
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

   

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){

}

//TODO: add other trait filter functions here.


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let displayInfo = "Name: " + person[0].firstName + " " + person.lastName + "\n";
      displayInfo += "ID: " + person[0].id + "\n";
      displayInfo += "DOB: " + person[0].dob + "\n";
      displayInfo += "Gender: " + person[0].gender + "\n";
      displayInfo += "Height: " + person[0].height + "\n";
      displayInfo += "Weight: " + person[0].weight + "\n";
      displayInfo += "Eye Color: " + person[0].eyeColor + "\n";
      displayInfo += "Occupation: " + person[0].occupation + "\n";
      displayInfo += "Parents: " + person[0].parents + "\n";
      displayInfo += "Current Spouse: " + person[0].currentSpouse + "\n";
    
  // TODO: finish getting the rest of the information to display.
  alert(person);
}

// get persons currentSpouse ID
function displaySpouse(person, people){
let currentSpouse = people.filter(function(currentSpouse){
  if(person[0].currentSpouse === currentSpouse.id){
    return true;
  }
  else{
    return false;
  }
})
alert(person[0].firstName + " " + person[0].lastName + " " + "is married to" + " " + currentSpouse[0].firstName + " " + currentSpouse[0].lastName);
}
// match currentSpouse ID to persons ID
// return persons name
//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion