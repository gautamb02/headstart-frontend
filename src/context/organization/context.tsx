import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { State, Action } from './types';
import { reducer, initialState } from './reducer';

interface OrganizationContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const OrganizationContext = createContext<OrganizationContextProps | undefined>(undefined);

const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OrganizationContext.Provider value={{ state, dispatch }}>
      {children}
    </OrganizationContext.Provider>
  );
};

const useOrganizationContext = () => {
  const context = React.useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganizationContext must be used within an AppProvider');
  }
  return context;
};

export { OrganizationProvider ,useOrganizationContext  };
