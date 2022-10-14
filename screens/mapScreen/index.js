import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, TouchableHighlight, ImageBackground } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
const mapScreen = () => {



  return (
    <View style={[styles.container]}>
      <Image
        source={require("../../assets/mapImg.png")}
        style={styles.blurImageStyle}
      />
      <View style={styles.cardContainer}>
        <View style={styles.ratingsStar}>
          <Text style={styles.summaryText}>Address</Text>

        </View>
        <View style={styles.pricingContainer}>
          <View style={styles.pricing}>
            <Text style={styles.subtotalText}>Street name:</Text>
            <Image
              source={require("../../assets/blurmap.png")}
              style={styles.map}
            />
          </View>
          <View style={styles.pricing}>
            <Text style={styles.deliveryText}>Kind Street, San Francisco</Text>
          </View>
        </View>
        <View style={{marginTop: 40}}>
        <Button buttonText="Confirm" />
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

  cardContainer: {
    height: 220,
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

  },
  pricing: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingsStar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15
  },
  summaryText: {
    fontSize: 23,
    color: "#000",
  },
  pricingContainer: {},
  subtotalText: {
    fontSize: 16,
    color: "#313633",
    
  },
  deliveryText: {
    fontSize: 14,
    color: "#7C7C7C",
    marginTop: -10
  },
  blurImageStyle: {
    resizeMode: "cover",
    width: '100%',
    height: '100%',
  },
  map: {
    resizeMode: "cover",
    width: 38,
    height: 48,
  }
});

export default mapScreen;


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
    width: '90%', justifyContent: "center",
    alignSelf: "center"
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