import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, ScrollView, TouchableHighlight, Pressable, TextInput } from "react-native";

const CheckoutScreen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders([
      {
        id: 1,
        name: "1x Pizza Napoli XXL",
        price: 18,
      },
      {
        id: 2,
        name: "2x Burger American BBQ",
        price: 18,

      },
      {
        id: 3,
        name: "1x Fried Chicken Dinne",
        price: 18,
      },
    ]);
  }, []);
  return (
    <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <View style={styles.headTextContainer}>
          <Text style={styles.headText}>Address</Text>
          <Text style={styles.editText}>Edit</Text>
        </View>
        <View style={styles.inputText}>
          <View style={{ flex: 1 }}>
            <Input placeholder='8th Street, San Francisco' />
          </View>
          <Image source={require("./assets/map.png")} style={styles.mr10} />
        </View>
      </View>
      <View style={styles.mapContainer}>
        <Image source={require("./assets/mapIcon.png")} style={styles.mapIcon} />
      </View>
      <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryHeading}>Delivery to</Text>
        <Text style={styles.receiver}>Name/Surname</Text>
        <Text style={styles.address}>4041 8th Street, San Francisco</Text>
      </View>
      <View style={styles.orderContainer}>
        <Text style={styles.orderHeading}>Your order</Text>
        {
          orders && orders.map((order, index) =>
            <View style={styles.subContainer} key={index}>
              <View style={styles.headTextContainer}>
                <Text>{order.name}</Text>
                <Text style={styles.orderPrice}>${order.price}</Text>
              </View>
              <Text style={styles.orderEdit}>Edit</Text>
            </View>
          )}
      </View>

      <View style={styles.pricingContainer}>
        <View style={styles.pricing}>
          <Text style={styles.subtotalText}>Subtotal:</Text>
          <Text style={styles.subtotalText}>
            $18
          </Text>
        </View>
        <View style={styles.pricing}>
          <Text style={styles.deliveryText}>Fee & delivery</Text>
          <Text style={styles.subtotalPrice}>
            $0
          </Text>
        </View>

        <View style={styles.cardContainer}>
          <Image source={require("./assets/visa.png")} style={styles.visa} />
          <View style={[styles.headTextContainer, { paddingRight: 0 }]}>
            <Text style={styles.cardText}>**** 4321</Text>
            <Text style={styles.editText}>Edit</Text>
          </View>
        </View>

        <View style={[styles.headTextContainer, { paddingHorizontal: 10 }]}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalPrice}>$54</Text>
        </View>
      </View>
      <Button buttonText={"Order"} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15
  },
  searchContainer: {},
  inputText: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    backgroundColor: "#fff"
  },
  mr10: {
    marginRight: 10,
    height: 22,
    width: 22,
    resizeMode: "contain"
  },
  headText: {
    marginLeft: 10,
    marginVertical: 10
  },
  mapIcon: {
    height: 124,
    width: 370,
    borderRadius: 15,
    overflow: "hidden",
  },
  mapContainer: {
    marginTop: 20, marginBottom: 10, height: 124,
    width: 370,
    borderRadius: 15
  },
  headTextContainer: {
    flexDirection: "row",
    alignItems: "center", justifyContent: "space-between",
    paddingRight: 10,
  },
  orderContainer: {
    borderTopColor: "#F0F2F7",
    borderTopWidth: 1,
    borderBottomColor: "#F0F2F7",
    borderBottomWidth: 1,
    marginVertical: 10,
    paddingVertical: 15,
    paddingLeft: 15
  },
  orderHeading: { color: "#1E2022", fontWeight: "bold", marginBottom: 15 },
  subContainer: { marginBottom: 10 },
  orderPrice: { color: "#1E2022", fontWeight: "bold" },
  orderEdit: { color: "#EA4335", fontWeight: "bold", marginLeft: 20, paddingTop: 5 },
  pricingContainer: {},
  pricing: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10
  },
  subtotalText: {
    fontSize: 16,
    color: "#313633",
    marginBottom: 2
  },
  subtotalPrice: {
    fontSize: 16,
    color: "#000000",
  },
  deliveryText: {
    fontSize: 14,
    color: "#7C7C7C",
  },
  visa: {
    height: 13,
    width: 42,
    resizeMode: "contain"
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderTopColor: "#F0F2F7",
    borderTopWidth: 1,
    borderBottomColor: "#F0F2F7",
    borderBottomWidth: 1,
    marginVertical: 15,
    paddingVertical: 10
  },
  cardText: { fontSize: 16, marginRight: 10 },
  editText: { color: "#EA4335", fontWeight: "bold" },
  totalText: { color: "#313633", fontSize: 16 },
  totalPrice: { color: "#000000", fontSize: 14 },
  deliveryContainer:{paddingHorizontal: 10},
  deliveryHeading:{color:"#1E2022", fontSize: 14, fontWeight: "bold", marginBottom: 7},
  receiver:{color:"#1E2022", fontSize: 13,  marginBottom: 4},
  address:{color:"#1E2022", fontSize: 12, marginBottom: 4}
})


export default CheckoutScreen;


export const Input = (props) => {
  return (
    <View>
      <TextInput
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor='#000000'
        editable={props.editable !== false}
      />
      {props.errorText ? <Text style={textStyles.error}>{props.errorText}</Text> : null}
    </View>
  );
};

const textStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 49,
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    paddingHorizontal: 10
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});


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
    marginVertical: 25, width: '90%', justifyContent: "center",
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