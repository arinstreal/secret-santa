export interface IPerson {
  id?: string,
  name: string,
  email: string | null,
  excludedId?: string[]
}

export function initPerson(options?: Partial<IPerson>): IPerson {
  const defaults = {
    name: '',
    email: null,
    excludedId: []
  };

  return {
    ...defaults,
    ...options,
  };
}

