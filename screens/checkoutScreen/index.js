// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, ScrollView, TouchableHighlight, Pressable, TextInput, LogBox } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addUserAddress, getUserInfo, startCheckout } from "../../store";
import { modules } from "@modules";
import { GlobalOptionsContext } from '@options';

const CheckoutScreen = ({ navigation, route }) => {
  const gOptions = useContext(GlobalOptionsContext)
  const AddressAutoComplete = modules[0].value.navigator;
  const [cartProducts, setCartProducts] = useState([]);
  const [basketData, setBasketData] = useState({});
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [inputAddress, setInputAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  const [addAddress, setAddAddress] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({});
  const [defaultInputValue, setDefaultInputValue] = useState("");
  const dispatch = useDispatch();
  const [shippingCharge, setShippingCharge] = useState({
    currency: "USD",
    excl_tax: "0.0",
    tax: "0.0"
  });


  const userInfo = useSelector(state => state?.ecommerce?.user);
  useEffect(() => {
    setTimeout(() => {
      setUser(userInfo)
    }, 1000);

  }, [userInfo])



  const handleAddAddresses = async () => {
    if (addAddress) {
      await dispatch(addUserAddress({
        title: gOptions.title,
        first_name: user?.first_name,
        last_name: user?.last_name,
        line1: currentAddress.formatted_address,
        line4: currentAddress.city,
        state: currentAddress.state,
        is_default_for_shipping: true,
        is_default_for_billing: true,
        country: gOptions.oscar_countries,
        lat: currentAddress.lat,
        lng: currentAddress.lng,
      })).then((res) => {}).catch((err) => {
        console.log("Error: ", err)
      })
    }
  };

  const handleCheckout = async () => {
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
      if(currentAddress?.state && currentAddress?.line4){
        await handleAddAddresses();
        setIsLoading(true);
        await dispatch(startCheckout(obj)).then((res) => {
          setIsLoading(false);
          navigation.navigate('orderStatusScreen')
        }).catch((error) => {
          console.log("Error: ", error);
          setIsLoading(false);
        })
      }else{
        setAddressError("Please select address first");
      }
     
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
      const { basketData } = route?.params;
      setCartProducts(line_details);
      setBasketData(route?.params?.basketData)
      setShippingCharge({ ...shippingCharge, currency: basketData.currency, excl_tax: basketData.delivery_fee, tax: basketData.total_tax })
    }
    if (route?.params?.currentAddress) {
      const { currentAddress } = route?.params;
      setCurrentAddress({
        title	:	currentAddress.title,
        first_name	:	currentAddress.first_name,
        last_name	:	currentAddress.last_name,
        line1	:	currentAddress.line1,
        line2	:	currentAddress.line2,
        line3	:	currentAddress.line3,
        line4	:	currentAddress.line4,
        state	:	currentAddress.state,
        postcode	:	currentAddress.postcode,
        phone_number	:	currentAddress.phone_number,
        notes	:	currentAddress.notes,
        is_default_for_shipping	:	currentAddress.is_default_for_shipping,
        is_default_for_billing	:	currentAddress.is_default_for_billing,
        country	:	currentAddress.country,
        lat	:	currentAddress.lat,
        lng	:	currentAddress.lng
      });
      setDefaultInputValue(currentAddress?.line1);
      setAddAddress(false)
    }

    handleGetUser();
  }, [route?.params]);

  const handleSelectAddress = (data, address) => {
    setInputAddress("")
    setAddressError("")
    setDefaultInputValue(data.description);
    const arr = address.formatted_address.split(',')
    const reverse = arr.reverse()
    setCurrentAddress({
      title	:	gOptions.title,
      first_name	:	user.first_name,
      last_name	:	user.last_name,
      line1	:	address.formatted_address,
      line4	:	reverse[2],
      state	:	reverse[1],
      is_default_for_shipping	:	true,
      is_default_for_billing	:	true,
      country	:	gOptions.oscar_countries,
      lat: address.geometry.location.lat,
      lng: address.geometry.location.lng      
    });
    setAddAddress(true);
  }

  const handleChangeText = (text) => {
    setInputAddress(text);
    setAddressError("")
  }

  return (
    <View style={[styles.container]}>
      {isLoading && <Loader></Loader>}
      <View style={styles.headTextContainer}>
        <Text style={styles.headText}>Address</Text>
        <Pressable onPress={() => navigation.navigate("addressScreen")}>
          <Text style={styles.editText}>Edit</Text>
        </Pressable>

      </View>

      <View style={[styles.autocomplete, { width: "100%", height: inputAddress ? "50%" : 50, backgroundColor: "#fff" }]}>
        <AddressAutoComplete onAddressSelect={handleSelectAddress} onChangeText={handleChangeText} defaultInputValue={defaultInputValue} />
        <Pressable onPress={() => navigation.navigate("addressScreen")}>
          <Image source={require("./assets/map.png")} style={styles.mr10} />
        </Pressable>
      </View>



      <Text style={{color: "#f77474"}}>{addressError}</Text>

      <View style={styles.mapContainer}>
        <Image source={require("./assets/mapIcon.png")} style={styles.mapIcon} />
      </View>
      <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryHeading}>Delivery to</Text>
        <Text style={styles.receiver}>{user?.first_name ? user?.first_name + " " + user?.last_name : user?.username}</Text>
        <Text style={styles.address}>{currentAddress?.line1 || currentAddress?.formatted_address}</Text>
      </View>
      <View style={styles.orderContainer}>
        <Text style={styles.orderHeading}>Your order</Text>
        {
          cartProducts && cartProducts.map((item, index) =>

            <ScrollView style={styles.subContainer} key={index}>
              <View style={styles.headTextContainer}>
                <Text><Text>{item?.quantity}x</Text>{" "}{item?.product?.title}</Text>
                <Text style={styles.orderPrice}>${item?.price_incl_tax}</Text>
              </View>
              <Text style={styles.orderEdit}>Edit</Text>
            </ScrollView>
          )}
      </View>

      <View style={styles.pricingContainer}>
        <View style={styles.pricing}>
          <Text style={styles.subtotalText}>Subtotal:</Text>
          <Text style={styles.subtotalText}>
            {basketData?.

              total_excl_tax_excl_discounts}{" "}{basketData?.currency}
          </Text>
        </View>
        <View style={styles.pricing}>
          <Text style={styles.deliveryText}>Fee & delivery</Text>
          <Text style={styles.subtotalPrice}>
            {basketData?.

              delivery_fee}{" "}{basketData?.currency}
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
          <Text style={styles.totalPrice}>{basketData?.

            total}{" "}{basketData?.currency}</Text>
        </View>
      </View>
      <Button buttonText={"Order"} onPress={() => handleCheckout()} />
    </View>
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
    alignItems: "flex-start",
    borderColor: "#F0F2F7",
    borderWidth: 1, borderRadius: 10,
  },
  mr10: {
    marginRight: 10,
    height: 22,
    width: 22,
    resizeMode: "contain",
    marginTop: 10
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


import { ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <View style={loaderStyles.container}>
      <View style={loaderStyles.loaderContainer}>
        <ActivityIndicator color="#000" />
      </View>
    </View>
  );
};
const loaderStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },
  loaderContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    shadowColor: "#000",
    elevation: 3
  }
});