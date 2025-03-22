export type ActionResult = {
    errors?: ActionErrors;
}

export function instanceOfActionErrors(object: object): object is ActionErrors {
    return 'fieldErrors' in object || 'formErrors' in object || 'backError' in object;
}

export type ActionErrors = {
    fieldErrors?: FieldErrors;
    formErrors?: string[];
    backError?: string[];
}

export type FieldErrors = { 
    [x: string]: string | undefined; 
    [x: number]: string | undefined; 
    [x: symbol]: string | undefined; 
}