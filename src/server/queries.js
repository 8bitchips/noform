import HttpError from '@wasp/core/HttpError.js'

export const getForms = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Form.findMany({
    where: { user: { id: context.user.id } }
  });
}

export const getForm = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const form = await context.entities.Form.findUnique({
    where: { id: args.id },
    select: {
      id: true,
      title: true,
      fields: true,
      user: true
    }
  });

  if (!form) throw new HttpError(404, `No form with id ${args.id}`);

  if (form.user.id !== context.user.id) { throw new HttpError(400) }

  return form;
}