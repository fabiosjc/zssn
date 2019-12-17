import React from 'react';
const SurvivorContext = React.createContext({});

export const SurvivorProvider = SurvivorContext.Provider;
export const SurvivorConsumer = SurvivorContext.Consumer;
export default SurvivorContext;
