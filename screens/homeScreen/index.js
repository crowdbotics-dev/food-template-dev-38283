import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  FlatList
} from "react-native";


const Home = ({ navigation }) => {
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
  return (
    <ScrollView style={styles.container}  showsVerticalScrollIndicator={false}>
      <View style={{paddingHorizontal: 10}}>
      <View style={styles.searchContainer}>
        <Text style={styles.headText}>Address</Text>
        <View style={styles.inputText}>
          <View style={{ flex: 1 }}>
            <Input placeholder='Enter' />
          </View>
          <Image source={require("../../assets/address.png")} style={styles.mr10} />
        </View>
      </View>

      <View style={styles.heading}>
        <Text style={styles.headingText}>Hello, Username</Text>
        <Text style={styles.text}>What do you want to eat?</Text>
      </View>
      <View style={styles.imageContainer}>
        <View>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/blackheart.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.iconText}>Favorite</Text>
        </View>
        <View>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/pin.png")}
              style={styles.iconCheap}
            />
          </View>
          <Text style={styles.iconText}>Cheap</Text>
        </View>
        <View>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/trend.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.iconText}>Trend</Text>
        </View>
        <View>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/dots.png")}
              style={styles.icon}
            />
          </View>
          <Text style={styles.iconText}>More</Text>
        </View>
      </View>
      <View style={styles.forgetContainer}>
        <Text style={styles.promoText}>Today's promo</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <ExploreItem event={item} />}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
</View>
      <Footer
        images={[
          require("../../assets/home.png"),
          require("../../assets/box.png"),
          require("../../assets/search.png"),
          require("../../assets/user.png")
        ]}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10,
    flex: 1,
    // backgroundColor: "#F2F2F2",
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
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  headText: {
    marginLeft: 10,
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
    marginBottom: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "space-between"
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 75,
    width: 75,
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
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
  iconCheap: { resizeMode: "contain", height: 32, width: 32 },
  promoText: {
    fontSize: 24, fontWeight: "500"
  },
  seeAll: { fontSize: 14, color: "#E84C4F" },
  iconText: { color: "#7E7E7E", alignSelf: "center", marginTop: 10 }
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
    paddingHorizontal: 10
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});


const ExploreItem = ({ event }) => {
  return (
    <View style={exploreItemStyles.container}>
      <View style={exploreItemStyles.header}>
        <View style={exploreItemStyles.heading}>
          <Text style={exploreItemStyles.text}>Discover</Text>
          <Text style={exploreItemStyles.headingText}>Best dinner{'\n'}of the day</Text>
        </View>
        <View style={exploreItemStyles.imgContainer}>
          <Image source={require("../../assets/redheart.png")} style={exploreItemStyles.image} />
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
    </View>
  );
};

const exploreItemStyles = StyleSheet.create({
  container: {
    width: 340,
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
        <View style={footerStyles.footerItem} key={index}>
          <Image
            style={footerStyles.footerImage}
            source={image}
          />
        </View>
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