"use client";

import { useState, useContext, useEffect } from "react";
import { SessionStorageContext } from "@/ContextProviders/SessionStorageProvider";

export default function FavoriteBtn({ cardBody }) {
  const { data, addData } = useContext(SessionStorageContext);
  const [isBtnClicked, setBtnClicked] = useState(false);

  useEffect(() => {
    setBtnClicked(data?.some((obj) => obj.id === cardBody?.id)) 
  }, [data])
  

  const handleAddData = () => {
    addData(cardBody);
    setBtnClicked(true);
  };


  return (
    <div className={`flex items-center cursor-pointer text-sm`}>
      {isBtnClicked ? (
        <button>Marked</button>
      ) : (
        <button onClick={handleAddData}>Mark</button>
      )}
    </div>
  );
}
