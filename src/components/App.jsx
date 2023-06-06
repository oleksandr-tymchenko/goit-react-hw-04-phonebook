import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';

import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { Container, Title1, Title2 } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const existedContact = (contacts, values) => {
    contacts.find(contact => contact.name === values.name);
  };

  const handleSubmit = (values, { resetForm }) => {
    values.id = nanoid();
    if (existedContact(contacts, values)) {
      alert(`${values.name} is already in contacts`);
      return;
    }
    setContacts(prevConacts => [...prevConacts, values]);

    resetForm();
  };

  const onSearchValue = e => {
    setFilter(e.target.value);
  };

  const deleteContact = contactId => {
    setContacts(prevConacts =>
      prevConacts.filter(contact => contact.id !== contactId)
    );
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Container>
      <Title1>Phonebook</Title1>
      <ContactForm data={handleSubmit} />
      <Title2>Contacts</Title2>
      <Filter value={filter} onSearch={onSearchValue} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
};
