import PropTypes from 'prop-types';
import { ContactsCont, BtnDel, Name } from './ContactListStyled';

export default function ContactList({ contacts, onDeleteContact }) {
  return (
    <ContactsCont>
      {contacts.map(({ id, name, number }) => {
        return (
          <li key={id}>
            <p>
              <Name>{name}</Name>: {number}
              <BtnDel onClick={() => onDeleteContact(id)}>Delete</BtnDel>
            </p>
          </li>
        );
      })}
    </ContactsCont>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func,
};
