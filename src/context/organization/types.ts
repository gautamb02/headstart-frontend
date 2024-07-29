export interface Organization {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    createdAt: {
      _seconds: number;
      _nanoseconds: number;
    };
  }
  
  export interface State {
    organizations: Organization[];
    message: string;
  }
  
  export interface Action {
    type: string;
    payload?: any;
  }
  