export interface IPerson {
  id?: string,
  name: string,
  email: string
}

export function initPerson(options?: Partial<IPerson>): IPerson {
  const defaults = {
    id: '',
    name: '',
    email: ''
  };

  return {
    ...defaults,
    ...options,
  };
}

