import React from "react";
import Container from "./components/Container/Container";
import AppHeader from "./components/AppHeader/AppHeader";
import EnterBox from "./components/EnterBox/EnterBox";
import Todo from "./components/Todo/Todo";
import AppFooter from "./components/AppFooter/AppFooter";



function App() {
  return (
    <>
    <Container>
      <AppHeader title="Things to do"/>
      <EnterBox/>
      <Todo todo="My first Todo"/>
      <AppFooter/>
    </Container>
    </>
  )
}

export default App
