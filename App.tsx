import React, { useState } from 'react';
import Home from "./screens/Home";
import Connexion from "./screens/Connexion";

export default function App() {

  const [isAuth, setIsAuth] = useState<Boolean>(false);

  if (isAuth) {
    return <Home setIsAuth={setIsAuth} />
  } else {
    return <Connexion setIsAuth={setIsAuth} />
  }

}

