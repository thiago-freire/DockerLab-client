import { ZodError } from 'zod';
import { ActionErrors, FieldErrors } from "@/app/types/forms";
// import { AuthError } from 'next-auth';

/// Create an ActionErrors object with a field error
export function getErrorsForField(field: string, error: string): ActionErrors {
  return {
    fieldErrors: {
      [field]: error
    }
  }
}

/// Create an ActionErrors object with a form error
export function getErrorsForForm(error: string): ActionErrors {
  return {
    formErrors: [error]
  }
}

/// Create an ActionErrors object with a form error
export function getErrorsForBack(error: string | string[]): ActionErrors {
    if(typeof error == "string"){
        return {
            backError: [error]
        }
    }else{
        return {
            backError: error
        }
    }
  }

/// Format an error into an ActionErrors object
export function formatError(error: unknown): ActionErrors {
  
  if(error instanceof ZodError) {
    // console.log('ZodError', error);
    return formatZodError(error);
  }

//   if(error instanceof AuthError) {
//     const e = error as AuthError;
//     // console.log('AuthError', e);
//     return {
//       formErrors: [e.cause?.err?.message || e.message]
//     }
//   }
  
  if(error instanceof Error) {
    // console.log('Error', error);
    const e = error as Error;
    return {
      formErrors: [e.message]
    }
  }
  
  if(typeof error === 'string') {
    // console.log('Error message', error);
    return {
      formErrors: [error]
    }
  }

  // console.log('Unknown error', error);
  return {
    formErrors: ['An error occurred']
  }
}

/// Format a ZodError into an ActionErrors object
function formatZodError(error: ZodError): ActionErrors {
  const zodErrors = error.flatten();
  const errors: ActionErrors = {
    formErrors: zodErrors?.formErrors
  };  

  // join errors in fieldErrors to a single string
  if(zodErrors?.fieldErrors) {
    const fieldErrors: FieldErrors = {};

    for (const key in zodErrors.fieldErrors) {
      fieldErrors[key] = zodErrors.fieldErrors[key]?.join(', ');
    }
    errors.fieldErrors = fieldErrors;
  }
  return errors;
}