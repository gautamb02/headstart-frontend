// context.ts

import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { RolesState, RolesAction } from './types';
import { rolesReducer, initialState } from './reducer';

interface RolesContextProps {
  rolesstate : RolesState
  roledispatch: Dispatch<RolesAction>;
 
}

const RolesContext = createContext<RolesContextProps | undefined>(undefined);

const RolesProvider = ({ children }: { children: ReactNode }) => {
  const [rolesstate, roledispatch] = useReducer(rolesReducer, initialState);


  return (
    <RolesContext.Provider value={{rolesstate, roledispatch }}>
      {children}
    </RolesContext.Provider>
  );
};

const useRolesContext = () => {
  const context = React.useContext(RolesContext);
  if (context === undefined) {
    throw new Error('useRolesContext must be used within a RolesProvider');
  }
  return context;
};

export { RolesProvider, useRolesContext };
