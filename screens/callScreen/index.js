import React from "react";
import { Text, StyleSheet, View, Image, TouchableHighlight, ScrollView, TextInput } from "react-native";
const CallScreen = () => {


    return (
        <View style={[styles.container]}>
            <Image
                // @ts-ignore
                source={require("./assets/mapImg.png")}
                style={styles.blurImageStyle}
            />
            <Image
                // @ts-ignore
                source={require("./assets/mapButtons.png")}
                style={styles.mapButtons}
            />

            <View style={styles.cardContainer}>
                <View style={styles.pricingContainer}>
                    <View style={styles.pricing}>
                        <Text style={styles.summaryText}>Live status</Text>
                        <Text style={styles.eta}>ETA: 10 Min</Text>
                    </View>
                    <Image
                        // @ts-ignore
                        source={require("./assets/progress.png")}
                        style={styles.progressImageStyle}
                    />
                </View>
                <View style={styles.callerContainer}>
                    <Text style={styles.caller}>Driver</Text>
                    <Text style={styles.status}>Calling mobile...</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <Image
                        // @ts-ignore
                        source={require("./assets/voic.png")}
                        style={styles.buttonImg}
                    />
                    <Image
                        // @ts-ignore
                        source={require("./assets/keyboard.png")}
                        style={styles.buttonImg}
                    />
                    <Image
                        // @ts-ignore
                        source={require("./assets/speaker.png")}
                        style={styles.buttonImg}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <Image
                        // @ts-ignore
                        source={require("./assets/add.png")}
                        style={styles.buttonImg}
                    />
                    <Image
                        // @ts-ignore
                        source={require("./assets/video.png")}
                        style={styles.buttonImg}
                    />
                    <Image
                        // @ts-ignore
                        source={require("./assets/user.png")}
                        style={styles.buttonImg}
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <Image
                        // @ts-ignore
                        source={require("./assets/phone.png")}
                        style={styles.phone}
                    />
                </View>


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(218, 218, 218, 0.01)',
        width: '100%',
    },
    mapButtons: { height: 240, width: 290, resizeMode: "contain", position: 'absolute', alignSelf: "center", top: 0, },
    cardContainer: {
        height: 410,
        backgroundColor: "rgba(252, 252, 252, 0.95)",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 25,
        position: 'absolute', left: 0, right: 0, bottom: 0,
        shadowColor: "#f2efef",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.1,
        shadowRadius: 7.84,
        elevation: 10,
        paddingTop: 10

    },
    pricing: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5
    },

    summaryText: {
        fontSize: 16,
        color: "#313633",
    },
    pricingContainer: {},

    blurImageStyle: {
        resizeMode: "cover",
        width: '100%',
        height: '100%',
    },

    eta: { fontSize: 13, color: "#2A2B2E" },
    progressImageStyle: { height: 13, width: 350, resizeMode: "contain", alignSelf: "center", marginBottom: 15, marginTop: 5 },
    callerContainer: { alignItems: "center" },
    caller: { fontSize: 30, },
    status: { fontSize: 14, color: "#77838F" },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 25
    },
    buttonImg: { height: 60, width: 60, resizeMode: "contain" },
    phone:{height: 73, width: 73, resizeMode: "contain"}
});

export default CallScreen;


