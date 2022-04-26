export interface IPerson {
  id?: string,
  name: string,
  email: string,
  excludedId?: string[]
}

export function initPerson(options?: Partial<IPerson>): IPerson {
  const defaults = {
    id: '',
    name: '',
    email: '',
    excludedId: []
  };

  return {
    ...defaults,
    ...options,
  };
}

