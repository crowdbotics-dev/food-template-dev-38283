// @ts-ignore
import { getGlobalOptions } from "@options"
import axios from "axios";
import { getItem } from ".";

const global = getGlobalOptions();
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value

export const getProducts = async () => {
  const response = await fetch(
    `${BASE_URL}/api/products/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
  const data = await response.json();
  return data;
};


export const getProduct = async (url) => {
  const response = await fetch(
    url,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
  const data = await response.json();
  return data;
};

export const productAvailability = async id => {
  const response = await fetch(`${BASE_URL}/api/products/${id}/availability/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  const data = await response.json();
  return data;
};


export const getPrice = async (url) => {
  const response = await fetch(
    url,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
  const data = await response.json();
  return data;
};








const ecommerceAPI = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" }
});



const getProductsList = async () => {
  return ecommerceAPI.get('/api/products/');
}

const logoutUser = async () => {
  const token = await getItem("token")
  return ecommerceAPI.post('/rest-auth/logout/', {
    headers: {
      Authorization: `Token ${token}`
    }
  });
}


const getVendorsList = async () => {
  const token = await getItem("token")
  return ecommerceAPI.get('/consumer/api/v1/vendors/', {
    headers: {
      Authorization: `Token ${token}`
    }
  });
}

const getBasketList = async () => {
  const token = await getItem("token")
  return ecommerceAPI.get('/api/baskets/', {
    headers: {
      Authorization: `Token ${token}`
    }
  });
}

const getUserAddress = async () => {
  const token = await getItem("token")
  return ecommerceAPI.get('/api/useraddresses/', {
    headers: {
      Authorization: `Token ${token}`
    }
  });
}


const getCountry = async (country) => {
  const token = await getItem("token")
  return ecommerceAPI.get(`${country}`, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
}


const getUserInfo = async () => {
  const token = await getItem("token")
  return ecommerceAPI.get(`/rest-auth/user/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
}


const getOrderList = async (url) => {
  const token = await getItem("token")
  return ecommerceAPI.get(`/api/orders/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
}


const addToBasket = async (data) => {
  const token = await getItem("token")
  return ecommerceAPI.post(`/api/basket/add-product/`, data, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
}


const addUserAddress = async (data) => {
  const token = await getItem("token")
  return ecommerceAPI.post(`/api/useraddresses/`, data, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
}


const deleteUserAddress = async (id) => {
  const token = await getItem("token")
  return ecommerceAPI.delete(`/api/useraddresses/${id}`, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
}


const removeFromBasket = async (url) => {
  const token = await getItem("token")
  return ecommerceAPI.delete(`${url}`, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
}


const startCheckout = async (data) => {
  const token = await getItem("token")
  return ecommerceAPI.post(`/api/checkout/`, data, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
}








export const api = {
  getProductsList,
  logoutUser,
  getVendorsList,
  getBasketList,
  getUserAddress,
  getCountry,
  getUserInfo,
  getOrderList,
  addToBasket,
  addUserAddress,
  removeFromBasket,
  startCheckout,
  deleteUserAddress
};






