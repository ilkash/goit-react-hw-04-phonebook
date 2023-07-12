import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
// import { Component } from 'react';
import Form from './Form/Form';
import { Filter } from './Filter/Filter';
import { Contacts } from './Contacts/Contacs';

const LOCAL_STORAGE_CONTACTS_KEY = 'contacts';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONTACTS_KEY)) || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleFilter = event => {
    const { value } = event.target;
    setFilter(value);
  };
  const handleOnSubmitAdd = contact => {
    const isExist = contacts.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isExist) {
      alert(`${contact.name} already exists`);
      return;
    }

    setContacts(prev => [...prev, { ...contact, id: nanoid() }]);
  };
  const handelDelete = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const visibleContacts = filterContacts();

  return (
    <>
      <h3>Phonebook</h3>
      <Form handleOnSubmitAdd={handleOnSubmitAdd} />

      <h3>Contacts</h3>
      <h4>Find contacts by name</h4>

      <Filter handleFilter={handleFilter} filter={filter} />

      <Contacts visibleContacts={visibleContacts} handelDelete={handelDelete} />
    </>
  );
}