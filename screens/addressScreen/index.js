import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, ScrollView, TouchableHighlight, Pressable, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAddress, getUserAddress } from "../../store";

const AddressScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [userAddresses, setUserAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [searchedAddress, setSearchedAddress] = useState([]);
  const userAddress = useSelector(state => state?.ecommerce?.userAddress);

  useEffect(() => {
    setIsLoading(true)
    const resultLength = userAddress.length
    setUserAddresses(userAddress);
    setSearchedAddress(userAddress)
    setCurrentAddress(userAddress[resultLength - 1])
    setIsLoading(false)
  }, [userAddress])


  const updateCurrentAddress = (address) => {
    setCurrentAddress(address);
  }

  const handleDeleteAddress = async (id) => {
    setIsLoading(true)
    await dispatch(deleteUserAddress(id)).then(async (res) => {
      await dispatch(getUserAddress()).then((response) => {
        setIsLoading(false)
      }).catch((error) => {
        setIsLoading(false);
        console.log("Error: ", error)
      })
    }).catch((err) => {
      console.log("Error: ", err);
      setIsLoading(false);
    })
  }


  const handleSearch = async (text) => {
    if (!text) {
      setUserAddresses(searchedAddress)
    } else {
      const filterList = userAddresses.filter(element => element.line1.toLowerCase().includes(text.toLowerCase()));
      setUserAddresses(filterList);
    }
  }

  const getUserAddresses = () => {
    dispatch(getUserAddress()).then((res) => { }).catch((err) => console.log("Error: ", err))
  }
  useEffect(() => {
    getUserAddresses();
  }, [])

  return (
    <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
      {isLoading && <Loader></Loader>}
      <View style={styles.searchContainer}>
        <Text style={styles.headText}>Current address</Text>
        <View style={[styles.inputText, { paddingVertical: 12, paddingLeft: 10 }]}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1}>{currentAddress?.line1}</Text>
          </View>
          <Image source={require("./assets/map.png")} style={styles.mr10} />
        </View>
      </View>
      <View style={styles.mapContainer}>
        <Image source={require("./assets/mapIcon.png")} style={styles.mapIcon} />
      </View>
      <View style={styles.searchContainer}>
        <Text style={[styles.headText]}>Search</Text>
        <View style={styles.inputText}>
          <View style={{ flex: 1 }}>
            <Input placeholder='Search' onChangeText={handleSearch} />
          </View>
          <Image source={require("./assets/search.png")} style={styles.mr10} />
        </View>
      </View>

      <Text style={styles.subheading}>My locations</Text>
      {
        userAddresses && userAddresses.map((address, index) =>
          <View style={styles.searchContainer} key={index}>
            <Text style={{}}></Text>
            <Pressable style={styles.addressContainer} onPress={() => updateCurrentAddress(address)}>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1}>{address?.line1}</Text>
              </View>
              <Pressable onPress={() => handleDeleteAddress(address?.id)}>
                <Text style={styles.addressDelete}>Delete</Text>
              </Pressable>
            </Pressable>
          </View>
        )
      }


      <Pressable onPress={() => navigation.navigate("mapScreen")}>
        <Text style={styles.addAddress}>+ Add new location</Text>
      </Pressable>
      <Button buttonText={"Update"} onPress={() => navigation.navigate("checkoutScreen", { currentAddress })} />
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
    backgroundColor: "#f7f7f7"
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 10,
    paddingVertical: 15
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
  subheading: { fontSize: 16, color: "#1E2022", fontWeight: "bold", marginTop: 30, marginBottom: 5, paddingLeft: 10, paddingBottom: 10, borderBottomColor: "rgba(217, 217, 217, 0.3);", borderBottomWidth: 1 },
  addressDelete: { fontSize: 14, color: "#EA4335", fontWeight: "bold", marginRight: 10, },
  addAddress: { fontSize: 14, color: "#12D790", fontWeight: "bold", marginLeft: 10, marginVertical: 20 },
})


export default AddressScreen;


export const Input = (props) => {
  return (
    <View>
      <TextInput
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.onChangeText(num)}
        placeholderTextColor='#000000'
        editable={props.editable !== false}
      />
      {props.errorText ? <Text style={textStyles.error}>{props.errorText}</Text> : null}
    </View>
  );
};

const textStyles = StyleSheet.create({
  input: {
    backgroundColor: "#f7f7f7",
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
