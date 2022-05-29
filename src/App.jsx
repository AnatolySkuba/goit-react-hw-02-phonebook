import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import ContactForm from 'components/ContactForm/ContactForm';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    const { name, number } = data;
    const { contacts } = this.state;
    contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : contacts.push({ id: nanoid(), name: name, number: number });
    this.setState({ contacts: contacts });
  };

  handleChange = evt => {
    this.setState({ filter: evt.target.value });
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
    const { contacts, filter } = this.state;
    const { handleChange, handleDelete, formSubmitHandler } = this;

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm formSubmitHandler={formSubmitHandler} />

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
