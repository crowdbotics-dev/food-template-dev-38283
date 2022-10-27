// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    Pressable,
    ScrollView
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../store";

const AccountScreen = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userAddress, setUserAddress] = useState("");

    const userInfo = useSelector(state => state?.ecommerce?.user);

    const handleGetUser = async () => {
        await dispatch(getUserInfo()).then((res) => { }).catch((err) => console.log(err))
    }

    useEffect(() => {
        if (!userInfo) {
            handleGetUser()
        }
    }, [])


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.profileContainer}>
                    <Image source={require("./assets/profilePicture.png")} style={styles.profilePicture} />
                    <Text style={styles.profileName}>{userInfo?.username}</Text>
                    <Text style={styles.profilemail}>{userInfo?.email}</Text>
                </View>

                <View style={[styles.accountHeadings]}>
                    <Text style={styles.inputText1}>Edit Account</Text>
                    <Text style={[styles.inputText1, { color: "#EA4335" }]}>Delete Account</Text>
                </View>

                <View style={styles.inputs}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>First name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setFirstName(text)}
                            value={userInfo?.first_name}
                            placeholder="Enter"
                            placeholderTextColor="#000"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setLastName(text)}
                            value={userInfo?.last_name}
                            placeholder="Enter"
                            placeholderTextColor="#000"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputText}>Address 1</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setUserAddress(text)}
                            placeholder="Enter"
                            placeholderTextColor="#000"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                </View>
                <Text style={styles.connectAcc}>Connected accounts</Text>
                <View style={styles.subHeader}>
                    <View style={styles.mainContainer}>
                        <Image
                            // @ts-ignore
                            source={require("./assets/btnSigninwithApple.png")}
                            style={styles.dot}
                        />
                        <View>
                            <View style={styles.orderStatusContainer}>
                                <Text style={styles.statusHeading}>Apple</Text>
                                <Text style={[styles.statusHeading, styles.statusTime]}>Connected</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.mainContainer}>
                        <Image
                            // @ts-ignore
                            source={require("./assets/btnSigninwithGoogle.png")}
                            style={styles.dot}
                        />
                        <View>
                            <View style={styles.orderStatusContainer}>
                                <Text style={styles.statusHeading}>Google</Text>
                                <Text style={[styles.statusHeading, styles.statusTime]}>Connected</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.mainContainer, styles.borderNull]}>
                        <Image
                            // @ts-ignore
                            source={require("./assets/btnSigninwithFacebook.png")}
                            style={styles.dot}
                        />
                        <View>
                            <View style={styles.orderStatusContainer}>
                                <Text style={styles.statusHeading}>Facebook</Text>
                                <Text style={[styles.statusHeading, styles.statusTime]}>Connected</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Button buttonText={"Update"} />
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    profileContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 15
    },
    profilePicture: {
        width: 82,
        height: 82,
        borderRadius: 40
    },
    profileName: {
        fontSize: 20,
        marginTop: 10
    },
    profilemail: {
        fontSize: 14,
        color: "grey"
    },
    inputs: {
        marginTop: 20,
        paddingHorizontal: 20
    },
    inputContainer: {
        flexDirection: "column",
        justifyContent: "center"
    },
    inputText: {
        fontSize: 13,
        marginLeft: 20,
        color: "#111112"
    },
    input: {
        borderWidth: 1,
        borderColor: "#e6e6e6",
        borderRadius: 10,
        padding: 10,
        paddingLeft: 20,
        marginVertical: 10,
        width: "100%",
        height: 50,
        backgroundColor: "#f9f9f9"
    },
    lockIcon: {
        position: "absolute",
        right: 20,
        top: 40,
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    bottomTextContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: 20,
        marginTop: 40
    },
    bottomText: {
        fontSize: 12,
        textAlign: "center",
        marginHorizontal: 20
    },
    accountHeadings: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginHorizontal: 30,
        paddingVertical: 15,
        borderBottomColor: "rgba(51, 51, 51, 0.05)",
        borderBottomWidth: 1,
        marginTop: 10
    },
    inputText1: {
        fontSize: 15,
        color: "#12D790"
    },
    connectAcc: { fontSize: 14, fontWeight: "bold", color: "#000", paddingHorizontal: 30, marginVertical: 10 },
    subHeader: {
        backgroundColor: "#F9F9F9",
        paddingHorizontal: 30,
        paddingTop: 10,
        paddingBottom: 15
    },
    mainContainer: {
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingHorizontal: 10,
        alignItems: "center",
        marginTop: 10,
        borderBottomColor: "rgba(51, 51, 51, 0.05)",
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    borderNull: { borderBottomWidth: 0 },
    dot: { height: 16, width: 16, resizeMode: "contain", marginLeft: -10 },
    orderStatusContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 8,
    },
    statusHeading: { fontSize: 14, width: "50%", color: "#222222" },
    statusText: { paddingHorizontal: 10, fontSize: 10, color: "#2A2B2E" },
    statusTime: { textAlign: 'right', color: "#12D790", fontWeight: "bold" },
});

export default AccountScreen;



const Button = (params) => {
    const btnStyle = {
        backgroundColor: params.outline ? "#fff" : "#000",
        borderColor: params.outline ? "#000" : "#fff",
        borderWidth: 1
    };
    const btnText = {
        color: params.outline ? "#000" : "#fff"
    };
    return (
        <View style={buttonStyles.btnContainer}>
            <Pressable style={[buttonStyles.btn, btnStyle]} onPress={params.onPress}>
                <Text style={[buttonStyles.btnText, btnText]}>{params.buttonText}</Text>
                <View style={buttonStyles.childrenContainer}>{params.children}</View>
            </Pressable>
        </View>
    );
};

const buttonStyles = StyleSheet.create({
    btnContainer: {
        paddingHorizontal: 40,
        justifyContent: "center",
        marginVertical: 20
    },
    btn: {
        backgroundColor: "black",
        height: 50,
        width: "100%",
        padding: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "rgba(0, 0, 0, 0.2)",
        elevation: 10,
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