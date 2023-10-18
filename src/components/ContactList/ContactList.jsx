import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredContacts, getIsLoading, getError } from 'redux/selectors';
import { fetchContacts, deleteContact } from 'redux/operations';

import css from './ContactList.module.css';

export const ContactList = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const dispatch = useDispatch();

  const handleDelete = id => dispatch(deleteContact(id));

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // const filteredContacts = items?.filter(contact =>
  //   contact?.name?.toLowerCase().includes(filter.toLowerCase())
  // );

  return (
    <div>
      {isLoading && <b>Loading...</b>}
      {error && <b>{error}</b>}
      {filteredContacts && filteredContacts.length > 0 && (
        <ul className={css.list}>
          {filteredContacts.map(({ name, phone, id }) => {
            return (
              <li className={css.item} name={name} key={id}>
                {name}: {phone}
                <button className={css.btn} onClick={() => handleDelete(id)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
