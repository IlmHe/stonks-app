import { createTheme } from "@rneui/themed";

const themeForm = createTheme({
  components: {
    Button: {
      titleStyle: {
        color: "white",
      },
      color: "#118C4F",
      buttonStyle: {
        marginBottom: 15,
      },
    },
    Card: {
      containerStyle: {
        backgroundColor: "rgba(255,255,255,0.9)",
      },
    },
    CardTitle: {
      h4: true,
      style: { color: "#118C4F" },
    },
    Input: {
      errorStyle: {
        color: "#118C4F",
        backgroundColor: "rgba(255,255,255,0.2)",
      },
      inputStyle: { color: "#ffffff" },
      inputContainerStyle: {
        borderBottomColor: "#c7fe61",
      },
      placeholderTextColor: "rgba(255,255,255,0.5)",
    },
  },
});

export { themeForm as theme };
