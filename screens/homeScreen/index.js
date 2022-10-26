import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  Pressable
} from "react-native";
import { getItem } from "../../store/index";


const Home = ({ navigation }) => {
  const [screenWidth, setScreenWidth] = useState(null)
  const [userName, setUserName] = useState('');
  
  const getUserName = async ()=>{
   const response = JSON.parse(await getItem('user'));
   setUserName(response.name);
  
  }

  useEffect(()=>{
    getUserName();
  }, [])

  const data = [
    {
      id: 1,
      title: "Iceland",
      rating: 4.7,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros sed leo, ultrices pellentesque nibh neque. Sed tempus ut mi a. Turpis.",
      image: "https://raw.githubusercontent.com/crowdbotics/modules/master/modules/screen-explore-list/assets/eventImage-lg.png"
    },
    {
      id: 2,
      title: "Cuba",
      rating: 4.7,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros sed leo, ultrices pellentesque nibh neque. Sed tempus ut mi a. Turpis.",
      image: "https://raw.githubusercontent.com/crowdbotics/modules/master/modules/screen-explore-list/assets/eventImage-lg.png"
    },
  ]

  useEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth);
  }, [])
  

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <Image source={require("./assets/notification.png")} style={styles.notificationIcon} />
        <View style={{ paddingHorizontal: 10 }}>
          <View style={styles.searchContainer}>
            <Text style={styles.headText}>Address</Text>
            <View style={styles.inputText}>
              <View style={{ flex: 1 }}>
                <Input placeholder='Enter' />
              </View>
              <Image source={require("./assets/address.png")} style={styles.mr10} />
            </View>
          </View>

          <View style={styles.heading}>
            <Text style={styles.headingText}>{`Hello, ${userName}`}</Text>
            <Text style={styles.text}>What do you want to eat?</Text>
          </View>
          <View style={styles.imageContainer}>
            <View>
              <Pressable 
              onPress={()=>navigation.navigate('searchScreen', {query : 'favorite'})}
              style={styles.iconContainer} >
                <Image
                  source={require("./assets/blackheart.png")}
                  style={styles.icon}
                />
              </Pressable>
              <Text style={styles.iconText}>Favorite</Text>
            </View>
            <View>
              <View style={styles.iconContainer}>
              <Pressable 
              onPress={()=>navigation.navigate('searchScreen', {query : 'Cheap'})}
              style={styles.iconContainer} >
                <Image
                  source={require("./assets/pin.png")}
                  style={styles.iconCheap}
                />
                </Pressable>
              </View>
              <Text style={styles.iconText}>Cheap</Text>
            </View>
            <Pressable onPress={()=>navigation.navigate('searchScreen', {query : 'trend'})}>
              <View style={styles.iconContainer}>
                <Image
                  source={require("./assets/trend.png")}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.iconText}>Trend</Text>
            </Pressable>
            <Pressable onPress={()=>navigation.navigate('searchScreen', {query : 'more'})}>
              <View style={styles.iconContainer}>
                <Image
                  source={require("./assets/dots.png")}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.iconText}>More</Text>
            </Pressable>
          </View>
          <View style={styles.forgetContainer}>
            <Text style={styles.promoText}>Today's promo</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>

          <FlatList
            data={data}
            renderItem={({ item }) => <ExploreItem event={item} width={screenWidth} navigation={navigation}/>}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Footer
          images={[
            require("./assets/home.png"),
            require("./assets/box.png"),
            require("./assets/search.png"),
            require("./assets/user.png")
          ]}
          routes={['homeScreen', 'orderStatusScreen', 'searchScreen', 'accountScreen']}
          navigation={navigation}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10,
    flex: 1,
    // backgroundColor: "#F2F2F2",
  },
  searchContainer: {},
  scrollView: { marginBottom: 60 },
  inputText: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    backgroundColor: "#fff",
    marginHorizontal: 5
  },
  mr10: {
    marginRight: 10,
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  notificationIcon: {
    height: 23,
    width: 23,
    resizeMode: "contain",
    alignSelf: "flex-end",
    marginTop: 10, marginRight: 20
  },
  headText: {
    marginLeft: 20,
    marginVertical: 10
  },
  heading: {
    marginVertical: 10,
    paddingHorizontal: 10
  },
  headingText: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 5
  },
  text: { color: "#888888", lineHeight: 20 },
  forgetContainer: {
    marginTop: 35,
    marginBottom: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between"
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    width: 65,
    borderRadius: 6,
    backgroundColor: "#FFF",
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  icon: {
    height: 35,
    width: 35,
    resizeMode: "contain",
  },
  iconCheap: { resizeMode: "contain", height: 29, width: 29 },
  promoText: {
    fontSize: 24, fontWeight: "500"
  },
  seeAll: { fontSize: 14, color: "#E84C4F" },
  iconText: { color: "#7E7E7E", alignSelf: "center", marginTop: 10 },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
  }
});

export default Home;


export const Input = (props) => {
  return (
    <View>
      <TextInput
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor='#ddd'
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
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});


const ExploreItem = ({ event, width, navigation}) => {
  return (
    <View style={[exploreItemStyles.container, {width : width-50}]}>
      <Pressable onPress={()=>{navigation.navigate('searchScreen')}}>
      <View style={exploreItemStyles.header}>
        <View style={exploreItemStyles.heading}>
          <Text style={exploreItemStyles.text}>Discover</Text>
          <Text style={exploreItemStyles.headingText}>Best dinner{'\n'}of the day</Text>
        </View>
        <View style={exploreItemStyles.imgContainer}>
          <Image source={require("./assets/redheart.png")} style={exploreItemStyles.image} />
        </View>
      </View>

      <View style={exploreItemStyles.detailsContainer}>
        <View style={exploreItemStyles.headingProduct}>
          <Text style={exploreItemStyles.productTitle}>Fruit salad mix</Text>
          <Text style={exploreItemStyles.productText}>Delics Fruit salad, Ngasem</Text>
        </View>
        <View style={exploreItemStyles.forgetContainer}>
          <View style={exploreItemStyles.rememberContainer}>
            <Text>18.500</Text>
            <Text style={exploreItemStyles.lineThrough}>22.500 </Text>
          </View>
          <Text style={exploreItemStyles.stock}>5 Left</Text>
        </View>
      </View>
      </Pressable>
    </View>
  );
};

const exploreItemStyles = StyleSheet.create({
  container: {
    width: 310,
    height: 220,
    marginHorizontal: 5,
    elevation: 1,
    marginVertical: 10,
    backgroundColor: "#f7eec4",
    overflow: "hidden",
    borderRadius: 10
  },
  image: {
    width: 20,
    height: 18,
    resizeMode: "contain",
  },
  imgContainer: {
    padding: 5, backgroundColor: "#fff", borderRadius: 25, alignItems: "center", shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginRight: 5,
    marginTop: -20
  },

  heading: {
    marginVertical: 10,
    paddingHorizontal: 10
  },
  headingText: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 5
  },
  text: { color: "#888888", lineHeight: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  detailsContainer: {
    backgroundColor: "#FFF", padding: 10, shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 240,
    borderRadius: 8,
    marginLeft: 20,
    marginTop: 15
  },
  headingProduct: {},
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  forgetContainer: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  lineThrough: { textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: "#CACACA", fontSize: 12, marginLeft: 5 },
  productTitle: { color: '#3E4462', fontSize: 16 },
  stock: { backgroundColor: "#12D790", padding: 5, color: '#fff', fontSize: 12, borderRadius: 4 },
  productText: { color: "#7E7E7E", fontSize: 12 }
});


const Footer = props => {

  return (
    <View style={[footerStyles.footer]}>
      {props.images.map((image, index) => (
        <Pressable style={footerStyles.footerItem} key={index} onPress={() => props.navigation.navigate(props.routes[index])}>
          <Image
            style={footerStyles.footerImage}
            source={image}
          />
        </Pressable>
      ))}
    </View>
  );
};

const footerStyles = StyleSheet.create({
  footer: {
    marginTop: 10,
    height: 60,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  footerItemText: {
    fontSize: 13,
    color: "#fff",
    marginTop: 5
  },
  footerImage: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  }
});

// {
//   "basket": "https://drone-express-36671.botics.co/api/baskets/77/",
//   "guest_email": "foo@example.com",
//   "total": 40,
//   "shipping_charge": {
// "currency": "USD",
// "excl_tax": "0.0",
// "tax": "0.0"
// },
//   "shipping_method_code": "no-shipping-required",
//   "shipping_address": {
// "title": "Mr",
// "first_name": "saad",
// "last_name": "abid",
// "line1": "Bwp, Pnb, PAK",
// "line2": "BWP",
// "line3": "",
// "line4": "PNB",
// "state": "PNB",
// "postcode": "63100",
// "phone_number": "",
// "is_default_for_shipping": true,
// "is_default_for_billing": true,
// "country": "https://drone-express-36671.botics.co/api/countries/US/",
// "lat": 0,
// "lng": 0
// },
//   "payment": {
//     "stripe": {
//       "enabled": true,
//       "amount": 40
//     }
//   }
// }