import ContactItem from 'components/ContactItem/ContactItem';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

export default function ContactList({ contacts, filter, handleDelete }) {
  return (
    <ul>
      {contacts.map(
        ({ id, name, number }) =>
          name.toLowerCase().includes(filter.toLowerCase()) && (
            <li className={s.li} key={id}>
              <ContactItem
                name={name}
                number={number}
                handleDelete={handleDelete}
              />
            </li>
          )
      )}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
