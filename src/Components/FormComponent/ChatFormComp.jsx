import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './ChatFormComp.scss';

const validationSchema = Yup.object({
  prompt: Yup.string()
    .trim()
    .matches(/[\S]/, 'Prompt must contain at least one symbol.')
    .required('Prompt is required.'),
});

function ChatFormComp({ handleSubmit }) {
  return (
    <Formik
      initialValues={{ prompt: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values.prompt);
        resetForm();
      }}
    >
      <Form className="chat-form">
        <div className="chat-input-row">
            <Field
            as="textarea"
            id="prompt"
            name="prompt"
            placeholder="Type your message..."
            className="chat-input"
            />
            <button type="submit" className="chat-submit">Submit</button>
        </div>
        <ErrorMessage name="prompt" component="div" className="chat-error" />
      </Form>
    </Formik>
  );
}

export default ChatFormComp;
