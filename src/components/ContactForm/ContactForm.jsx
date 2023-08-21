import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from "./ContactForm.module.css";



function ContactForm({onSubmit}){
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInput = nanoid();
  const phoneInput = nanoid();

  const handleChange = e => {
    const target = e.currentTarget;
    if (target.name === "name") {
      setName(target.value);
    }
    if (target.name === "number") {
      setNumber(target.value);
    }
  };
  
const reset = () => {
  setName('');
  setNumber('');
};
  const handleSubmit = e => {
    e.preventDefault();
    const data = { name, number }
    onSubmit(data);
    reset();
  };

  

    return (
      <div className={css.formContainer}>
        <form onSubmit={handleSubmit}>
          <label htmlFor={nameInput}>
            Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              id={nameInput}
              required
            />
          </label>
          <label htmlFor={phoneInput}>
            Phone
            <input
              type="tel"
              name="number"
              value={number}
              onChange={handleChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              id={phoneInput}
              required
            />
          </label>
          <button className={css.btn} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};