import React, { useState } from 'react';
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import Connexion from "./screens/Connexion";

export default function App() {

  const [isAuth, setIsAuth] = useState<Boolean>(true);//todo false
  const [isSignUpScreen, setIsSignUpScreen] = useState<Boolean>(false);

  if (isAuth) {
    return <Home setIsAuth={setIsAuth} />
  } else {
    if (isSignUpScreen) {
      return <SignUp setIsAuth={setIsAuth} setIsSignUpScreen={setIsSignUpScreen} />
    } else {
      return <Connexion setIsAuth={setIsAuth} setIsSignUpScreen={setIsSignUpScreen} />
    }
  }

}

