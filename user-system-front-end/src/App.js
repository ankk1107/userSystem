import React, { createContext, useContext, useEffect, useState } from 'react';
import Register from './Register';
import Login from './Login';
import './index.css'; // 引入CSS文件"

export const ThemeContext = createContext()

function App() {
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {

    return () => { }
  }, [])

  return (
    <div className="container">
      <ThemeContext.Provider value={{ theme: 'light' }}>
        <div className="form-container">
          {isLogin ? (
            <>
              <Login onSwitchToRegister={() => setIsLogin(false)} />
              <div className="form-switch">
                <a onClick={() => setIsLogin(false)}>Don't have an account? Register here</a>
              </div>
            </>
          ) : (
            <>
              <Register onSwitchToLogin={() => setIsLogin(true)} />
              <div className="form-switch">
                <a onClick={() => setIsLogin(true)}>Already have an account? Login here</a>
              </div>
            </>
          )}
        </div>
        <img src="http://localhost:8080/images/boy.png" />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;