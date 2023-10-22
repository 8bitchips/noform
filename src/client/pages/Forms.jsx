import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getForms from '@wasp/queries/getForms';
import createForm from '@wasp/actions/createForm';

export function Forms() {
  const { data: forms, isLoading, error } = useQuery(getForms);
  const createFormFn = useAction(createForm);
  const [newFormTitle, setNewFormTitle] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateForm = () => {
    createFormFn({ title: newFormTitle });
    setNewFormTitle('');
  };

  return (
    <div className=''>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='New Form'
          className='px-1 py-2 border rounded text-lg'
          value={newFormTitle}
          onChange={(e) => setNewFormTitle(e.target.value)}
        />
        <button
          onClick={handleCreateForm}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Form
        </button>
      </div>
      <div>
        {forms.map((form) => (
          <div
            key={form.id}
            className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'
          >
            <Link to={`/form/${form.id}`}>{form.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}