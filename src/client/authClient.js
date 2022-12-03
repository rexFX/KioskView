import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cookie, setCookie] = useState(null);
  const [roll, setRoll] = useState(null);

  const navigate = useNavigate();

  const login = (data) => {
    setUser(data['user']);
    setRoll(data['roll']);
    setCookie(data['cookie']);
    setLoggedIn(true);
    navigate('/home');
  }


  const logout = () => {
    setUser(null);
    setRoll(null)
    setCookie(null);
    setLoggedIn(false);
    navigate('/');
  }

  return <AuthContext.Provider value={{ user, cookie, isLoggedIn, roll, login, logout }}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
  return useContext(AuthContext);
}

