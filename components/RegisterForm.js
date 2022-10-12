import { Input, Text, Button } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import { useUser } from "../hooks/ApiHooks";
import { Card, ThemeProvider } from "@rneui/themed";
import { theme } from "../utils/Theme";

const RegisterForm = () => {
  const { checkUsername, postUser } = useUser();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", email: "", password: "", full_name: "" },
    mode: "onBlur",
  });

  const register = async (userData) => {
    delete userData.confirmPassword;
    try {
      const result = await postUser(userData);
    } catch (error) {
      console.error("RegisterForm error", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Card.Title>Register</Card.Title>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
          validate: async (value) => {
            const available = await checkUsername(value);
            return available ? true : "Username not available!";
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Username"
            autoCapitalize="none"
            errorMessage={
              (errors.username?.type === "required" && (
                <Text>This is required.</Text>
              )) ||
              (errors.username?.type === "minLength" && (
                <Text>Min 3 chars!</Text>
              )) ||
              (errors.username?.type === "validate" && (
                <Text>{errors.username.message}</Text>
              ))
            }
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This is required." },
          pattern: {
            value: /^[a-z0-9.]{1,128}@[a-z0-9.]{5,128}/i,
            message: "Must be valid email.",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Email"
            autoCapitalize="none"
            errorMessage={errors.email && <Text>{errors.email.message}</Text>}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: { value: true, message: "This is required." },
          minLength: { value: 5, message: "Min length 5 chars." },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            placeholder="Password"
            errorMessage={
              errors.password && <Text>{errors.password.message}</Text>
            }
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          validate: (value) => {
            if (value === getValues("password")) {
              return true;
            } else {
              return "Does not match with password.";
            }
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            placeholder="Confirm password"
            errorMessage={
              errors.confirmPassword && (
                <Text>{errors.confirmPassword.message}</Text>
              )
            }
          />
        )}
        name="confirmPassword"
      />

      <Controller
        control={control}
        rules={{
          required: false,
          minLength: 3,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Full name"
            autoCapitalize="words"
          />
        )}
        name="full_name"
      />

      <Button title="Register!" onPress={handleSubmit(register)} />
    </ThemeProvider>
  );
};

export default RegisterForm;
