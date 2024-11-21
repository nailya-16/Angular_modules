export interface IUserRules {
  readonly path: string,
  readonly rules: {
    readonly read: boolean,
    readonly write: boolean
  }
}

export const UserRules: IUserRules[] = [
  {
    path: 'tickets',
    rules: {
      write: false,
      read: true
    }
  },
  {
    path: 'tickets/settings',
    rules: {
      write: true,
      read: false
    }
  },
  {
    path: 'order',
    rules: {
      write: true,
      read: true
    }
  }
]
