import React, { useState } from "react";
import { Text, StyleSheet, View, Image, Switch, ScrollView, TouchableHighlight } from "react-native";
import { Checkbox } from "react-native-paper"
const FiltersScreen = () => {
  const [checked, setChecked] = useState(true);
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(true);
  const [checked4, setChecked4] = useState(true);
  const [checked5, setChecked5] = useState(true);
  const [checked6, setChecked6] = useState(true);
  const [checked7, setChecked7] = useState(true);
  const [checked8, setChecked8] = useState(true);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <Text />
        <Text style={styles.heading}>Filter</Text>
        <Text />
      </View>
      <Text style={styles.subHeading}>Choose your food filter</Text>
      <View style={styles.sectionContainer}>
        <View style={styles.switchContainer}>
        <Checkbox color={"#000"}  status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}/>
          <Text style={styles.label}>Popular</Text>
          
        </View>
        <View style={styles.switchContainer1}>
        <Checkbox color={"#000"}  status={checked1 ? 'checked' : 'unchecked'}
                onPress={() => setChecked1(!checked1)}/>
          <Text style={styles.label}>Promotion</Text>
          
        </View>
        <View style={styles.switchContainer1}>
        <Checkbox color={"#000"}  status={checked2 ? 'checked' : 'unchecked'}
                onPress={() => setChecked2(!checked2)}/>
          <Text style={styles.label}>Free delivery</Text>
          
        </View>
      </View>
      <Text style={styles.subHeading}>Choose your sort</Text>
      <View style={styles.sectionContainer}>
        <View style={styles.switchContainer}>
        <Checkbox color={"#000"}  status={checked3 ? 'checked' : 'unchecked'}
                onPress={() => setChecked3(!checked3)}/>
          <Text style={styles.label}>Price</Text>
          
        </View>
        <View style={styles.switchContainer1}>
        <Checkbox color={"#000"}  status={checked4 ? 'checked' : 'unchecked'}
                onPress={() => setChecked4(!checked4)}/>
          <Text style={styles.label}>Rating</Text>
          
        </View>
        <View style={styles.switchContainer1}>
        <Checkbox color={"#000"}  status={checked5 ? 'checked' : 'unchecked'}
                onPress={() => setChecked5(!checked5)}/>
          <Text style={styles.label}>Distance</Text>
          
        </View>
      </View>
      <Text style={styles.subHeading}>Food</Text>
      <View style={styles.sectionContainer}>
        <View style={styles.switchContainer}>
        <Checkbox color={"#000"}  status={checked6 ? 'checked' : 'unchecked'}
                onPress={() => setChecked6(!checked6)}/>
          <Text style={styles.label}>Burgers</Text>
          
        </View>
        <View style={styles.switchContainer1}>
        <Checkbox color={"#000"}  status={checked7 ? 'checked' : 'unchecked'}
                onPress={() => setChecked7(!checked7)}/>
          <Text style={styles.label}>Pizza</Text>
         
        </View>
        <View style={styles.switchContainer1}>
        <Checkbox color={"#000"}  status={checked8 ? 'checked' : 'unchecked'}
                onPress={() => setChecked8(!checked8)}/>
          <Text style={styles.label}>Salad</Text>
         
        </View>
      </View>
      <View style={styles.btnContainer}>
          <Button>Apply filter</Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headingTxt: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 2,
    marginVertical: 12
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 20
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  heading: { fontSize: 16, color: "#000", marginLeft: 20 },
  sectionContainer: { backgroundColor: "rgba(218, 218, 218, 0.15);", marginBottom: 20 },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 3,
  },
  switchContainer1: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 4
  },
  subHeading: { fontSize: 16, fontWeight: "500", color: "#4A4A4A", marginLeft: 20, marginBottom: 10, },
  label: { fontSize: 14, marginLeft: 10},
  btnContainer: {
    marginTop: 10,
    width: "80%",
    alignSelf: "center",
    marginBottom: 29
  },
});

export default FiltersScreen;


const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor='#DDDDDD'>
      <View style={[btnStyles.button, {
        backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
        height: props.height ? props.height : 49,
        borderWidth: props.borderWidth ? props.borderWidth : 0,
        borderColor: props.borderColor ? props.borderColor : "#000000"
      }]}>
        <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>{props.children}</Text>
      </View>
    </TouchableHighlight>
  );
};

const btnStyles = StyleSheet.create({
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