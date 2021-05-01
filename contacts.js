const fs = require("fs");
const path = require("path");
const argv = process.argv;

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

    contacts.find((contact) => {
      if (contact.id === contactId) {
        console.table(contact);
      }
    });
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
    console.log("Success! Contact was deleted.");
    listContacts();
  });
}

// === Записать контакт
function addContact(name, email, phone) {
  // ...твой код
  fs.writeFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console
      .log
      //  const [_, __, name, age] = argv
      //  data.push({ name, age })
      // fs.writeFile('data.json', JSON.stringify(content, null, 2))
      ();
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
