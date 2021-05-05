const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve("db/contacts.json");

// === Чтение файла
function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    if (!data.toString()) {
      console.log("Data not found!");
      process.exit(1);
    }

    const contacts = JSON.parse(data.toString());
    console.table(contacts);
  });
}

// ===  Получить контакт по ID
function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const contacts = JSON.parse(data.toString());

    const foundContact = contacts.find(({ id }) => id === contactId);

    if (foundContact) {
      console.table([foundContact]);
    } else {
      process.exit(1);
    }
  });
}

// === Удалить контакт по ID
function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const contacts = JSON.parse(data.toString());
    const filteredContacts = contacts.filter(({ id }) => id !== contactId);

    if (contacts.length !== filteredContacts.length) {
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts), (err) => {
        if (err) {
          console.log(err.message);
          process.exit(1);
        }
      });
    }
    console.log(">>Contact was deleted.");
    listContacts();
  });
}

// === Записать контакт
function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const contacts = JSON.parse(data.toString());
    const id = shortid.generate();

    if ((name, email, phone)) {
      contacts.push({ id, name, email, phone });
      fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
        if (err) {
          console.log(err.message);
        }
        console.log(">>Contact was added.");
        listContacts();
      });
    }
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
