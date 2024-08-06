

import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact, setFilter } from '../redux/contactsSlice';
import { nanoid } from 'nanoid';

const App = () => {
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleAddContact = (name, number) => {
    const isDuplicate = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
    
    if (isDuplicate) {
      alert(`Contact with name "${name}" already exists! Please use a different name.`);
      return;
    }

    dispatch(addContact({ id: nanoid(), name, number }));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.App}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;
