import React from "react";
import Container from "./components/Container/Container";
import AppHeader from "./components/AppHeader/AppHeader";
import EnterBox from "./components/EnterBox/EnterBox";


function App() {
  return (
    <>
    <Container>
      <AppHeader title="My TodoList App"/>
      <EnterBox/>
    </Container>
    </>
  )
}

export default App
