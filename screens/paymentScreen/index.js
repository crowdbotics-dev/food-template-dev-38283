import React, { useState } from "react";
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    Image,
    TextInput,
    Pressable,
    ImageBackground
} from "react-native";

const PaymentScreen = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [name, setName] = useState("");
    return (
        <View style={styles.container}>
            <ScrollView>
                <TabView tabTitles={["Linked cards", "Add card"]} selected={0} />
                <View style={styles.cardInfo}>
                    <Image
                        // @ts-ignore
                        source={require("./assets/Card-large.png")}
                        style={styles.card}
                    />
                    <Image
                        // @ts-ignore
                        source={require("./assets/3Dots.png")}
                        style={styles.threeDots}
                    />
                    <View style={styles.inputs}>
                        <View style={styles.inputContainer}>
                            <View style={styles.deleteCardContainer}>
                                <Text style={styles.inputText}>Card Number</Text>
                                <Image
                                    // @ts-ignore
                                    source={require("./assets/deleteIcon.png")}
                                    style={styles.deleteIcon}
                                />
                            </View>
                            <TextInput
                                style={styles.cardInput}
                                onChangeText={(text) => setCardNumber(text)}
                                value={cardNumber}
                                placeholder="1234 5678 9012 3456"
                                placeholderTextColor="#000"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.inputHeadings}>
                            <Text style={styles.inputText}>Expiration Date</Text>
                            <Text style={styles.inputText}>CVV</Text>
                        </View>
                        <View style={styles.halfInputs}>
                            <TextInput
                                style={[styles.input, styles.input1]}
                                onChangeText={(text) => setCardExpiry(text)}
                                value={cardExpiry}
                                placeholder="10/24"
                                placeholderTextColor="#000"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <TextInput
                                style={[styles.input, styles.input2]}
                                onChangeText={(text) => setCvv(text)}
                                value={cvv}
                                placeholder="374"
                                placeholderTextColor="#000"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={[styles.inputText, { marginTop: 10 }]}>Card Holder Name</Text>
                            <TextInput
                                style={styles.userInput}
                                onChangeText={(text) => setName(text)}
                                value={name}
                                placeholder="Username"
                                placeholderTextColor="#000"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                    </View>
                </View>
                <ImageBackground source={require(
                    // @ts-ignore
                    "./assets/walletImage.png")} resizeMode="cover" style={styles.walletImage}>

                </ImageBackground>
                <Button buttonText={"Update payment"} />

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20
    },
    cardInfo: {
        padding: 20,
    },
    card: {
        alignSelf: "center",
        width: 354,
        height: 164,
        resizeMode: "contain"
    },
    threeDots: {
        alignSelf: "center",
        marginVertical: 10,
        width: 19,
        height: 8,
        resizeMode: "contain"
    },
    deleteCardContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    deleteIcon: {
        marginRight: 10,
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    inputs: {
        justifyContent: "center"
    },
    inputContainer: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center"
    },
    cardInput: {
        borderWidth: 1,
        borderColor: "#e6e6e6",
        borderRadius: 10,
        marginVertical: 10,
        paddingLeft: 20,
        backgroundColor:"#f9f9f9"
    },
    userInput: {
        borderWidth: 1,
        borderColor: "#e6e6e6",
        borderRadius: 10,
        marginVertical: 10,
        paddingLeft: 20,
        backgroundColor:"#f9f9f9"
    },
    inputText: {
        fontSize: 14,
        marginLeft: 20
    },
    input: {
        padding: 10,
        paddingLeft: 20,
        height: 49,
        backgroundColor:"#f9f9f9"
    },
    halfInputs: {
        borderWidth: 1,
        borderColor: "#e6e6e6",
        borderRadius: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        paddingRight: 10,
        backgroundColor:"#f9f9f9"
    },
    inputHeadings: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingRight: 20,
        marginBottom: 10
    },
    input1: {
        height: 49,
        borderRightWidth: 0,
        borderRightColor: "#fff",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        

    },
    input2: {
        height: 49,
        borderLeftWidth: 0,
        borderLeftColor: "#fff",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    walletImage: { height: 150, width: 200, resizeMode: "contain", marginTop: -20 }
});
export default PaymentScreen;
const TabView = ({ tabTitles, selected }) => {
    return (
        <View style={tabViewStyles.paletteContainer}>
            {tabTitles.map((title, index) => (
                <View
                    style={
                        index === selected
                            ? tabViewStyles.selected
                            : tabViewStyles.unSelected
                    }
                    key={index}
                >
                    <Text>{title}</Text>
                </View>
            ))}
        </View>
    );
};

const tabViewStyles = StyleSheet.create({
    paletteContainer: {
        width: "70%",
        height: 48,
        backgroundColor: "#F1F1F1",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        padding: 6,
        marginHorizontal: 20
    },
    selected: {
        borderRadius: 10,
        flex: 1,
        backgroundColor: "#fff",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "gray",
        elevation: 10
    },
    unSelected: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F1F1F1",
        borderRadius: 10
    }
});

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
        position: 'absolute', left: 0, right: 0, bottom: 0,
        paddingHorizontal: 40,
        justifyContent: "center",
        marginBottom: 17
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