console.clear(); // gives you a clear look at the console when the program runs
"use strict"; // provides more error information in the console

// Class Contact List Program //

// gives us access to the element with class add-form
const addForm = document.querySelector('.add-form');
const searchForm = document.querySelector('.search-form');
const results = document.querySelector('.results-container');

// querySelector only finds the first matching element.  querySelectorAll finds all matching elements.
// querySelectorAll creates a node list to store the elements.  node lists are not iterable.  you can convert it to an array with Array.from()
const navItems = document.querySelectorAll('.main-nav li');
const panels = document.querySelectorAll('.add-container, .search-container');


// creation of an object
const sports = {
  // key/value pairs.  pairs can act as global scope references for the methods of the object.
  type: 'Basketball',
  teams: ['Hornets', 'Thunder', 'Trailblazers'],
  conferences: ['East', 'West'],
  mvp: 'Russel Westbrook',

  // functions inside objects are methods
  printMVP() {
    // this refers to scope. here it represents the object itself.
    console.log(this.mvp);
  }
};
sports.printMVP();

const numberTesting = {
  num1: 19,
  num2: 35,
  addNumbers() {
    results.innerHTML = (this.num1 + this.num2);
  }
}
numberTesting.addNumbers();


// Creates an array of objects to hold our contacts
let allContacts = [
  {
    name: 'Ragnar',
    cell: '123-123-1234',
    home: '345-345-3456'
  }
];
// console.log(allContacts);

function updateTotalCount() {
  document.querySelector('.total-contacts').innerHTML = allContacts.length; // setting content of .total-contacts to length of allContacts
}

function collectFormData(formData) {
  // console.dir(formData); // console.dir() -> logs the actual values of an object
  const length = formData.length;

  // creates an empty object to hold the new contact values provided by user input
  let newContact = {};

  // loops through name attributes and give is the value provided by the user to build a newContact object
  for (let index = 0; index < length; index++) {
    // only add to the object if the named input has a value and is not a submit
    if (formData[index].value && formData[index].type !== 'submit') {
      newContact[formData[index].name] = formData[index].value // creates a property with the form field name and assigns it the value of the input
    }
  }

  // newContact['age']; square bracket notation allows use of variable information in keys
  // (Math.random() * (max - min + 1) + min))
  newContact.age = Math.floor(Math.random() * (99 - 18 + 1) + 18);

  // any new instance of an object has access to its parent object's properties
  newContact.dateAdded = Date.now();

  console.dir(newContact);

  // javascript stops after hitting a return statement.  can be used to break out of a function/loop. e.g.: 'return false;'
  return newContact; // returns value of inputted data; returning here rather than calling a function so we can use it however we want later

  // Showing you what information you are creating for validation
  // console.dir(newContact);
}

function addContactToList(contact) {
  allContacts.push(contact);
}

function toggleActiveClass(selection) {
  selection.classList.toggle('is-active');
}

function handleNavClick(tab) {
  // check if the class on the current item is 'is-active' on click
  // breaks out of loop if the clicked item has the class 'is-active'
  if (tab.classList.contains('is-active')) return;

  // if the class is not 'is-active' on click
  // toggle is-active on each item.  will remove if on and add if off.
  for (let tab of navItems) {
    // passes tab to the toggleActiveClass function which toggles the class of 'is-active' on the item
    toggleActiveClass(tab);
  }

  // toggles 'is-active' class on .search-container and .add-container
  for (let item of panels) {
    toggleActiveClass(item);
  }
}

// for of loop: iterates over the navItems node list
// tab assumes the current value of the list item in navItems
for (let tab of navItems) {
  tab.addEventListener('click', () => {
    // runs the handleNavClick function when a tab is clicked
    handleNavClick(tab);
  });
}

// Adds an event listenter to the add form for submit
addForm.addEventListener('submit', () => { // '() =>' is the same as 'function()' but adds benefits to scoping
  event.preventDefault(); // prevents default behavior of event
  // debugger; // when you have dev tools open, this will stop all code execution at its location. can also select a line in devtools Sources

  // shows what is available
  //console.log(event); // look at the Target value of the event object in console to see what you have access to

  // const allInputs = event.target; // assigns event.target property to the variable allInputs
  const contactToPush = collectFormData(event.target); // collectFormData(allInputs) // calls collectFormData which iterates over allInputs, returns newContact, and sets that value to contactToPush

  // console.dir(contactToPush);

  addContactToList(contactToPush); // calls addContactToList and adds the value of contactToPush to the array allContacts
  updateTotalCount(); // updates count of contacts after a new contact is added
  //console.log(allContacts);

  // Adds the newly created contact to the array allContacts
  // allContacts.push(newContact);
  addForm.reset(); // resets form on submit
});

// Adds an event listener to the search form submit
searchForm.addEventListener('submit', () => {
  event.preventDefault();

  // console.dir(event.target); // looking at what we have available
  const searchName = event.target[0].value;

  results.innerHTML = '';

  // iterate over our allContacts list of objects
  for (let index = 0; index < allContacts.length; index++) {
    // check if there is a name value in allContacts equal to the value of searchName
    if (allContacts[index].name === searchName) {
      // initializes an empty string to hold our content
      let content = '';

      // creates a new div and adds a classList to it, but does not add it to the page
      const contactContainer = document.createElement('div');
      contactContainer.classList = 'contact-container has-spacer';

      // for in loop: iterates over allContacts object
      for (let key in allContacts[index]) {
        // use `` backticks for string interpolation
        // sets comment to something like name: value.  Square brackets allows for dynamic content.
        content += `<p><span>${key}: </span>${allContacts[index][key]}</p>`;
      }

      // sets innerHTML of contactContainer to the value of content
      contactContainer.innerHTML = content;

      // inserts contactContainer div to the bottom of the results element
      results.appendChild(contactContainer);

      // breaks out of loop so you won't write over the search
      return;

    } else {
      results.innerHTML = "No Matches Found.";
    }
  }
});

updateTotalCount(); // running the function on page load
