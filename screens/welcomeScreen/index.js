import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable
} from "react-native";
import { getItem } from "../../store";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Welcome = ({ navigation }) => {
  const checkAuth = async () => {
    const token = await getItem("token")
    if (token) {
      navigation.replace('homeScreen')
    }
  }



  useEffect(() => {
    checkAuth();
  }, [])
  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        // @ts-ignore
        source={require("./assets/welcome.png")}
      />
      <Text style={styles.heading}>Welcome Back</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non at sed.
      </Text>
      <View style={styles.buttonContainer}>
        <Button buttonText="Sign Up" style={styles.button} onPress={() => navigation.navigate("login", {route: "SignUpScreen"})} />
        <Button
          buttonText="Login"
          style={styles.button}
          borderColor="#000"
          backgroundColor="#fff"
          textColor="#000"
          hideShadow
          onPress={() => navigation.navigate("login", {route: "LoginScreen"})}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: windowWidth,
    height: windowHeight
  },
  heading: {
    marginTop: "20%",
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center"
  },
  description: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
    paddingHorizontal: 40,
    marginVertical: 20
  },
  buttonContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 10
  },
  background: {
    width: 400,
    height: 350,
    resizeMode: "stretch"
  }
});

export default Welcome;

const Button = params => {
  const backgroundColor = params.backgroundColor || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.borderColor || backgroundColor,
    borderWidth: 1
  };
  const btnText = {
    color: textColor
  };
  return (
    <View style={[buttonStyles.btnContainer, params.style]}>
      <View style={!params.hideShadow ? buttonStyles.shadowContainer : null}>
        <Pressable
          style={[buttonStyles.btn, btnStyle]}
          onPress={params.onPress}>
          <Text style={[buttonStyles.btnText, btnText]}>
            {params.buttonText}
          </Text>
          <View style={buttonStyles.childrenContainer}>{params.children}</View>
        </Pressable>
      </View>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center"
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 50,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  childrenContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});