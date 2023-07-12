import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Form({ handleOnSubmitAdd }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    handleOnSubmitAdd({ name, number });
    setName('');
    setNumber('');
  };
  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Name</h3>
      <input
        value={name}
        type="text"
        name="name"
        // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
      />
      <h3>Number</h3>
      <input
        value={number}
        type="tel"
        name="number"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
      />

      <button type="submit">Add contact</button>
    </form>
  );
}

Form.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
};