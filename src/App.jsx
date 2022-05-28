import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import ContactForm from 'components/ContactForm/ContactForm';

const INITIAL_STATE = {
  // contacts: [],
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  name: '',
  number: '',
  filter: '',
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  nameInputId = nanoid();

  handleSubmit = evt => {
    evt.preventDefault();
    const { name, contacts, number } = this.state;
    contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : contacts.push({ id: this.nameInputId, name: name, number: number });
    this.setState({ contacts: contacts });
    this.reset();
  };

  reset = () => {
    this.setState({ name: INITIAL_STATE.name, number: INITIAL_STATE.number });
    this.nameInputId = nanoid();
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleDelete = evt => {
    evt.preventDefault();
    const { contacts } = this.state;
    contacts.forEach(
      (contact, index) =>
        contact.name === evt.target.name && contacts.splice(index, 1)
    );
    this.setState({ contacts: contacts });
  };

  render() {
    const { contacts, filter, name, number } = this.state;
    const { handleChange, handleDelete, handleSubmit, nameInputId } = this;

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          nameInputId={nameInputId}
          name={name}
          number={number}
        />

        <h2>Contacts</h2>
        <Filter filter={filter} handleChange={handleChange} />
        <ContactList
          contacts={contacts}
          filter={filter}
          handleDelete={handleDelete}
        />
      </div>
    );
  }
}
