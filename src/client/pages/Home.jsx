import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getForms from '@wasp/queries/getForms';
import createForm from '@wasp/actions/createForm';

export function HomePage() {
  const { data: forms, isLoading, error } = useQuery(getForms);
  const createFormFn = useAction(createForm);
  const [formTitle, setFormTitle] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateForm = () => {
    createFormFn({ title: formTitle });
    setFormTitle('');
  };

  return (
    <div className='p-4'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to formGen!</h1>
      <p className='text-lg mb-4'>This is a dynamic form generator app. You can use it to generate forms based on your input.</p>
      <p className='text-lg mb-4'>To get started, enter the details of your form using the input fields on the right. Once you're done, click the 'Generate Form' button to see the generated form below.</p>
      <p className='text-lg mb-4'>You can customize the form further by adding CSS styling or additional functionality.</p>
      <p className='text-lg mb-4'>Have fun exploring formGen!</p>

      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='Form Title'
          className='px-1 py-2 border rounded text-lg'
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />
        <button
          onClick={handleCreateForm}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Generate Form
        </button>
      </div>

      <div>
        {forms.map((form) => (
          <div
            key={form.id}
            className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'
          >
            <p>{form.title}</p>
            <Link
              to={`/form/${form.id}`}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              View Form
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}