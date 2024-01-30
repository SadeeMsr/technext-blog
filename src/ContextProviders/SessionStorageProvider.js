"use client";
import { createContext, useState, useEffect } from "react";

export const SessionStorageContext = createContext();

export default function SessionStorageProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("storedFavData");
    setData(storedData? JSON.parse(storedData):[]);
  }, []);

  const addData = (cardData) => {
    const newData = [...data, cardData];
    setData(newData);
    sessionStorage.setItem("storedFavData", JSON.stringify(newData));
  };

  const removeData = (id) => {
    const updatedFav =  data?.filter((blog) => blog?.id !== id);
    sessionStorage.setItem('storedFavData', JSON.stringify(updatedFav));
    setData(updatedFav);
}

  return (
    <SessionStorageContext.Provider value={{ data, addData, removeData }}>
      {children}
    </SessionStorageContext.Provider>
  );
}
