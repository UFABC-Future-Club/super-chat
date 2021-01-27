import React from 'react';
import { Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import Routes from './routes'

const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0094FD'
  },
};

function App() {
  return (
    <PaperProvider theme={theme}>
      <Routes />
    </PaperProvider>
  );
}


export default App