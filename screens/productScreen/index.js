// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Pressable, ScrollView, ImageBackground } from "react-native";
import { RadioButton } from 'react-native-paper';

const ProductDetails = () => {
  const [checked, setChecked] = useState('first');
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setProduct({
      name: "Food name",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi urna ante sed aliquam. Ut nunc suscipit mi praesent nulla orci, viverra.",
      price: 12.5,
      discountedPrice: 10,
      caption:
        "Add toping"
    });
  }, []);
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
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground source={require("../../assets/background.png")} resizeMode="cover" style={styles.imageContainer}>
        <Pressable style={styles.heartIconContainer}>
          <Image
            source={require("../../assets/heartIcon.png")}
            style={styles.heartIcon}
          />
        </Pressable>
      </ImageBackground>
      <View style={styles.cardContainer}>
        <View style={styles.flexRow}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.ratingText}>4.7</Text>
        </View>
        <View style={styles.flexRow1}>
          <View style={styles.greenCircle}>
            <Text style={[styles.white, styles.bold]}>%</Text>
          </View>
          <Text style={styles.fnt12}>Free delivery</Text>
        </View>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.cardsContainer}>
          <Image source={require("../../assets/cards.png")} style={styles.cards} />
          <Text style={styles.count}>48 comments</Text>
        </View>
        <View style={styles.flexRow}>
        </View>
        <View style={styles.counterContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              ${product.discountedPrice && product.discountedPrice.toFixed(2)}
            </Text>
          </View>
          <View style={styles.counter}>
            <Pressable
              style={[styles.counterBtn, styles.decrement]}
              onPress={() => decrement()}>
              <Image
                source={require("../../assets/minusIcon.png")}
                style={styles.icon}
              />
            </Pressable>
            <Text style={styles.counterText}>{quantity}</Text>
            <Pressable
              style={[styles.counterBtn, styles.increment]}
              onPress={() => increment()}>
              <Image
                source={require("../../assets/plusIcon.png")}
                style={styles.icon}
              />
            </Pressable>
          </View>
        </View>
        <Text style={styles.caption}>{product.caption}</Text>

        <Pressable style={styles.pricing} onPress={() => setChecked('first')}>
          <Text style={styles.summaryText}>Lorem ipsum </Text>
          <View style={styles.ratings}>
            <Text style={styles.pricingText}>
              $5.00
            </Text>
            <RadioButton
              value="first"
              color="#EA4335"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
            />
          </View>

        </Pressable>
        <Pressable style={styles.pricing} onPress={() => setChecked('two')}>
          <Text style={styles.summaryText}>Sit sapien</Text>
          <View style={styles.ratings}>
            <Text style={styles.pricingText}>
              $2.00
            </Text>
            <RadioButton
              value="two"
              color="#EA4335"
              status={checked === 'two' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('two')}
            />
          </View>

        </Pressable>
        <Pressable style={styles.pricing} onPress={() => setChecked('three')}>
          <Text style={styles.summaryText}>Cursus mauris</Text>
          <View style={styles.ratings}>
            <Text style={styles.pricingText}>
              $3.25
            </Text>
            <RadioButton
              value="three"
              color="#EA4335"
              status={checked === 'three' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('three')}
            />
          </View>

        </Pressable>
        <Pressable style={styles.pricing} onPress={() => setChecked('four')}>
          <Text style={styles.summaryText}>Augue dolor.</Text>
          <View style={styles.ratings}>
            <Text style={styles.pricingText}>
              $1.25
            </Text>
            <RadioButton
              value="four"
              color="#EA4335"
              status={checked === 'four' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('four')}
            />
          </View>

        </Pressable>
        <Button buttonText="Add to chart" style={styles.button} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#E3F3FA"
  },
  imageContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    height: 310,
    padding: 30
  },
  logo: {
    width: 30,
    height: 30
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 25,
    marginTop: -10
  },
  bar: {
    height: 6,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
    width: 60,
    alignSelf: "center",
    marginVertical: 10
  },
  title: {
    fontSize: 20,
    color: "#000",
    marginTop: 10
  },
  description: {
    fontSize: 12,
    color: "#000000",
    textAlign: "justify",
    lineHeight: 17
  },
  caption: { color: "#3E4462", fontSize: 20, fontWeight: "bold", borderBottomColor: "rgba(217, 217, 217, 0.25);", borderBottomWidth: 1, paddingBottom: 10, marginBottom: 10 },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  flexRow1: {
    marginBottom: 15,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  priceText: {
    color: "#000000",
    fontSize: 34,
    fontWeight: "bold"
  },
  acctualPrice: {
    fontSize: 16,
    color: "#9A9A9A",
    textDecorationLine: "line-through",
    marginLeft: 10
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  counter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F5F2",
    width: 110,
    height: 35,
    borderRadius: 4
  },
  counterBtn: {
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 4
  },
  decrement: {
    backgroundColor: "#E1E1E1"
  },
  increment: {
    backgroundColor: "#12D790"
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  button: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 20,
    width: '90%',
    alignSelf: "center"
    
  },
  greenCircle: {
    width: 18,
    height: 18,
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
    fontSize: 12,
    marginLeft: 5
  },
  bold: {
    fontWeight: "bold"
  },
  ratingText: { fontSize: 18, color: "#1E2022", backgroundColor: "#FFD500", paddingHorizontal: 20, paddingVertical: 5, borderRadius: 30, marginBottom: -15 },
  cards: { height: 40, width: 40, resizeMode: "contain", marginTop: -3 },
  cardsContainer: { flexDirection: "row", justifyContent: "flex-start", alignItems: "center" },
  count: { fontSize: 8, color: "#27AE60", fontWeight: "bold", marginLeft: 5 },
  pricing: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0
  },
  pricingText: {
    fontSize: 16,
    color: "#3E4462",
    marginRight: 5
  },
  summaryText: {
    fontSize: 16,
    color: "#3E4462",
    marginBottom: 5
  },
  ratings: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: -10
  },
  heartIconContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    elevation: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5
},
heartIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain"
},
});

export default ProductDetails;

const Button = params => {
  const backgroundColor = params.color || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.outlineColor || backgroundColor,
    borderWidth: 1
  };
  const btnText = {
    color: textColor
  };
  return (
    <View style={[buttonStyles.btnContainer, params.style]}>
      <View style={!params.hideShadow ? buttonStyles.shadowContainer : null}>
        <Pressable
          style={[buttonStyles.btn, btnStyle]}
          onPress={params.onPress}>
          <Text style={[buttonStyles.btnText, btnText]}>
            {params.buttonText}
          </Text>
          <View style={buttonStyles.childrenContainer}>{params.children}</View>
        </Pressable>
      </View>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center"
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 50,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  childrenContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
