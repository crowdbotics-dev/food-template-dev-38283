//@ts-nocheck
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, getBaskets } from './apis';


export const getProductsList = createAsyncThunk(
  "ecommerce/getProductsList",
  async (payload) => {
    const response = await api.getProductsList();
    return response.data;
  }
);

export const logoutRequest = createAsyncThunk(
  "ecommerce/logoutRequest",
  async (payload) => {
    const response = await api.logoutUser();
    return response.data;
  }
);

export const getVendors = createAsyncThunk(
  "ecommerce/getVendors",
  async (payload) => {
    const response = await api.getVendorsList();
    return response.data;
  }
);

export const getBasket = createAsyncThunk(
  "ecommerce/getBasket",
  async (payload) => {
    const response = await api.getBasketList();
    return response.data;
  }
);

export const getUserAddress = createAsyncThunk(
  "ecommerce/getUserAddress",
  async (payload) => {
    const response = await api.getUserAddress();
    return response.data;
  }
);

export const getCountry = createAsyncThunk(
  "ecommerce/getCountry",
  async (country) => {
    const response = await api.getCountry(country);
    return response.data;
  }
);

export const getUserInfo = createAsyncThunk(
  "ecommerce/getUserInfo",
  async (payload) => {
    const response = await api.getUserInfo();
    return response.data;
  }
);

export const getOrderList = createAsyncThunk(
  "ecommerce/getOrderList",
  async (payload) => {
    const response = await api.getOrderList();
    return response.data;
  }
);

export const addToBasket = createAsyncThunk(
  "ecommerce/addToBasket",
  async (payload) => {
    const response = await api.addToBasket(payload);
    return response.data;
  }
);

export const addUserAddress = createAsyncThunk(
  "ecommerce/addUserAddress",
  async (payload) => {
    const response = await api.addUserAddress(payload);
    return response.data;
  }
);


export const removeFromBasket = createAsyncThunk(
  "ecommerce/removeFromBasket",
  async (payload) => {
    const response = await api.removeFromBasket(payload);
    return response.data;
  }
);


export const startCheckout = createAsyncThunk(
  "ecommerce/startCheckout",
  async (payload) => {
    const response = await api.startCheckout(payload);
    return response.data;
  }
);


const initialState = {
  products: [],
  stores: [],
  userAddress: {},
  myBasket: [],
  cartItems: 0,
  country: "",
  orderList: [],
  user: null,
  api: {
    loading: "idle",
    error: null
  }
};



const ecommerceSlice = createSlice({
  name: "ecommerce",
  initialState: initialState,
  reducers: {
    cartCounts: (state, action) => {
      state.cartItems = action.payload;
    },
  },
  extraReducers: {
    [getProductsList.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
      }
    },
    [getProductsList.fulfilled]: (state, action) => {
      state.products = action.payload
      state.api.loading = "idle";
    },
    [getProductsList.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error;
        state.api.loading = "idle";
      }
    },
    [logoutRequest.pending]: state => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
        state.api.error = null;
      }
    },
    [logoutRequest.fulfilled]: state => {
      state.api.loading = "idle"
      state.api.error = null;
    },
    [logoutRequest.rejected]: (state, action) => {
      state.api.loading = "idle"
    },

    [getVendors.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
      }
    },
    [getVendors.fulfilled]: (state, action) => {
      state.stores = action.payload
      state.api.loading = "idle";
    },
    [getVendors.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error;
        state.api.loading = "idle";
      }
    },

    [getBasket.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
      }
    },
    [getBasket.fulfilled]: (state, action) => {
      state.myBasket = action.payload
      state.api.loading = "idle";
    },
    [getBasket.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error;
        state.api.loading = "idle";
      }
    },

    [getUserAddress.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
      }
    },
    [getUserAddress.fulfilled]: (state, action) => {
      state.userAddress = action.payload
      state.api.loading = "idle";
    },
    [getUserAddress.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error;
        state.api.loading = "idle";
      }
    },

    [getCountry.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
      }
    },
    [getCountry.fulfilled]: (state, action) => {
      state.country = action.payload
      state.api.loading = "idle";
    },
    [getCountry.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error;
        state.api.loading = "idle";
      }
    },

    [getUserInfo.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
      }
    },
    [getUserInfo.fulfilled]: (state, action) => {
      state.user = action.payload
      state.api.loading = "idle";
    },
    [getUserInfo.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error;
        state.api.loading = "idle";
      }
    },

    [getOrderList.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
      }
    },
    [getOrderList.fulfilled]: (state, action) => {
      state.orderList = action.payload
      state.api.loading = "idle";
    },
    [getOrderList.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error;
        state.api.loading = "idle";
      }
    },

    [addToBasket.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
      }
    },
    [addToBasket.fulfilled]: (state, action) => {
      state.api.loading = "idle";
    },
    [addToBasket.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error;
        state.api.loading = "idle";
      }
    },

    [addUserAddress.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
      }
    },
    [addUserAddress.fulfilled]: (state, action) => {
      state.api.loading = "idle";
    },
    [addUserAddress.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error;
        state.api.loading = "idle";
      }
    },

    [removeFromBasket.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
      }
    },
    [removeFromBasket.fulfilled]: (state, action) => {
      state.api.loading = "idle";
    },
    [removeFromBasket.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error;
        state.api.loading = "idle";
      }
    },
    [startCheckout.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
      }
    },
    [startCheckout.fulfilled]: (state, action) => {
      state.api.loading = "idle";
    },
    [startCheckout.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error;
        state.api.loading = "idle";
      }
    },
  }

});


export const { cartCounts } = ecommerceSlice.actions

export default ecommerceSlice.reducer;




export const setItem = async (key, value) => {
  return AsyncStorage.setItem(key, value)
}

export const getItem = async key => {
  return await AsyncStorage.getItem(key)
};

export const cartCount = async () => {
  const basket = await getBaskets();
  const productQuantity = basket[0]?.line_details.length.toString();
  return productQuantity
}





import storeSlices from "./*/*.slice.js"

// Minimal check to see if imported slice has all properties of an actual slice
const isValid = (slice) => {
  const sliceProps = ["actions", "caseReducers", "name", "reducer"]
  return Object.keys(slice).every(prop => sliceProps.includes(prop))
}

export const slices = storeSlices.filter(slice =>
  slice.value.slice && isValid(slice.value.slice)
).map(slice => slice.value.slice);

export const connectors = slices.reduce((acc, slice) => {
  let name = slice.name.charAt(0).toUpperCase() + slice.name.slice(1)
  acc[name] = slice.reducer
  return acc
}, {})

