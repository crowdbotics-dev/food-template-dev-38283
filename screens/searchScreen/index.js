import { View, Text, Image, StyleSheet, TextInput, ScrollView, Pressable, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getItem, getProductsList, setItem } from "../../store";
import { getProduct, getProducts, productAvailability } from '../../store/apis';
import Loader from '../../components/Loader';

const SearchScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const [productsList, setProductsList] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const [fav, setFav] = useState([]);
  
  const query = route?.params?.query;

  useEffect(()=>{
    initializeFavorite();
  }, [])

  const handleProducts = async () => {
    setIsLoading(true)
    await getProducts().then(async (products) => {
      var productList = [];
      let i = 0;
      while (i < products.length) {
        const product = await getProduct(products[i].url);
        productList.push(product);
        i += 1;
      }
      setProductsList(productList);
      setIsLoading(false);
    }).catch((err) => { console.log("error: ", err); setIsLoading(false); });
  }

  const handleSearch = (text) => {
    if (text) {
      let filterList = productsList?.filter(item => item?.title?.toLowerCase().includes(text?.toLowerCase()));
      setProductsList(filterList);
    } else {
      handleProducts();
    }
  }

  const handleFilter = (filter) => {
    if (productsList?.length) {
      if (filter == 'favorite') {
        const filteredArray = productsList.filter(value => fav.includes(value?.id));
        setProductsList(filteredArray);
      } else {
        const filteredProduct = productsList?.filter(item => item?.categories?.includes(filter));
        setProductsList(filteredProduct);
        setSelectedTab(3)
      }
    }
  }

  const initializeFavorite = async () => {
    let favorites = JSON.parse(await getItem("favorite") || '[]');
    setFav(favorites);
  }

  const handleFavorite = async (id) => {
    let favorites = JSON.parse(await getItem("favorite") || '[]');
    const isFavorite = favorites.includes(id);
    if (isFavorite) {
      favorites = favorites.filter(item => item !== id)
    } else {
      favorites.push(id);
    }
    setItem("favorite", JSON.stringify(favorites));
    setFav(favorites);
  }

  const getFavorite =  (id)=>{
    return fav.includes(id);
  }

  useEffect(() => {
    handleProducts();
    dispatch(getProductsList()).then((res) => {}).catch((err) => console.log("Error: ", err))
  }, [])

  useEffect(() => {
    if (query) {
      handleFilter(query);
    }
  }, [])


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={styles.header}>
            <Text style={styles.back} />
            <Text style={styles.heading}>Search</Text>
            <Image
              // @ts-ignore
              source={require("./assets/file.png")}
              style={styles.message}
            />
          </View>
          <View style={styles.searchContainer}>
            <Text style={styles.headText}>Search</Text>
            <View style={styles.inputText}>
              <View style={{ flex: 1 }}>
                <TextInput 
                // value={searchText}
                onChangeText={handleSearch}
                placeholder='Search' 
                />
              </View>
              <Image source={require(
                // @ts-ignore
                "./assets/search.png")} style={styles.mr10} />
            </View>
          </View>
          <TabView1
            tabTitles={["Filters", "Nearby", "Above 4.5", "Cheapest"]}
            selected={selectedTab}
            onPress={setSelectedTab}
            style={styles.tabView1}
            icons={[
               // @ts-ignore
               require("./assets/tabshare.png"),
              // @ts-ignore
              require("./assets/tabfilter.png"),
              // @ts-ignore
              require("./assets/tabstar.png"),
              // @ts-ignore
              require("./assets/tabtag.png")
            ]}
          />
          <View style={styles.forgetContainer}>
            <Text style={styles.promoText}>Recent search</Text>
          </View>
          <TabView
            tabTitles={["Pizza", "Breakfast", "Pancake"]}
            // @ts-ignore
            selected={selectedTab}
            onPress={setSelectedTab}
            style={styles.tabView}
          />

          <View style={styles.forgetContainer}>
            <Text style={styles.promoText}>Popular cousin</Text>
          </View>
          <TabView
            tabTitles={["Italian", "Mexican", "Spanish"]}
            // @ts-ignore
            selected={selectedTab}
            onPress={setSelectedTab}
            style={styles.tabView}
          />

          <View style={[styles.forgetContainer1]}>
            <Text style={styles.promoText}>Popular food</Text>
            <Image source={require(
              // @ts-ignore
              "./assets/filter.png")} style={styles.filter} />
          </View>
          {
            isLoading ?<Loader></Loader> :
              <View style={styles.wrapper}>
               {productsList?.map((item, index)=>{
                return <View key={index} style={styles.centerBox}>
                <TouchableOpacity onPress={() => navigation.navigate("productScreen", { product: item })}>
                  <ImageBackground source={{ uri: item.images[0]?.original }} style={styles.box}>
                    <View style={styles.courseTop}>
                      <Pressable style={styles.heartIconContainer}
                      onPress={() => handleFavorite(item?.id)}
                      >
                        <Image
                          // @ts-ignore
                          source={getFavorite(item?.id) ? require("./assets/heartIcon.png") : require("./assets/favoriteIcon.png")}
                          style={styles.heartIcon}
                        />
                      </Pressable>
                      <Text style={styles.rateLabel}>4.7</Text>
                    </View>
                  </ImageBackground>
                  <View style={styles.boxBottom}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.courseName}>{item?.title}</Text>
                      <View style={styles.nameContainer}>
                        <Text style={{ fontSize: 8, color: "#7C7C7C" }}>1.3mi </Text>
                        <Image source={require(
                          // @ts-ignore
                          "./assets/loc.png")} style={styles.loc} />
                      </View>
                    </View>

                    <View style={styles.cardsContainer}>
                      <Image source={require(
                        // @ts-ignore
                        "./assets/cards.png")} style={styles.cards} />
                      <Text style={styles.count}>+5 comments</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
               }) }

              </View>
          }

        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Footer
          images={[
            // @ts-ignore
            require("./assets/shome.png"),
            // @ts-ignore
            require("./assets/box.png"),
            // @ts-ignore
            require("./assets/redsearch.png"),
            // @ts-ignore
            require("./assets/user.png")
          ]}
          routes={['homeScreen', 'orderStatusScreen', 'searchScreen', 'accountScreen']}
          navigation={navigation}
        />
      </View>
    </View>
  )
}

export default SearchScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabView: {
    width: "85%",
  },
  tabView1: {
    width: "110%",
  },
  searchContainer: { backgroundColor: "#f1f1f1" },
  wrapper:{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: '4%'},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10
  },
  back: { width: 11.25, height: 20, marginLeft: -15 },
  heading: { fontSize: 16, color: "#000" },
  message: { width: 18, height: 12, resizeMode: "contain", marginRight: -10 },
  inputText: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    backgroundColor: "#f1f1f1"
  },
  mr10: {
    marginRight: 10,
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  ml10: { marginLeft: 10 },
  headText: {
    marginLeft: 10,
    marginVertical: 10
  },
  title: { fontSize: 24, fontWeight: "bold", marginLeft: 20, marginBottom: 20, marginTop: 10 },
  box: { height: 167, width: 145, alignItems: "center", justifyContent: "flex-start", borderRadius: 10, overflow: 'hidden' },
  imageBox: { height: 140, alignItems: "center", justifyContent: "center" },
  editImg: { marginBottom: 15, height: 32, width: 32, resizeMode: "contain" },
  centerBox: {},
  courseTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingHorizontal: 15, marginTop: 10 },
  rateLabel: { fontSize: 7, paddingHorizontal: 5, backgroundColor: "#FFD500", borderRadius: 5 },
  circle: { resizeMode: "contain", height: 24, width: 24, marginTop: 5 },
  boxBottom: { marginTop: 5 },
  courseName: { fontSize: 12, fontWeight: "bold" },
  courseDesc: { fontSize: 8, color: "#B6B6B6" },
  cards: { height: 40, width: 40, resizeMode: "contain", marginTop: -3 },
  cardsContainer: { flexDirection: "row", justifyContent: "flex-start", alignItems: "center" },
  count: { fontSize: 8, color: "#27AE60", fontWeight: "bold", marginLeft: 5 },
  color: { backgroundColor: "#D9DADD" },
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
  forgetContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  forgetContainer1: {
    marginTop: 15,
    marginBottom: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  promoText: {
    fontSize: 18, fontWeight: "500"
  },
  filter: { height: 16, width: 16, resizeMode: "contain" },
  footer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: { marginBottom: 60 },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  loc: { height: 10, width: 10, resizeMode: "contain" }
});


export const Input = (props) => {
  return (
    <View>
      <TextInput
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor='#000'
        editable={props.editable !== false}
      />
      {props.errorText ? <Text style={textStyles.error}>{props.errorText}</Text> : null}
    </View>
  );
};

const textStyles = StyleSheet.create({
  input: {
    backgroundColor: "#f1f1f1",
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

const TabView = ({
  tabTitles,
  onPress,
  tabColor,
  style,
}) => {
  const tabColorStyle = {
    backgroundColor: tabColor || "#EAE6E6"
  };
  const propStyle = style || {};
  return (
    <View
      style={[tabViewStyles.paletteContainer, propStyle]}>
      {tabTitles.map((title, index) => (
        <Pressable
          onPress={() => (onPress ? onPress(index) : null)}
          style={[tabViewStyles.selected, tabColorStyle, tabViewStyles.tabItem]}
          key={index}>
          <Text style={{ fontSize: 12 }}>{title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
  },
  tabItem: {
    borderRadius: 10,
    flex: 1,
    height: "100%",
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#EAE6E6",
    marginRight: 10
  },
  selected: {
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    backgroundColor: "#f1f1f1"
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 5
  },
  selectedIcon: {
    tintColor: "#000"
  },
  unSelectedIcon: {
    tintColor: "#7C7C7C"
  }
});


const TabView1 = ({
  tabTitles,
  selected,
  onPress,
  tabColor,
  backgroundColor,
  style,
  icons
}) => {
  const tabColorStyle = {
    backgroundColor: tabColor || "#EAE6E6"
  };
  const backgroundColorStyle = {
    backgroundColor: backgroundColor || "#fff"
  };
  const propStyle = style || {};
  return (
    <View
      style={[tabViewStyles1.paletteContainer, backgroundColorStyle, propStyle]}>
      {tabTitles.map((title, index) => (
        <Pressable
          onPress={() => (onPress ? onPress(index) : null)}
          style={
            index === selected
              ? [tabViewStyles1.selected, tabColorStyle, tabViewStyles1.tabItem]
              : [
                tabViewStyles1.unSelected,
                backgroundColorStyle,
                tabViewStyles1.tabItem
              ]
          }
          key={index}>
          {icons
            ? (
              <Image
                source={icons[index]}
                style={[
                  tabViewStyles1.icon,
                  index === selected
                    ? tabViewStyles1.selectedIcon
                    : tabViewStyles1.unSelectedIcon
                ]}
              />
            )
            : null}
          <Text>{title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const tabViewStyles1 = StyleSheet.create({
  paletteContainer: {
    height: 48,
    backgroundColor: "#E4E4E4",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginTop: 15,
    marginBottom: 15
  },
  tabItem: {
    borderRadius: 10,
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  selected: {
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    backgroundColor: "#f1f1f1"
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    marginRight: 5,
  },
  selectedIcon: {
    tintColor: "#EA4335"
  },
  unSelectedIcon: {
    tintColor: "#EA4335"
  }
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
    paddingHorizontal: 40
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