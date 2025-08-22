import { createContext, useEffect, useState } from "react";
import type { CartItemType, ProductType, ShopContextType } from "./type";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext<ShopContextType>(
  {} as ShopContextType
);

const ShopContextProvider = ({ children }: { children: React.ReactNode }) => {
  const currency = "S/.";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType>({});
  const [products, setProducts] = useState<ProductType[]>([]);
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  const addToCart = async (itemId: string, size: string) => {
    if (!size) {
      toast.error("Please Select a Size");
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          {
            headers: {
              token,
            },
          }
        );
      } catch (error: unknown) {
        console.log(error);
        toast.error((error as Error).message);
      }
    }
  };

  const getCartCount = (): number => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        try {
          if (cartItems[itemId][size] > 0) {
            totalCount += cartItems[itemId][size];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (
    itemId: string,
    size: string,
    quantity: number
  ) => {
    const cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
    
    if(token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, {
          headers: {
            token,
          },
        })
      } catch (error : unknown) {
        console.log(error)
        toast.error((error as Error).message)
      }
    }
  };

  const getCartAmount = (): number => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (!itemInfo) continue; // Si no existe, saltamos
      for (const size in cartItems[itemId]) {
        try {
          if (cartItems[itemId][size] > 0) {
            totalAmount += itemInfo.price * cartItems[itemId][size];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error: unknown) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };
  
  const getUserCart = async (token : string) => { 
    try {
      const response = await axios.post(backendUrl + "/api/cart/get", {}, {
        headers: {token},
      });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error: unknown) {
      console.log(error);
      toast.error((error as Error).message);
    }
   }
  
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token") as string);
      getUserCart(localStorage.getItem("token") as string);
    }
  }, []);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
    logout,
    getUserCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
