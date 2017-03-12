console.clear();
"use strict";

const navItems = document.querySelectorAll('.main-nav li');
const allPanels = document.querySelectorAll('.add-container, .search-container');
const addForm = document.querySelector('.add-form');
const searchForm = document.querySelector('.search-form');
const totalEl = document.querySelector('.total-contacts');
const results = document.querySelector('.results-container');
const showAll = document.querySelector('.show-all');
let contacts = [{
    name: 'Tom',
    cell: '919-918-2774',
    home: '910-774-2847'
}];

function toggleActiveStates(item) {
    if (item.classList.contains('is-active')) return;

    for (let item of navItems) {
        item.classList.toggle('is-active');
    }
    for (let panel of allPanels) {
        panel.classList.toggle('is-active');
    }
}

function updateTotalCount() {
    totalEl.innerHTML = contacts.length;
}

function collectFormData(data) {
    let contactData = {};

    for (let index = 0; index < data.length; index++) {
        if (data[index].value && data[index].type !== 'submit') {
            contactData[data[index].name] = data[index].value;
        }
    }

    return contactData;
}

function addContactToList(contact) {
    contacts.push(contact);
}

function searchContacts(value) {
    // Further build to support array of matching users
    for (let index = 0; index < contacts.length; index++) {
        if (contacts[index].name === value) {
            return contacts[index];
        }
    }
}

function displayResults(data) {
    let content = '';
    const contactContainer = document.createElement('div');
    contactContainer.className = "result-container has-spacer";

    for (let key in data) {
        content += `<p><span>${key}: </span>${data[key]}</p>`;
    }

    contactContainer.innerHTML = content;

    results.appendChild(contactContainer);

}

function displayAllContacts() {
    for (let index = 0; index < contacts.length; index++) {
        displayResults(contacts[index]);
    }
}

function clearResults() {
    results.innerHTML = '';
}

for (let item of navItems) {
    item.addEventListener('click', () => {
        toggleActiveStates(item);
    });
}

addForm.addEventListener('submit', () => {
    event.preventDefault();
    const inputs = event.target;
    const dataObject = collectFormData(inputs);

    addContactToList(dataObject);
    updateTotalCount();
    addForm.reset();
});

searchForm.addEventListener('submit', () => {
    event.preventDefault();
    const searchName = event.target[0].value;
    const foundUser = searchContacts(searchName);

    clearResults();

    if (foundUser) {
        displayResults(foundUser);
    } else {
        results.innerHTML = 'No Match Found';
    }
});

showAll.addEventListener('click', () => {
    clearResults();
    displayAllContacts();
});

updateTotalCount();
