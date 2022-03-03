"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTrait(people);
      break;
      default:
    app(people); // restart app
      break;
  }


  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults[0], people);
  

}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(person.length === 0){
    alert("Could not find that individual.");
    return app(people); // restart
  }





  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);
  
  switch(displayOption){
    case "info":
    displayPerson(person)
    break;
    case "family":
    displayFamily(person, people)
    break;
    case "descendants":
    displayDescendants(person, people)
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

    // Function used to search through an array of people to find matching first and last name and return a SINGLE person object.//
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

  return foundPerson;
}

    // Function to search through an array of people to find list by traits //
function searchByTrait(people){
  let personsTrait = promptFor ("Which trait would you like to search by?\n Enter 1 to search by eye-color.\n Enter 2 to search by height.\n Enter 3 to search by weight.\n Enter 4 to search by gender.\n Enter 5 to search by date of birth.\n", autoValid)
  let searchResults = people;
  switch(personsTrait){
    case "1":
      searchResults = searchByEyeColor(searchResults);
      displayPeople(searchResults);
      break;
    case "2":
      searchResults = searchByHeight(searchResults);
      displayPeople(searchResults);
      break;
    case "3":
      searchResults = searchByWeight(searchResults);
      displayPeople(searchResults);
      break;
    case "4":
      searchResults = searchByGender(searchResults);
      displayPeople(searchResults);
      break;
    case "5":
      searchResults = searchByDateOfBirth(searchResults);
      displayPeople(searchResults);
      break;
    default:
    alert("Invalid Entry");
  }

}

    // Trait finding function //

function searchByEyeColor(people){
  let eyeColor = promptFor ("What is the person's eye color?", autoValid);
  let foundEyeColor = people.filter(function(potentialEyeColorMatch){
    if(potentialEyeColorMatch.eyeColor === eyeColor){
    return true;
  }
  else{
    return false;
  }
})
return foundEyeColor
}

function searchByHeight(people){
  let height = promptFor ("What is the person's height in inches?", autoValid);
  let foundPersonsHeight = people.filter(function(potentialPersonsHeightMatch){
    if(potentialPersonsHeightMatch.height == height){
    return true;
  }
  else{
    return false;
  }
})
return foundPersonsHeight
}

function searchByWeight(people){
  let weight = promptFor ("What is the person's weight in pounds?", autoValid);
  let foundPersonsWeight = people.filter(function(potentialPersonsWeightMatch){
    if(potentialPersonsWeightMatch.weight == weight){
    return true;
  }
  else{
    return false;
  }
})
return foundPersonsWeight
}

function searchByGender(people){
  let gender = promptFor ("What is the person's gender?", autoValid);
  let foundPersonsGender = people.filter(function(potentialPersonsGenderMatch){
    if(potentialPersonsGenderMatch.gender === gender){
    return true;
  }
  else{
    return false;
  }
})
return foundPersonsGender
}

function searchByDateOfBirth(people){
  let dob = promptFor ("What is the person's date of birth?", autoValid);
  let foundPersonsDateOfBirth = people.filter(function(potentialPersonsDateOfBirthMatch){
    if(potentialPersonsDateOfBirthMatch.dob === dob){
    return true;
  }
  else{
    return false;
  }
})
return foundPersonsDateOfBirth
}
//DONE: add other trait filter functions here.


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

// Display #1 INFO
function displayPerson(person){
  let displayInfo = "Name: " + person.firstName + " " + person.lastName + "\n";
      displayInfo += "ID: " + person.id + "\n";
      displayInfo += "DOB: " + person.dob + "\n";
      displayInfo += "Gender: " + person.gender + "\n";
      displayInfo += "Height: " + person.height + "\n";
      displayInfo += "Weight: " + person.weight + "\n";
      displayInfo += "Eye Color: " + person.eyeColor + "\n";
      displayInfo += "Occupation: " + person.occupation + "\n";
    
  alert(displayInfo);
}

// Display #2 FAMILY //
function displayFamily(person, people){
  displaySpouse(person, people);
  displayParents(person, people);
  displaySiblings(person, people);
}

function displaySpouse(person,people){
  let personMatch = people.filter(function(family){
    if(person.currentSpouse === family.id){

      return true;

    } else {
      return false;
    }
 })
displayPeople(personMatch);
}

function displayParents(person,people){
  let personMatch = people.filter(function(family){
    if(person.parents.includes(family.id)){

      return true;

    } else {
      return false;
    }
  })
displayPeople(personMatch);
}


function displaySiblings(person, people){
  let sameParents = people.filter(function(parentId){
    if(parentId.parents.includes(person.parents[0]) && parentId.id !== person.id){

    return true;
    }
  })
  displayPeople(sameParents);
}

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
function customValidation(input){}

// function getNamesById(person){
//   let returnNames = "";
//     data.map(function (potentialMatch){
//       for(let i = 0; i < person; i++){
//         if(Number)
//         if(returnNames.length){
//         returnNames += ", ";
//       }
//       returnNames += potentialMatch.firstName + " " + potentialMatch.lastName;
//       }
//     }
//   });
//   return returnNames;


//#endregion