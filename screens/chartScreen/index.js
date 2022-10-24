import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, ScrollView, TouchableHighlight, Pressable, Alert } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getBasket, removeFromBasket } from "../../store";
import Loader from "../../components/Loader";
const ChartScreen = ({ navigation }) => {
  const [quantity, setQuantity] = useState(1);
  const [cartProducts, setCartProducts] = useState([]);
  const [basketData, setBasketData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const increment = () => {
    setQuantity(quantity + 1);
  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };



  // @ts-ignore
  const myBasket = useSelector(state => state?.ecommerce?.myBasket);
  useEffect(() => {
    setTimeout(() => {
      setCartProducts(myBasket[0]?.line_details)
      setBasketData(myBasket[0]);
    }, 1000);

  }, [myBasket])


  const handleGetBasket = async () => {
    setIsLoading(true)
    await dispatch(getBasket()).then(basket => {
      setIsLoading(false)
    }).catch(err => { console.log("ERROR: ", err); setIsLoading(false) });
  }

  useEffect(() => {
    handleGetBasket();
  }, [])

  const handleCheckout = () => {

    if (cartProducts === undefined) {
      Alert.alert("No product in Basket!", "Please add at least one product in basket before checkout")
    } else if (cartProducts.length === 0) {
      Alert.alert("No product in Basket!", "Please add at least one product in basket before checkout")
    } else {
      navigation.navigate('checkoutScreen', { basketData });
    }

  }
  const leftSwipe = (url) => (
    <Pressable style={styles.leftSwipe} onPress={() => handleRemoveProduct(url)}>
      <Image source={require("./assets/delete.png")} style={styles.delete} />
    </Pressable>
  )

  const handleRemoveProduct = async url => {
    setIsLoading(true)
    try {
      await dispatch(removeFromBasket(url))
        .then(res => {
          handleGetBasket();
        })
        .catch(err => {console.log("ERROR: ", err);  setIsLoading(false)})
    } catch (error) {
      console.log("ERROR: ", error);
      setIsLoading(false)
    }
  }


  return (
    <View style={[styles.container]}>
      { isLoading && <Loader></Loader>}
      <ScrollView style={[styles.chartContainer]} showsVerticalScrollIndicator={false}>
        <View style={styles.forgetContainer}>
          <Text style={styles.promoText}>Order details</Text>
          <Image source={require("./assets/basket.png")} style={styles.filter} />
        </View>
        {cartProducts && cartProducts.map((item, index) =>
          <Swipeable renderRightActions={() => leftSwipe(item.url)} key={index}>
            <View style={styles.productContainer} >
              <View>
                <Image source={{ uri: "https://cdnimg.webstaurantstore.com/uploads/blog/2019/3/blog-types-pizza_in-blog-8.jpg" || item?.images[0].original }} style={styles.productImage} />
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item?.product?.title}</Text>
                <Text style={styles.pricingText} numberOfLines={1}>
                  {item?.product?.description}{" "}
                </Text>
                <View style={styles.flexRow}>
                  <View style={styles.greenCircle}>
                    <Text style={[styles.white, styles.bold]}>%</Text>
                  </View>
                  <Text style={styles.fnt12}>Free delivery</Text>
                </View>
              </View>
              <View style={styles.buttons}>
                <Text style={styles.priceText}>${item?.price_incl_tax}</Text>
                <View style={styles.counter}>
                  <Pressable
                    style={[styles.counterBtn, styles.decrement]}
                    onPress={() => decrement()}>
                    <Image
                      source={require("./assets/minusIcon.png")}
                      style={styles.icon}
                    />
                  </Pressable>
                  <Text style={styles.counterText}>{item?.quantity}</Text>
                  <Pressable
                    style={[styles.counterBtn, styles.increment]}
                    onPress={() => increment()}>
                    <Image
                      source={require("./assets/plusIcon.png")}
                      style={styles.icon}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </Swipeable>
        )}
      </ScrollView>
      <View style={styles.cardContainer}>
        <View style={styles.ratingsStar}>
          <Text style={styles.summaryText}>Free shipping</Text>
          <View style={styles.ratings}>
            <Image
              source={require("./assets/star.png")}
              style={styles.icon1}
            />
            <Image
              source={require("./assets/star.png")}
              style={styles.icon1}
            />
            <Image
              source={require("./assets/star.png")}
              style={styles.icon1}
            />
            <Image
              source={require("./assets/star.png")}
              style={styles.icon1}
            />
            <Image
              source={require("./assets/star.png")}
              style={styles.icon1}
            />
          </View>

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
        </View>

        <View style={styles.total}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalPrice}>
            {basketData?.total}{" "}{basketData?.currency}
          </Text>
        </View>
        <Button buttonText="Checkout" onPress={() => handleCheckout()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(218, 218, 218, 0.01)'
  },
  chartContainer: { marginBottom: 270 },
  forgetContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  promoText: {
    fontSize: 16, fontWeight: "bold", color: "#4A4A4A"
  },
  filter: { height: 24, width: 31, resizeMode: "contain" },
  counter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F5F2",
    width: 90,
    height: 30,
    borderRadius: 4
  },
  counterBtn: {
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 4
  },
  counterText: { fontSize: 12 },
  decrement: {
    backgroundColor: "#E1E1E1"
  },
  increment: {
    backgroundColor: "#12D790"
  },
  icon: {
    width: 10,
    height: 10,
    resizeMode: "contain"
  },
  icon1: {
    width: 17,
    height: 16,
    resizeMode: "contain"
  },
  productContainer: {
    marginVertical: 5,
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#f2efef",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.1,
    shadowRadius: 7.84,
    elevation: 10,
  },
  leftSwipe: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15, paddingRight: 20
  },
  delete: {
    height: 32,
    width: 32, resizeMode: "contain"
  },
  productImage: {
    height: 82,
    width: 72,
    borderRadius: 10
  },
  productDetails: {
    flex: 1,
    marginLeft: 10
  },
  productName: {
    fontSize: 16,
    color: "#3E4462",
    fontWeight: "bold",
    marginTop: 5
  },
  pricingText: {
    fontSize: 14,
    color: "#3E4462",
    marginBottom: 10,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5
  },
  greenCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#12D790",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5
  },
  white: {
    color: "#fff"
  },
  fnt12: {
    fontSize: 12
  },
  bold: {
    fontWeight: "bold"
  },
  buttons: {
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  priceText: { fontSize: 20, fontWeight: "bold", color: "#000", marginRight: 5 },
  cardContainer: {
    height: 270,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 25,
    position: 'absolute', left: 0, right: 0, bottom: 0,
    shadowColor: "#f2efef",
    shadowOffset: {
      width: 0,
      height: 5
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
    marginBottom: 10,
    marginTop: 15
  },
  pricingText1: {
    fontSize: 16,
    color: "#3E4462",
    marginRight: 5
  },
  summaryText: {
    fontSize: 14,
    color: "#7C7C7C",
  },
  ratings: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: -10
  },
  pricingContainer: {},
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
  totalText: {
    fontSize: 28,
    color: "#313633",
  },
  totalPrice: {
    fontSize: 28,
    color: "#000",
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#F0F2F7",
    borderBottomWidth: 1,
    borderTopColor: "#F0F2F7",
    borderTopWidth: 1,
    marginVertical: 10,
    paddingVertical: 15
  }
});

export default ChartScreen;


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
    marginVertical: 20, width: '90%', justifyContent: "center",
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