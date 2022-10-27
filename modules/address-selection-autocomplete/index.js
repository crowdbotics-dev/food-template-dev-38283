import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import options from "./options"

navigator.geolocation = require("@react-native-community/geolocation");

const AddressAutoComplete = ({ navigation, route, onAddressSelect, onChangeText, defaultInputValue }) => {
  const [inputValue, setInputValue] = useState("");
  const [defaultValue, setDefaultValue] = useState(defaultInputValue);
  const { apiKey, autoCompleteStyles, settings } = options;

  const getAddressHandle = (data, address) => {
    if (settings.onAddressSelect) {
      settings.onAddressSelect(data, address);
    }
    if (onAddressSelect) {
      onAddressSelect(data, address);
    }
    setInputValue("");
  };

  useEffect(() => {
    setDefaultValue(defaultInputValue)
  }, [defaultInputValue])

  const handleChange = text => {
    if (settings.onChangeText) {
      settings.onChangeText(text);
    }
    if (onChangeText) {
      onChangeText(text);
    }
    setDefaultValue(text);
    setInputValue(text);
  };

  const handleFail = () => {
    if (settings.onFail) {
      settings.onFail();
    }
  };

  const handleNotFound = () => {
    if (settings.onNotFound) {
      settings.onNotFound();
    }
  };

  return (
    <View
      style={[
        autoCompleteStyles.mainContainer,
        { height: inputValue ? '100%' : 50, backgroundColor: "#fff" },
      ]}
    >
      <GooglePlacesAutocomplete
        autoFilsetInputValuelOnNotFound={settings.autoFillOnNotFound || false}
        placeholder={settings.placeholder || "Address"}
        minLength={settings.minLength || 2}
        autoFocus={false}
        returnKeyType={"default"}
        fetchDetails={settings.fetchDetails || true}
        textInputProps={{
          onChangeText: text => handleChange(text),
          value: defaultValue
        }}
        onPress={(data, details = null) => getAddressHandle(data, details)}
        query={{
          key: apiKey,
          language: "en",
          components: `country:${settings.country ? settings.country : null}`,
        }}
        styles={settings.styles || autoCompleteStyles}
        currentLocation={settings.currentLocation}
        currentLocationLabel={settings.currentLocationLabel}
        predefinedPlaces={settings.predefinedPlaces}
        predefinedPlacesAlwaysVisible={
          settings.predefinedPlacesAlwaysVisible || false
        }
        disableScroll={settings.disableScroll || false}
        enablePoweredByContainer={settings.enablePoweredByContainer || false}
        isRowScrollable={settings.isRowScrollable || true}
        listUnderlayColor={settings.listUnderlayColor || "#c8c7cc"}
        listViewDisplayed={settings.listViewDisplayed || "auto"}
        onFail={handleFail}
        onNotFound={handleNotFound}
        timeout={settings.timeout || 20000}
        renderLeftButton={settings.renderLeftButton}
        renderRightButton={settings.renderRightButton}
      />
    </View>
  );
};

export default {
  title: "AddressAutoComplete",
  navigator: AddressAutoComplete
};
