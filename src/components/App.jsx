import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import ContactForm from './ContactForm';
import ContactList from './ContactsList';
import Filter from './Filter';

const contactsList = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

      function App () {
        const localContacts = JSON.parse(localStorage.getItem('contacts'));
        const [contacts, setContacts] = useState(
          () => localContacts ?? contactsList
        );
        const [filter, setFilter] = useState('');

        useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
        }, [contacts]);

        const addContact = ({ name, number }) => {
          const contact = {
            id: nanoid(),
            name,
            number,
          };
          
          contacts.find(option => option.name === contact.name)
            ? alert(`${contact.name} is already in contacts`)
            : setContacts(prevState => [
                { name, number, id: nanoid() },
                ...prevState,
              ]);
        };

        const handleSubmitForm = data => {
          addContact(data);
        };

        const onChangeFilter = e => {
          setFilter(e.currentTarget.value);
        };

        const deleteContact = contactId => {
          setContacts(prevState => prevState.filter(
              contact => contact.id !== contactId
            ),
          );
        };

        const getVisibleContacts = () => {
          const normalizedFilter = filter.toLowerCase();
          return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter)
          );
        };

          const visibleContacts = getVisibleContacts();
          return (
            <div className={css.container}>
              <h1>Phonebook</h1>
              <ContactForm onSubmit={handleSubmitForm} />
              <h2>Contacts</h2>
              <Filter value={filter} onChange={onChangeFilter} />
              <ContactList
                contacts={visibleContacts}
                onDeleteContact={deleteContact}
              />
            </div>
          );
        }

export default App;