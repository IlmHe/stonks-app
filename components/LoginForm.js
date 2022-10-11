import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, View} from 'react-native';
import {Input, Button, Text, Card} from '@rneui/themed';
import {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {MainContext} from '../contexts/MainContext';
import {useLogin} from '../hooks/ApiHooks';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';


const LoginForm = () => {
  const {isLoggedIn, setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useLogin();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {username: '', password: ''},
  });

  const logIn = async (loginCredentials) => {
    try {
      console.log('Button pressed', isLoggedIn);
      const userData = await postLogin(loginCredentials);
      await AsyncStorage.setItem('userToken', userData.token);
      await AsyncStorage.setItem('user_id', userData.user.email);
      setUser(userData.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login - logIn', error);
      // TODO: nofify user about wrong username/password/net error?
    }
  };

  return (
    <View style={styles.container}>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 3,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Username"
              autoCapitalize="none"
              errorMessage={
                (errors.username?.type === 'required' && (
                  <Text>This is required.</Text>
                )) ||
                (errors.username?.type === 'minLength' && (
                  <Text>Min 3 chars!</Text>
                ))
              }
            />
          )}
          name="username"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
              placeholder="Password"
              errorMessage={errors.password && <Text>This is required.</Text>}
            />
          )}
          name="password"
        />
        <Button title="Sign in!" onPress={handleSubmit((data) => logIn(data))}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: vw(100),
    height: vh(80),
    backgroundColor: '#2b2e3f',
    position: 'relative',
  },
  container2: {
  }
});

export default LoginForm;
