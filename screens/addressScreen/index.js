import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, ScrollView, TouchableHighlight, Pressable, TextInput } from "react-native";

const AddressScreen = () => {

  return (
    <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <Text style={styles.headText}>Current address</Text>
        <View style={styles.inputText}>
          <View style={{ flex: 1 }}>
            <Input placeholder='8th Street, San Francisco' />
          </View>
          <Image source={require("../../assets/map.png")} style={styles.mr10} />
        </View>
      </View>
      <View style={styles.mapContainer}>
        <Image source={require("../../assets/mapIcon.png")} style={styles.mapIcon} />
      </View>
      <View style={styles.searchContainer}>
        <Text style={[styles.headText]}>Search</Text>
        <View style={styles.inputText}>
          <View style={{ flex: 1 }}>
            <Input placeholder='Search' />
          </View>
          <Image source={require("../../assets/search.png")} style={styles.mr10} />
        </View>
      </View>

      <Text style={styles.subheading}>My locations</Text>

      <View style={styles.searchContainer}>
        <Text style={styles.headText}>Home</Text>
        <View style={styles.inputText}>
          <View style={{ flex: 1 }}>
            <Input placeholder='8th Street, San Francisco' />
          </View>
          <Text style={styles.addressDelete}>Delete</Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <Text style={styles.headText}>Work</Text>
        <View style={styles.inputText}>
          <View style={{ flex: 1 }}>
            <Input placeholder='8th Street, San Francisco' />
          </View>

          <Text style={styles.addressDelete}>Delete</Text>
        </View>
      </View>
      <Pressable>
        <Text style={styles.addAddress}>+ Add new location</Text>
      </Pressable>
      <Button buttonText={"Update"} />
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
  subheading: { fontSize: 16, color: "#1E2022", fontWeight: "bold", marginTop: 30, marginBottom: 5, paddingLeft: 20, paddingBottom: 10, borderBottomColor: "rgba(217, 217, 217, 0.3);", borderBottomWidth: 1 },
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