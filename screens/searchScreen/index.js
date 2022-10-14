import { View, Text, Image, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'

const SearchScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);


  return (
    <ScrollView style={styles.container}>
      <View style={{paddingHorizontal: 10}}>
      <View style={styles.header}>
        <Text style={styles.back} />
        <Text style={styles.heading}>Search</Text>
        <Image
          source={require("../../assets/file.png")}
          style={styles.message}
        />
      </View>
      <View style={styles.searchContainer}>
        <Text style={styles.headText}>Search</Text>
        <View style={styles.inputText}>
          <View style={{ flex: 1 }}>
            <Input placeholder='Enter' />
          </View>
          <Image source={require("../../assets/search.png")} style={styles.mr10} />
        </View>
      </View>
      <TabView1
        tabTitles={["Filters", "Nearby", "Above 4.5", "Cheapest"]}
        selected={selectedTab}
        onPress={setSelectedTab}
        style={styles.tabView1}
        icons={[
          require("../../assets/tabfilter.png"),
          require("../../assets/tabshare.png"),
          require("../../assets/tabstar.png"),
          require("../../assets/tabtag.png")
        ]}
      />
      <View style={styles.forgetContainer}>
        <Text style={styles.promoText}>Recent search</Text>
      </View>
      <TabView
        tabTitles={["Pizza", "Breakfast", "Pancake"]}
        selected={selectedTab}
        onPress={setSelectedTab}
        style={styles.tabView}
      />

      <View style={styles.forgetContainer}>
        <Text style={styles.promoText}>Popular cousin</Text>
      </View>
      <TabView
        tabTitles={["Italian", "Mexican", "Spanish"]}
        selected={selectedTab}
        onPress={setSelectedTab}
        style={styles.tabView}
      />

      <View style={[styles.forgetContainer1]}>
        <Text style={styles.promoText}>Popular food</Text>
        <Image source={require("../../assets/filter.png")} style={styles.filter} />
      </View>

      <View style={styles.centerBox}>
        <View>
          <View style={styles.box}>
            <View style={styles.courseTop}>
              <Pressable style={styles.heartIconContainer}>
                <Image
                  source={require("../../assets/heartIcon.png")}
                  style={styles.heartIcon}
                />
              </Pressable>
              <Text style={styles.rateLabel}>4.7</Text>
            </View>
            <View style={styles.imageBox}>
              <Image source={require("../../assets/edit.png")} style={styles.editImg} />
            </View>
          </View>
          <View style={styles.boxBottom}>
            <Text style={styles.courseName}>Course name</Text>
            <View style={styles.cardsContainer}>
              <Image source={require("../../assets/cards.png")} style={styles.cards} />
              <Text style={styles.count}>48 Enrolled</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={[styles.box, styles.color]}>
            <View style={styles.courseTop}>
              <Pressable style={styles.heartIconContainer}>
                <Image
                  source={require("../../assets/heartIcon.png")}
                  style={styles.heartIcon}
                />
              </Pressable>
              <Text style={styles.rateLabel}>4.7</Text>
            </View>
            <View style={styles.imageBox}>
              <Image source={require("../../assets/edit.png")} style={styles.editImg} />
            </View>
          </View>
          <View style={[styles.boxBottom, styles.ml10]}>
            <Text style={styles.courseName}>Course name</Text>
            <View style={styles.cardsContainer}>
              <Image source={require("../../assets/cards.png")} style={styles.cards} />
              <Text style={styles.count}>48 Enrolled</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.centerBox}>
        <View>
          <View style={styles.box}>
            <View style={styles.courseTop}>
              <Pressable style={styles.heartIconContainer}>
                <Image
                  source={require("../../assets/heartIcon.png")}
                  style={styles.heartIcon}
                />
              </Pressable>
              <Text style={styles.rateLabel}>4.7</Text>
            </View>
            <View style={styles.imageBox}>
              <Image source={require("../../assets/edit.png")} style={styles.editImg} />
            </View>
          </View>
          <View style={styles.boxBottom}>
            <Text style={styles.courseName}>Course name</Text>
            <View style={styles.cardsContainer}>
              <Image source={require("../../assets/cards.png")} style={styles.cards} />
              <Text style={styles.count}>48 Enrolled</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={[styles.box, styles.color]}>
            <View style={styles.courseTop}>
              <Pressable style={styles.heartIconContainer}>
                <Image
                  source={require("../../assets/heartIcon.png")}
                  style={styles.heartIcon}
                />
              </Pressable>
              <Text style={styles.rateLabel}>4.7</Text>
            </View>
            <View style={styles.imageBox}>
              <Image source={require("../../assets/edit.png")} style={styles.editImg} />
            </View>
          </View>
          <View style={[styles.boxBottom, styles.ml10]}>
            <Text style={styles.courseName}>Course name</Text>
            <View style={styles.cardsContainer}>
              <Image source={require("../../assets/cards.png")} style={styles.cards} />
              <Text style={styles.count}>48 Enrolled</Text>
            </View>
          </View>
        </View>
      </View>
      </View>
      <Footer
        images={[
          require("../../assets/shome.png"),
          require("../../assets/box.png"),
          require("../../assets/redsearch.png"),
          require("../../assets/user.png")
        ]}
      />
    </ScrollView>
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
  searchContainer: {backgroundColor: "#f1f1f1"},
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
  box: { height: 167, width: 145, backgroundColor: "#fdf1d6", borderRadius: 10, alignItems: "center", justifyContent: "center" },
  imageBox: { height: 140, alignItems: "center", justifyContent: "center" },
  editImg: { marginBottom: 15, height: 32, width: 32, resizeMode: "contain" },
  centerBox: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingHorizontal: 10 },
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
});


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
  const propStyle = style || {};
  return (
    <View
      style={[tabViewStyles.paletteContainer, propStyle]}>
      {tabTitles.map((title, index) => (
        <Pressable
          onPress={() => (onPress ? onPress(index) : null)}
          style={[tabViewStyles.selected, tabColorStyle, tabViewStyles.tabItem]}
          key={index}>
          <Text  style={{fontSize: 12}}>{title}</Text>
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
    color:"#EA4335"
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