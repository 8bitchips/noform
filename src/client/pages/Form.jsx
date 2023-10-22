import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getForm from '@wasp/queries/getForm';
import updateForm from '@wasp/actions/updateForm';

export function FormPage() {
  const { formId } = useParams();
  const { data: form, isLoading, error } = useQuery(getForm, { id: formId });
  const updateFormFn = useAction(updateForm);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    if (form) {
      setFields(form.fields.split(','));
    }
  }, [form]);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleFieldChange = (e, index) => {
    const newFields = [...fields];
    newFields[index] = e.target.value;
    setFields(newFields);
  };

  const handleSubmit = () => {
    updateFormFn({ id: formId, fields: fields.join(',') });
  };

  return (
    <div className='p-4'>
      {fields.map((field, index) => (
        <input
          key={index}
          type='text'
          value={field}
          onChange={(e) => handleFieldChange(e, index)}
          className='border rounded py-2 px-4 mb-2'
        />
      ))}
      <button
        onClick={handleSubmit}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Save
      </button>
      <Link to={`/forms`} className='ml-4 text-blue-500'>Back to Forms</Link>
    </div>
  );
}