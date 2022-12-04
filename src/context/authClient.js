import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [roll, setRoll] = useState(null);
  const [cookie, setCookie] = useState(null);

  const navigate = useNavigate();

  const login = (data) => {
    setUser(data['user']);
    setRoll(data['roll']);
    setCookie(data['Cookie']);
    setLoggedIn(true);
    navigate('/home');
  }


  const logout = () => {
    setUser(null);
    setRoll(null)
    setLoggedIn(false);
    axios.post('https://webkiosk-api.onrender.com/api/v1/logout', null, { headers: { Cookie: cookie } })
      .then(navigate('/'))
      .catch(err => alert(err));
  }

  return <AuthContext.Provider value={{ user, isLoggedIn, roll, login, logout, cookie }}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
  return useContext(AuthContext);
}

