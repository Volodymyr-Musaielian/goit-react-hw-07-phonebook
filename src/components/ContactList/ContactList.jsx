import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';

import css from './ContactList.module.css';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const filteredContacts = contacts?.filter(contact =>
    contact?.name?.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = id => dispatch(deleteContact(id));

  return (
    <ul className={css.list}>
      {filteredContacts.map(({ name, number, id }) => {
        return (
          <li className={css.item} name={name} key={id}>
            {name}: {number}
            <button className={css.btn} onClick={() => handleDelete(id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
