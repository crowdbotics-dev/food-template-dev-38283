// @ts-nocheck
import React from "react";
import { Text, StyleSheet, View, Image, TouchableHighlight, ScrollView, ImageBackground } from "react-native";
const OrderReceiveScreen = () => {


    return (
        <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
            <ImageBackground source={require("./assets/background.png")} resizeMode="cover" style={styles.image}>
                <Image source={require("./assets/mobile.png")} style={styles.mobile} />
                <DetailsCard></DetailsCard>
                <View style={styles.ratingContainer}>
                    <Text style={styles.feedText}>Tell us your feedback</Text>
                    <Text style={styles.feedMessage}>Let us know how you feel about the restaurant’s food and services</Text>
                    <Image source={require("./assets/star.png")} style={styles.star} />
                    <Text style={styles.feedText}>Write more details</Text>
                </View>
                <Button buttonText={"Submit"} />
                <Text style={styles.skip}>Skip</Text>
            </ImageBackground>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        width: '100%',

    },
    image: {
        resizeMode: "cover",
        width: '100%',
        height: 690.74,
        alignItems: "center"
    },
    mobile: { width: 241, height: 228, resizeMode: "contain", marginTop: 40, marginRight: 20 },
    ratingContainer: {
        marginHorizontal: 20,
        width: 330,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: 'rgba(256, 256, 256, 0.75)',
        paddingVertical: 15,
        shadowColor: '#000000',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    feedText: {
        color: "rgba(0, 0, 0, 0.53)", fontSize: 13, textAlign: "center", lineHeight: 15.23,
        marginVertical: 1,
    },
    feedMessage: {
        color: "#000", fontSize: 13, textAlign: "center", paddingHorizontal: 20, paddingVertical: 5, lineHeight: 15.23,
        marginVertical: 1,
    },
    star: { alignSelf: "center", width: 220, height: 36, marginBottom: 10 },
    skip:{fontSize: 18, color: "#2A2B2E", lineHeight: 21}
});

export default OrderReceiveScreen;


const Button = (props) => {
    return (
        <TouchableHighlight onPress={props.onPress} underlayColor='#DDDDDD' style={btnStyles.mainContainer}>
            <View style={[btnStyles.button, {
                backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
                height: props.height ? props.height : 49,
                borderWidth: props.borderWidth ? props.borderWidth : 0,
                borderColor: props.borderColor ? props.borderColor : "#000000"
            }]}>
                <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>{props.buttonText}</Text>
            </View>
        </TouchableHighlight>
    );
};

const btnStyles = StyleSheet.create({
    mainContainer: {
        width: '75%', justifyContent: "center",
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 10
    },
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



const DetailsCard = () => {
    return (
        <View style={detailsCardStyles.detailsCard}>
            <View style={detailsCardStyles.pricing}>
                <Text style={detailsCardStyles.pricingText}>Order</Text>
                <Text style={detailsCardStyles.pricingText}>
                    #12312434
                </Text>
            </View>
            <View style={detailsCardStyles.pricing}>
                <Text style={detailsCardStyles.pricingText}>Delivery date</Text>
                <Text style={detailsCardStyles.pricingText}>
                    08.10.2022
                </Text>
            </View>
            <View style={detailsCardStyles.pricing}>
                <Text style={detailsCardStyles.pricingText}>Total</Text>
                <Text style={detailsCardStyles.pricingText}>$54</Text>
            </View>
        </View>
    );
};

const detailsCardStyles = StyleSheet.create({
    detailsCard: {
        marginHorizontal: 20,
        height: 88,
        width: 330,
        marginTop: 30,
        borderRadius: 10,
        backgroundColor: 'rgba(256, 256, 256, 0.75)',
        paddingVertical: 10,
        shadowColor: '#000000',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    pricing: {
        marginHorizontal: 20,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        lineHeight: 20
    },
    pricingText: {
        fontSize: 13,
        lineHeight: 15.23,
        marginVertical: 1,
        color: "#000"
    },
});
