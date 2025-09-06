import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    prompt: Yup.string()
        .trim()
        .matches(/[\S]/, 'Prompt must contain at least one symbol.')
        .required('Prompt is required.'),
});

function ChatFormComp({ handleSubmit }) {
    return (
        <div>
            <Formik
                initialValues={{ prompt: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    handleSubmit(values.prompt);
                    resetForm();
                }}
            >
                <Form>
                    <Field id="prompt" name="prompt" />
                    <ErrorMessage name="prompt" component="div" style={{ color: 'red' }} />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}

export default ChatFormComp;