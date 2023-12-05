import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native'; // Remove Text import
import store from './redux/store';
import { Provider } from 'react-redux';
import UserListScreen from './redux/ui'; // Fix the import

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <UserListScreen />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
