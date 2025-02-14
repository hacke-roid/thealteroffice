import { createContext, useState } from "react";

export let MyContext = createContext();

export const MyProvider = ({ children }) => {
  let userId = localStorage.getItem('userId');
  const [data, setData] = useState({});
  const [isLogin, setIsLogin] = useState(userId)
  console.log(data)

  return <MyContext.Provider value={{ data, setData, setIsLogin, isLogin }}>{children}</MyContext.Provider>;
};
