//@ts-nocheck
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableHighlight, Image, ScrollView } from "react-native";
import { useSelector } from "react-redux";

const OrderDetailScreen = ({navigation, route}) => {
const [orderDetails, setOrderDetails] = useState({})
const [orderDate, setOrderDate] = useState("");
const [orderTime, setOrderTime] = useState("");
const userInfo = useSelector(state => state?.ecommerce?.user);

  useEffect(() => {
    if (route?.params?.currentOrder) {
      const {currentOrder, orderDate, orderTime} = route?.params;
      setOrderDetails(currentOrder);
      setOrderDate(orderDate)
      setOrderTime(orderTime)
    }
  }, [route?.params]);
  return (
    <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.heading}>Order details</Text>
        <Text style={styles.inputText}>{orderDate}</Text>
        <Text style={styles.inputText}>Order ID: #{orderDetails?.number}</Text>
      </View>

      <View style={styles.subHeader}>
        <Text style={styles.orderName}>#{orderDetails?.number}</Text>
        <View style={styles.mainContainer}>
          <Image
            // @ts-ignore
            source={require("./assets/dot.png")}
            style={styles.dot}
          />
          <View>
            <View style={styles.orderStatusContainer}>
              <Text style={styles.statusHeading}>Ready to Pickup</Text>
              <Text style={[styles.statusHeading, styles.statusTime]}>{orderTime}</Text>
            </View>
            <Text style={styles.statusText}>Order ID {orderDetails?.number} from Store</Text>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
        <View style={styles.ratings}>
          <Text style={styles.ratingText}>Free shipping</Text>
          <Image
            // @ts-ignore
            source={require("./assets/ratingStars.png")}
            style={styles.ratingImg}
          />
        </View>

        <Text style={styles.orderTitle}>{orderDetails?.number}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.orderInfo}>Additional info</Text>
          <Text style={styles.orderPrice}>{orderDetails?.total_incl_tax} {orderDetails?.currency}</Text>
        </View>
        <View style={styles.customInfo}>
          <Text style={styles.customTitle}>{userInfo?.first_name ? userInfo?.first_name + " " + userInfo?.last_name : userInfo?.username}</Text>
          <Text style={styles.addInfo}>Additional info</Text>
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
              <Text style={styles.locationText}>{orderDetails?.shipping_address?.line1}</Text>
              <Text style={styles.subLocationText}>Delivery Location</Text>
            </View>

          </View>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <DetailsCard userName={userInfo?.first_name ? userInfo?.first_name + " " + userInfo?.last_name : userInfo?.username}/>
        <Button buttonText="Close" />
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  header: { backgroundColor: "#F9F9F9", paddingHorizontal: 15, paddingBottom: 10 },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#2A2B2E",
    paddingVertical: 15
  },
  orderTime: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 5,
    marginTop: 20,
    marginBottom: 10
  },
  inputText: {
    fontSize: 12,
    color: "#2A2B2E",
    lineHeight: 14,
    paddingBottom: 4
  },
  dateText: {
    fontSize: 12,
    paddingTop: 3,
    color: "#2A2B2E"
  },
  subHeader: {
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 15,
    marginTop: 3,
    paddingTop: 10,
    paddingBottom: 15
  },
  orderName: {
    fontSize: 18,
    color: "#2A2B2E"
  },
  mainContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  dot: { height: 12, width: 12, resizeMode: "contain", },
  orderStatusContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 8,
    marginTop: -2, marginBottom: 4,
  },
  statusHeading: { fontSize: 12, width: "50%", color: "#2A2B2E" },
  statusText: { paddingHorizontal: 15, fontSize: 10, color: "#2A2B2E" },
  statusTime: { textAlign: 'right', marginTop: -15 },
  ratings: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  ratingText: { fontSize: 14, color: "#7C7C7C" },
  ratingImg: { height: 16, width: 109, resizeMode: "contain" },
  orderTitle: {
    fontSize: 22,
    color: "#313633",
    marginTop: 10
  },
  orderInfo: { fontSize: 14, color: "#7C7C7C", marginTop: 5 },
  orderPrice: { fontSize: 26, color: "#000", marginTop: -10 },
  infoContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  customInfo: { borderBottomColor: "#F0F2F7", borderBottomWidth: 1, borderTopColor: "#F0F2F7", borderTopWidth: 1, marginVertical: 10, paddingBottom: 15, paddingTop: 10 },
  customTitle: {
    fontSize: 22,
    color: "#313633",
  },
  addInfo: { fontSize: 14, color: "#7C7C7C", marginTop: 5 },
  mainLocContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5, marginBottom: 10
  },
  locationContainer: { marginBottom: 15 },
  deliveryContainer: {},
  location: { height: 80, width: 28, resizeMode: "contain", marginRight: 10 },
  locationText: {
    fontSize: 12,
    color: "#313633",
  },
  subLocationText: { fontSize: 12, color: "#7C7C7C", marginTop: 3 },
  cardContainer: {
    backgroundColor: "#F9F9F9",
  }
});

export default OrderDetailScreen;


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
    marginBottom: 20, marginTop: 30, width: '80%', justifyContent: "center",
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



const DetailsCard = ({userName}) => {
  return (
    <View style={detailsCardStyles.detailsCard}>
      <View style={detailsCardStyles.pricing}>
        <Text style={detailsCardStyles.pricingText}>Card number</Text>
        <Text style={detailsCardStyles.pricingText}>
        XXXX XXXX XXXX 4321 
        </Text>
      </View>
      <View style={detailsCardStyles.pricing}>
        <Text style={detailsCardStyles.pricingText}>Expiration date</Text>
        <Text style={detailsCardStyles.pricingText}>
          08/20
        </Text>
      </View>
      <View style={detailsCardStyles.pricing}>
        <Text style={detailsCardStyles.pricingText}>Card holder</Text>
        <Text style={detailsCardStyles.pricingText}>{userName}</Text>
      </View>
    </View>
  );
};

const detailsCardStyles = StyleSheet.create({
  detailsCard: {
    height: 106,
    width: "90%",
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    paddingVertical: 10,
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 1, borderColor: "#979797",
    alignSelf: "center"
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
