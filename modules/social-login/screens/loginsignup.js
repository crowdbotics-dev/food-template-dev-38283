//@ts-nocheck
import React, { useState } from "react"
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
  Pressable
} from "react-native"
import { Checkbox } from "react-native-paper"
import {
  AppleButton,
  appleAuthAndroid
} from "@invertase/react-native-apple-authentication"
import { useSelector, useDispatch } from "react-redux"
import { HOME_SCREEN_NAME, validateEmail } from "./constants"
import { buttonStyles, textInputStyles, Color } from "./styles"
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes
} from "@react-native-google-signin/google-signin"
import { LoginManager, AccessToken } from "react-native-fbsdk"
import { GOOGLE_WEB_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from "../auth/utils"
import { appleForAndroid, appleForiOS } from "../auth/apple"
import {
  loginRequest,
  signupRequest,
  facebookLogin,
  googleLogin,
  appleLogin
} from "../auth"
import { unwrapResult } from "@reduxjs/toolkit"
// import { setItem } from "../../../utils"

// Custom Text Input
export const TextInputField = props => (
  <View>
    <Text style={[textInputStyles.label, props.labelStyle]}>{props.label}</Text>
    <TextInput
      autoCapitalize="none"
      style={[textInputStyles.textInput, props.textInputStyle]}
      placeholderTextColor={Color.steel}
      underlineColorAndroid={"transparent"}
      {...props}
    />
    {!!props.error && <Text style={textInputStyles.error}>{props.error}</Text>}
  </View>
);

// Custom Button
export const Button = props => (
  <TouchableOpacity onPress={props.onPress} disabled={props.loading}>
    <View style={[buttonStyles.viewStyle, props.viewStyle]}>
      {props.loading ? (
        <ActivityIndicator
          color={props.loadingColor ? props.loadingColor : Color.white}
          style={props.loadingStyle}
        />
      ) : (
        <Text style={[buttonStyles.textStyle, props.textStyle]}>
          {props.title}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);

// Grouped Social Buttons View
const SocialButtonsView = props => (
  <View>
    <Text style={{ textAlign: "center", width: "100%", marginVertical: 5 }}>
      - or -
    </Text>
    <Button
      title="Signin with Facebook"
      viewStyle={{
        backgroundColor: Color.facebook,
        borderColor: Color.facebook,
        marginHorizontal: 5,
        marginBottom: 2
      }}
      textStyle={{ color: Color.white }}
      loading={props.loading}
      onPress={props.onFacebookConnect}
    />
    <GoogleSigninButton
      onPress={props.onGoogleConnect}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      disabled={props.loading}
      style={{ width: "99%", height: 48, marginHorizontal: 2 }}
    />
    {(Platform.OS === "ios" || appleAuthAndroid.isSupported) && (
      <AppleButton
        onPress={props.onAppleConnect}
        buttonStyle={AppleButton.Style.WHITE_OUTLINE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: "97%", // You must specify a width
          height: 44, // You must specify a height
          marginHorizontal: 5,
          marginTop: 2
        }}
      />
    )}
  </View>
);

const onFacebookConnect = async (dispatch, navigation) => {
  try {
    const fbResult = await LoginManager.logInWithPermissions([
      "public_profile",
      "email"
    ]);
    if (!fbResult.isCancelled) {
      const data = await AccessToken.getCurrentAccessToken();
      // @ts-ignore
      dispatch(facebookLogin({ access_token: data.accessToken }))
        .then(unwrapResult)
        .then(res => {
          if (res.key) {
            // setItem('token', res.key)
            navigation.navigate(HOME_SCREEN_NAME);
          }
        });
    }
  } catch (err) {
    console.log("Facebook Login Failed: ", JSON.stringify(err));
  }
};

const onGoogleConnect = async (dispatch, navigation) => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: false,
    iosClientId: GOOGLE_IOS_CLIENT_ID
  });
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    const tokens = await GoogleSignin.getTokens();
    // @ts-ignore
    dispatch(googleLogin({ access_token: tokens.accessToken }))
      .then(unwrapResult)
      .then(async res => {
        if (res.key) {
          await setItem('token', res.key)
          navigation.navigate(HOME_SCREEN_NAME);
        }
      });
  } catch (err) {
    if (err.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert("Error", "The user canceled the signin request.");
    }
  }
};

const onAppleConnect = async (dispatch, navigation) => {
  try {
    const signinFunction = Platform.select({
      ios: appleForiOS,
      // @ts-ignore
      android: appleForAndroid
    });
    const result = await signinFunction();
    dispatch(
      // @ts-ignore
      appleLogin({ id_token: result.id_token, access_token: result.code })
    )
      .then(unwrapResult)
      .then(res => {
        if (res.key) {
          // setItem('token', res.key)
          navigation.navigate(HOME_SCREEN_NAME);
        }
      });
  } catch (err) {
    console.log(JSON.stringify(err));
  }
};

export const SignupTab = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState({
    email: "",
    password: ""
  });

  // @ts-ignore
  const { api } = useSelector(state => state.Login);
  const dispatch = useDispatch();

  const onSignupPress = async () => {
    setValidationError({ email: "", password: "" });
    if (!validateEmail.test(email)) {
      return setValidationError({
        email: "Please enter a valid email address.",
        password: ""
      });
    }

    if (!password) {
      return setValidationError({
        email: "",
        password: "Please enter a valid password"
      });
    }

    if (password !== confirmPassword) {
      return setValidationError({
        email: "",
        password: "Confirm password and password do not match."
      });
    }
    // @ts-ignore
    dispatch(signupRequest({ email, password }))
      // @ts-ignore
      .then(unwrapResult)
      .then(async (res) => {
        // await setItem('token', res.token)
        // await setItem('userID', res?.user?.id.toString())
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigation.navigate(HOME_SCREEN_NAME);
        // Alert.alert(
        //   "Signup Success",
        //   "Registration Successful. A confirmation will be sent to your e-mail address."
        // );
      })
      .catch(err => console.log(err.message));
  };

  const resetValidations = () => {
    return setValidationError({
      email: "",
      password: ""
    });
  }

  const handleInputEmail = (value) => {
    setEmail(value)
    resetValidations()
  }

  const handleInputPassword = (value) => {
    setPassword(value)
    resetValidations()
  }

  const handleInputConfirmPassword = (value) => {
    setConfirmPassword(value)
    resetValidations()
  }

  return (
    <KeyboardAvoidingView>
      <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
        <TextInputField
          keyboardType="email-address"
          label="Email address"
          placeholder="Email address"
          onChangeText={value => handleInputEmail(value)}
          value={email}
          error={validationError.email}
        />
        <TextInputField
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={value => handleInputPassword(value)}
          value={password}
          error={validationError.password}
        />
        <TextInputField
          label="Confirm Password"
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={value => handleInputConfirmPassword(value)}
          value={confirmPassword}
        />
      </View>
      <Button
        title="Sign Up"
        loading={api.loading === "pending"}
        onPress={onSignupPress}
      />
      <SocialButtonsView
        loading={api.loading === "pending"}
        onFacebookConnect={() => onFacebookConnect(dispatch, navigation)}
        onGoogleConnect={() => onGoogleConnect(dispatch, navigation)}
        onAppleConnect={() => onAppleConnect(dispatch, navigation)}
      />
      {!!api.error && (
        <Text style={textInputStyles.error}>{api.error.message}</Text>
      )}
    </KeyboardAvoidingView>
  );
};

export const SignInTab = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({
    email: "",
    password: ""
  });

  // @ts-ignore
  const { api } = useSelector(state => state.Login);
  const dispatch = useDispatch();

  const onSigninPress = async () => {
    if (!validateEmail.test(email)) {
      return setValidationError({
        email: "Please enter a valid email address.",
        password: ""
      });
    }

    if (!password) {
      return setValidationError({
        email: "",
        password: "Please enter a valid password"
      });
    }

    // @ts-ignore
    dispatch(loginRequest({ username: email, password }))
      .then(unwrapResult)
      .then(async res => {
        if (res.token) {
          // await setItem('token', res.token)
          // await setItem('userID', res?.user?.id.toString())
          setEmail("");
          setPassword("")
          navigation.navigate(HOME_SCREEN_NAME);
        }
      })
      .catch(err => console.log(err.message));
  };

  const resetValidations = () => {
    return setValidationError({
      email: "",
      password: ""
    });
  }

  const handleInputEmail = (value) => {
    setEmail(value)
    resetValidations()
  }

  const handleInputPassword = (value) => {
    setPassword(value)
    resetValidations()
  }

  return (
    <KeyboardAvoidingView>
      <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
        <TextInputField
          keyboardType="email-address"
          label="Email address"
          placeholder="Email address"
          onChangeText={value => handleInputEmail(value)}
          value={email}
          error={validationError.email}
        />
        <TextInputField
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={value => handleInputPassword(value)}
          value={password}
          error={validationError.password}
        />
      </View>

      <Button
        title="Login"
        loading={api.loading === "pending"}
        onPress={onSigninPress}
      />

      {!!api.error && (
        <Text style={textInputStyles.error}>{api.error.message}</Text>
      )}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("PasswordReset");
          }}
        >
          <Text>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <SocialButtonsView
        loading={api.loading === "pending"}
        onFacebookConnect={() => onFacebookConnect(dispatch)}
        onGoogleConnect={() => onGoogleConnect(dispatch)}
        onAppleConnect={() => onAppleConnect(dispatch)}
      />
    </KeyboardAvoidingView>
  );
};


import { Image, StyleSheet, TouchableHighlight } from "react-native";
import { setItem } from "../../../store"

export const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validationError, setValidationError] = useState({
    email: "",
    password: ""
  });

  const [checked, setChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  // @ts-ignore
  const { api } = useSelector(state => state.Login);
  const dispatch = useDispatch();

  const onSigninPress = async () => {

    if (!validateEmail.test(email)) {
      return setValidationError({
        email: "Please enter a valid email address.",
        password: ""
      });
    }

    if (!password) {
      return setValidationError({
        email: "",
        password: "Please enter a valid password"
      });
    }

    // @ts-ignore
    setIsLoading(true)
    dispatch(loginRequest({ username: email, password }))
      .then(unwrapResult)
      .then(async res => {
        if (res.token) {
          await setItem('token', res.token)
          await setItem('user', JSON.stringify(res?.user))
          setEmail("");
          setPassword("")
          navigation.navigate(HOME_SCREEN_NAME);
          setIsLoading(false)
        }
      })
      .catch(err => { setIsLoading(false); console.log(err.message) });
  };

  const resetValidations = () => {
    return setValidationError({
      email: "",
      password: ""
    });
  }

  const handleInputEmail = (value) => {
    setEmail(value)
    resetValidations()
  }

  const handleInputPassword = (value) => {
    setPassword(value)
    resetValidations()
  }

  return (
    <View style={styles.container}>
      {isLoading && <Loader></Loader>}
      <View style={styles.heading}>
        <Text style={styles.headingText}>Welcome Back</Text>
        <Text style={styles.text}>Lorem ipsum dolor sit amet, {'\n'}consectetur adipiscing elit. Non at sed.</Text>
      </View>
      <View>
        <View style={styles.emailContainer}>
          <Text style={styles.mr10}>Email</Text>
          <Input
            placeholder='Email'
            onChangeText={handleInputEmail}
            errorText={validationError.email}
          />
        </View>
        <View>
          <Text style={styles.mr10}>Password</Text>
          <Input
            placeholder='Password'
            onChangeText={handleInputPassword}
            errorText={validationError.password}
            secure={true}
          />
        </View>
        <View style={styles.forgetContainer}>
          <View style={styles.rememberContainer}>
            <Checkbox color={"#000"} status={checked ? 'checked' : 'unchecked'}
              onPress={() => setChecked(!checked)} />
            <Text style={{ paddingLeft: 5 }}>Remember me</Text>
          </View>
          <Text>Forget Password?</Text>
        </View>
        <View style={styles.loginContainer}>
          <SignInButton onPress={onSigninPress}>Log In</SignInButton>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or Sign In With</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.imageContainer}>
          <Pressable style={styles.iconContainer} onPress={() => onGoogleConnect(dispatch)}>
            <Image
              // @ts-ignore
              source={require("../../../assets/googleIcon.png")}
              style={styles.icon}
            />
            <Text style={styles.socialText}>Google</Text>
          </Pressable>
          <Pressable style={styles.iconContainer} onPress={() => onFacebookConnect(dispatch)}>
            <Image
              // @ts-ignore
              source={require("../../../assets/fbIcon.png")}
              style={styles.icon}
            />
            <Text style={styles.socialText}>Facebook</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validationError, setValidationError] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);


  // @ts-ignore
  const { api } = useSelector(state => state.Login);
  const dispatch = useDispatch();

  const onSignupPress = async () => {
    setValidationError({ email: "", password: "" });
    if (!validateEmail.test(email)) {
      return setValidationError({
        email: "Please enter a valid email address.",
        password: ""
      });
    }

    if (!password) {
      return setValidationError({
        email: "",
        password: "Please enter a valid password"
      });
    }

    if (password !== confirmPassword) {
      return setValidationError({
        email: "",
        password: "Confirm password and password do not match."
      });
    }
    setIsLoading(true)
    // @ts-ignore
    dispatch(signupRequest({ email, password }))
      // @ts-ignore
      .then(unwrapResult)
      .then(async (res) => {
        // await setItem('token', res.token)
        // await setItem('userID', res?.user?.id.toString())
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsLoading(false)
        Alert.alert(
          "Signup Success",
          "Registration Successful. A confirmation will be sent to your e-mail address.",
          [
            { text: "OK", onPress: () => navigation.navigate("LoginScreen") }
          ]
        )
      })
      .catch(err => { console.log(err.message); setIsLoading(false) });
  };

  const resetValidations = () => {
    return setValidationError({
      email: "",
      password: ""
    });
  }

  const handleInputEmail = (value) => {
    setEmail(value)
    resetValidations()
  }

  const handleInputPassword = (value) => {
    setPassword(value)
    resetValidations()
  }

  const handleInputConfirmPassword = (value) => {
    setConfirmPassword(value)
    resetValidations()
  }

  return (
    <View style={styles.container}>
      {isLoading && <Loader></Loader>}
      <View style={styles.heading}>
        <Text style={styles.headingText}>Welcome Back</Text>
        <Text style={styles.text}>Lorem ipsum dolor sit amet, {'\n'}consectetur adipiscing elit. Non at sed.</Text>
      </View>
      <View>
        <View style={styles.emailContainer}>
          <Text style={styles.mr10}>Email</Text>
          <Input
            placeholder='Email'
            onChangeText={handleInputEmail}
            errorText={validationError.email}
          />
        </View>
        <View>
          <Text style={styles.mr10}>Password</Text>
          <Input
            placeholder='Password'
            onChangeText={handleInputPassword}
            errorText={validationError.password}
            secure={true}
          />
        </View>
        <View>
          <Text style={[styles.mr10, { marginTop: 10 }]}>Confirm Password</Text>
          <Input
            placeholder='Confirm Password'
            onChangeText={handleInputConfirmPassword}
            errorText={validationError.password}
            secure={true}
          />
        </View>

        <View style={[styles.loginContainer, { marginTop: 40 }]}>
          <SignInButton onPress={onSignupPress}>Sign Up</SignInButton>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or Sign Up With</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.imageContainer}>
          <Pressable style={styles.iconContainer} onPress={() => onGoogleConnect(dispatch)}>
            <Image
              // @ts-ignore
              source={require("../../../assets/googleIcon.png")}
              style={styles.icon}
            />
            <Text style={styles.socialText}>Google</Text>
          </Pressable>
          <Pressable style={styles.iconContainer} onPress={() => onFacebookConnect(dispatch)}>
            <Image
              // @ts-ignore
              source={require("../../../assets/fbIcon.png")}
              style={styles.icon}
            />
            <Text style={styles.socialText}>Facebook</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    backgroundColor: "#fff"
  },
  heading: {

  },
  headingText: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 5
  },
  emailContainer: {
    marginBottom: 10
  },
  mr10: {
    marginLeft: 10,
    marginBottom: 10
  },
  forgotPassword: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40
  },
  loginContainer: {
    marginTop: "5%",
    width: "90%",
    alignSelf: "center"
  },
  orContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    alignSelf: "center"
  },
  line: {
    height: 1,
    width: 90,
    backgroundColor: "rgba(0, 0, 0, 0.05)"
  },
  orText: {
    marginVertical: 40,
    alignSelf: "center",
    fontSize: 12,
    color: "#231F20",
    opacity: 0.5
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between"
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "47%",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#F7F7F7"
  },
  icon: {
    height: 18,
    width: 18,
    resizeMode: "contain",
    marginRight: 10
  },
  footerContainer: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "row"
  },
  footerText: {
    color: "#6B6B6B"
  },
  text: { color: "#888888", lineHeight: 20 },
  forgetContainer: {
    paddingRight: 5,
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: -8
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",

  },
  socialText: { color: "#222222" }
});


const SignInButton = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor='#DDDDDD'>
      <View style={[btnStyles.button, {
        backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
        height: props.height ? props.height : 49,
        borderWidth: props.borderWidth ? props.borderWidth : 0,
        borderColor: props.borderColor ? props.borderColor : "#000000"
      }]}>
        <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>{props.children}</Text>
      </View>
    </TouchableHighlight>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});

const Input = (props) => {
  return (
    <View>
      <TextInput
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.onChangeText(num)}
        placeholderTextColor='#000'
        secureTextEntry={props.secure ? true : false}
        editable={props.editable !== false}
      />
      {props.errorText ? <Text style={textStyles.error}>{props.errorText}</Text> : null}
    </View>
  );
};

const textStyles = StyleSheet.create({
  input: {
    backgroundColor: "rgba(217, 217, 217, 0.2)",
    height: 53,
    borderColor: "#C4C4C4",
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    paddingHorizontal: 10
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});


const Loader = () => {
  return (
    <View style={loaderStyles.container}>
      <View style={loaderStyles.loaderContainer}>
        <ActivityIndicator color="#000" />
      </View>
    </View>
  );
};
const loaderStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },
  loaderContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    shadowColor: "#000",
    elevation: 3
  }
});
