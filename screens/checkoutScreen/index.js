import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, ScrollView, TouchableHighlight, Pressable, TextInput, LogBox } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddress, getUserInfo, startCheckout } from "../../store";
import Loader from "../../components/Loader";

const CheckoutScreen = ({ navigation, route }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [basketData, setBasketData] = useState({});
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [currentAddress, setCurrentAddress] = useState({})
  const dispatch = useDispatch();
  const [shippingCharge, setShippingCharge] = useState({
    currency: "USD",
    excl_tax: "0.0",
    tax: "0.0"
  });


  // @ts-ignore
  const userInfo = useSelector(state => state?.ecommerce?.user);
  const userAddress = useSelector(state => state?.ecommerce?.userAddress);
  useEffect(() => {
    setTimeout(() => {
      setUser(userInfo)
      const resultLength = userAddress.length
      setCurrentAddress(userAddress[resultLength - 1])
    }, 1000);

  }, [userInfo, userAddress])

  const handleGetAddress = async () => {
    setIsLoading(true)
    await dispatch(getUserAddress()).then(async (res) => {
      setIsLoading(false)
    }).catch((err) => {
      console.log("Error: ", err);
      setIsLoading(false)
    });
  }

  const handleCheckout = async () => {
    setIsLoading(true);

    const obj = {
      basket: basketData?.url,
      guest_email: "foo@example.com",
      total: basketData?.total,
      shipping_charge: shippingCharge,
      shipping_method_code: "no-shipping-required",
      shipping_address: currentAddress,
      payment: {
        stripe: {
          enabled: true,
          amount: basketData?.total
        }
      }
    }
    try {
        await dispatch(startCheckout(obj)).then((res) => {
          setIsLoading(false);
          navigation.navigate('orderStatusScreen')
        }).catch((error) => {
          console.log("Error: ", error);
          setIsLoading(false);
        })
    } catch (error) {
      setIsLoading(false);
      console.log("Error: ", error)
    }
  }


  const handleGetUser = async () => {
    await dispatch(getUserInfo()).then((res) => { }).catch((err) => console.log(err))
  }


  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    if (route?.params?.basketData) {
      const { line_details } = route?.params?.basketData
      const {basketData} = route?.params;
      setCartProducts(line_details);
      setBasketData(route?.params?.basketData)
      setShippingCharge({ ...shippingCharge, currency: basketData.currency, excl_tax: basketData.delivery_fee, tax: basketData.total_tax })
    }
    if (route?.params?.currentAddress) {
      setCurrentAddress(route?.params?.currentAddress)
    }
    handleGetAddress();
    handleGetUser();
    
  }, [route?.params]);
  
  return (
    <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
      {isLoading && <Loader></Loader>}
      <View style={styles.headTextContainer}>
        <Text style={styles.headText}>Address</Text>
        <Text style={styles.editText}>Edit</Text>
      </View>

      <Pressable style={styles.autocomplete} onPress={() => navigation.navigate("addressScreen")}>
        <Text>{currentAddress?.line1 || "Select Address"}</Text>
        <Image source={require("./assets/map.png")} style={styles.mr10} />
      </Pressable>
      <Text style={styles.errorStyle}>{addressError}</Text>

      <View style={styles.mapContainer}>
        <Image source={require("./assets/mapIcon.png")} style={styles.mapIcon} />
      </View>
      <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryHeading}>Delivery to</Text>
        <Text style={styles.receiver}>{user?.first_name ? user?.first_name + " " + user?.last_name : user?.username}</Text>
        <Text style={styles.address}>{currentAddress?.line1}</Text>
      </View>
      <View style={styles.orderContainer}>
        <Text style={styles.orderHeading}>Your order</Text>
        {
          cartProducts && cartProducts.map((item, index) =>
            <View style={styles.subContainer} key={index}>
              <View style={styles.headTextContainer}>
                <Text><Text>{item?.quantity}x</Text>{" "}{item?.product?.title}</Text>
                <Text style={styles.orderPrice}>${item?.price_incl_tax}</Text>
              </View>
              <Text style={styles.orderEdit}>Edit</Text>
            </View>
          )}
      </View>

      <View style={styles.pricingContainer}>
        <View style={styles.pricing}>
          <Text style={styles.subtotalText}>Subtotal:</Text>
          <Text style={styles.subtotalText}>
            {basketData?.total_excl_tax_excl_discounts}{" "}{basketData?.currency}
          </Text>
        </View>
        <View style={styles.pricing}>
          <Text style={styles.deliveryText}>Fee & delivery</Text>
          <Text style={styles.subtotalPrice}>
            {basketData?.delivery_fee}{" "}{basketData?.currency}
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
          <Text style={styles.totalPrice}>{basketData?.total}{" "}{basketData?.currency}</Text>
        </View>
      </View>
      <Button buttonText={"Order"} onPress={() => handleCheckout()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
    width: '100%', height: "100%"
  },

  inputText: {
    flexDirection: "row",
    alignItems: "center",
  },
  autocomplete: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#F0F2F7",
    borderWidth: 1, borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 10
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
  deliveryContainer: { paddingHorizontal: 10 },
  deliveryHeading: { color: "#1E2022", fontSize: 14, fontWeight: "bold", marginBottom: 7 },
  receiver: { color: "#1E2022", fontSize: 13, marginBottom: 4 },
  address: { color: "#1E2022", fontSize: 12, marginBottom: 4 }
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