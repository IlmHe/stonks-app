import {Keyboard, TouchableOpacity, StatusBar} from 'react-native';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigator/Navigator';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} backgroundColor={'#2b2e3f'} />
      <MainProvider>
        <TouchableOpacity
          onPress={() => Keyboard.dismiss()}
          style={{flex: 1}}
          activeOpacity={1}
        >
          <Navigator />
        </TouchableOpacity>
      </MainProvider>
    </SafeAreaProvider>
  );
};

export default App;
