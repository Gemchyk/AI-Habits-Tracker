import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './FormComp.scss';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  frequency: Yup.string().oneOf(['Daily', 'Weekly', 'Monthly'], 'Invalid frequency').required('Required'),
});

const FormComp = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        frequency: 'Daily',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values); 
        resetForm();
      }}
    >
      <Form className="habit-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <Field name="name" placeholder="e.g., Drink Water" className="form-input" />
          <ErrorMessage name="name" component="div" className="form-error" />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <Field name="description" placeholder="e.g., Drink 2 liters of water daily" className="form-input" />
          <ErrorMessage name="description" component="div" className="form-error" />
        </div>

        <div className="form-group">
          <label htmlFor="frequency">Frequency</label>
          <Field as="select" name="frequency" className="form-select">
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </Field>
          <ErrorMessage name="frequency" component="div" className="form-error" />
        </div>

        <button type="submit" className="form-submit">Add Habit</button>
      </Form>
    </Formik>
  );
};

export default FormComp;
