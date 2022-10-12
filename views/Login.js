
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../hooks/ApiHooks";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { Button, Card, ThemeProvider } from "@rneui/themed";
import { theme } from "../utils/Theme";


const Login = ({ navigation }) => {
  // props is needed for navigation
  const { setIsLoggedIn, setUser } = useContext(MainContext);
  const { getUserByToken } = useUser();
  const [showRegForm, setShowRegForm] = useState(false);

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      console.log("token", userToken);
      if (userToken != null) {
        const userData = await getUserByToken(userToken);
        setIsLoggedIn(true);
        setUser(userData);
      }
    } catch (error) {
      // token invalid on server side
      console.error("Login - checkToken", error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.droidSafeArea}>
        <Card
          containerStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            shadowColor: "transparent",
          }}
        >
          {showRegForm ? <RegisterForm /> : <LoginForm />}
          <Button
            title={showRegForm ? "Or sign in" : "Register a new account"}
            onPress={() => {
              setShowRegForm(!showRegForm);
            }}
          />
        </Card>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: "#2b2e3f",
    paddingTop: Platform.OS === "android" ? 30 : 0,
    paddingBottom: Platform.OS === "android" ? 30 : 0,
  },
  btn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
