import {createContext, useState} from "react";

export const CookieContext = createContext({
  cookie: null,
  setCookie: () => null,
});

export const CookieProvider = ({children}) => {
  const [cookie, setCookie] = useState(null);
  const val = {cookie, setCookie};
  return <CookieContext.Provider value={val}>{children}</CookieContext.Provider>
}