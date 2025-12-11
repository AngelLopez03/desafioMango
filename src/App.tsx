import { NewAppScreen } from '@react-native/new-app-screen';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import AppRouter from './routes/AppRouter';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

    return (
      <Provider store={store}>
        <NavigationContainer>
            <AppRouter />
        </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
