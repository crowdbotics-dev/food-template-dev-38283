import React from "react";
import { Text, StyleSheet, View, Image, TouchableHighlight } from "react-native";
const LiveSearchScreen = () => {



  return (
    <View style={[styles.container]}>
      <Image
        source={require("./assets/mapImg.png")}
        style={styles.blurImageStyle}
      />
       <Image
                source={require("./assets/buttonsImg.png")}
                style={styles.mapButtons}
            />
      <View style={styles.cardContainer}>
        <View style={styles.pricingContainer}>
          <View style={styles.pricing}>
            <Text style={styles.summaryText}>Order #123214</Text>
            <Text style={styles.eta}>ETA: 10 Min</Text>
          </View>

          <Text style={styles.deliveryText}>Live status</Text>
          <Image
            // @ts-ignore
            source={require("./assets/progress.png")}
            style={styles.progressImageStyle}
          />
        </View>

        <View style={styles.mainLocContainer}>
          <Image
            // @ts-ignore
            source={require("./assets/location.png")}
            style={styles.location}
          />
          <View>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>S Main St, Los Angeles</Text>
              <Text style={styles.subLocationText}>Food Location</Text>
            </View>
            <View style={styles.deliveryContainer}>
              <Text style={styles.locationText}>4041 8th Street, San Francisco</Text>
              <Text style={styles.subLocationText}>Delivery Location</Text>
            </View>

          </View>
        </View>

        <View style={{ marginTop: 30 }}>
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
    height: 320,
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
    fontSize: 16,
    color: "#313633",
    marginVertical: 5
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
  },
  mainLocContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5, marginBottom: 10,
    marginLeft: -5
  },
  locationContainer: { marginBottom: 15 },
  deliveryContainer: {},
  location: { height: 80, width: 28, resizeMode: "contain", marginRight: 10 },
  locationText: {
    fontSize: 12,
    color: "#313633",
  },
  subLocationText: { fontSize: 12, color: "#7C7C7C", marginTop: 3 },
  eta:{ fontSize: 18, color: "#2A2B2E" },
  progressImageStyle: { height: 13, width: 350, resizeMode: "contain", alignSelf: "center", marginBottom: 15, marginTop: 5 },
  mapButtons:{height: 300, width: 300, resizeMode: "contain", position: 'absolute', alignSelf: "center", top: 10,},
});

export default LiveSearchScreen;


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