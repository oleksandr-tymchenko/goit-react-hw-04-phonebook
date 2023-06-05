import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { FormCont, Label, Btn, Input, ErrMessage } from './ContactForm.styled';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
  number: yup
    .string()
    .matches(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

const initialValues = {
  name: '',
  number: '',
};

export default function ContactForm({ data }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={data}
      validationSchema={schema}
    >
      <Form autoComplete="off">
        <FormCont>
          <Label htmlFor="name">Name</Label>
          <Input type="text" name="name" id="name" placeholder="Jacob Mercer" />
          <ErrMessage name="name" component="div" />

          <Label htmlFor="number">Number</Label>
          <Input
            type="tel"
            name="number"
            id="number"
            placeholder="080-111-77-55"
          />
          <ErrMessage name="number" component="div" />
          <Btn type="submit">add contact</Btn>
        </FormCont>
      </Form>
    </Formik>
  );
}

ContactForm.propTypes = {
  data: PropTypes.func,
};
