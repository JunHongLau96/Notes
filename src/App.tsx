import React from 'react';
import {AppProvider} from './contexts/context';
import AppNavigator from './navigation/navigator';

const App = () => {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
};

export default App;
