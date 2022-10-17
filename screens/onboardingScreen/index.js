import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

const OnboardingScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.upper}>
                <Image
                    // @ts-ignore
                    source={require("./assets/intro.png")}
                    style={styles.intro}
                />
                <Image
                    // @ts-ignore
                    source={require("./assets/dots.png")}
                    style={styles.dots}
                />
                <Pressable style={styles.iconContainer}>
                    <Image
                        // @ts-ignore
                        source={require("./assets/next.png")}
                        style={styles.icon}
                    />
                </Pressable>
            </View>
            <View style={styles.lower}>
                <Text style={styles.mainHeading}>
                    Sit luctus lectus felis consectetur id.
                </Text>
                <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. At habitant metus, enim varius in. Morbi diam vel varius cras. </Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    upper: {
        backgroundColor: "#D9D9D9",
        justifyContent: "flex-end",
        height: "60%"
    },
    lower: {
        flex: 4
    },
    iconContainer: {
        width: 110,
        height: 130,
        backgroundColor: "#fff",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: -100,
        left: 150
    },
    icon: {
        width: 71,
        height: 78
    },
    mainHeading: {
        fontSize: 24,
        textAlign: "center",
        alignSelf: "center",
        paddingHorizontal: 20,
        marginTop: 90,
    },
    text: {
        marginTop: 10,
        fontSize: 14,
        textAlign: "center",
        alignSelf: "center",
        opacity: 0.5,
        color: "#01041D",
        width: 282,
        lineHeight: 24
    },
    dots: {
        width: 50, height: 8, resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 50,
        marginTop: 60,
        marginLeft: 10
    },
    intro: {
        width: 70, height: 150, resizeMode: "contain",
        alignSelf: "center",
    }
});

export default OnboardingScreen;

