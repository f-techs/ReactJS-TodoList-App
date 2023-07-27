import React, { useReducer, useRef } from "react";
import Container from "./components/Container/Container";
import AppHeader from "./components/AppHeader/AppHeader";
import EnterBox from "./components/EnterBox/EnterBox";
import Todo from "./components/Todo/Todo";
import AppFooter from "./components/AppFooter/AppFooter";

const data = [
  {
    item:'First item',
    completed:false,
    active:false,
  }
]

const ACTIONS = {
  add:'ADD_ITEM', 
  search:'SEARCH_ITEM',
  active:'ACTIVE_ITEMS',
  completed:'COMPLETED_ITEMS', 
  all:'ALL_ITEMS'
}

const reducerFn=(state, action)=>{
if(action.type === ACTIONS.add){
  const newTodo = {
    item:action.payload,
    completed:false,
    active:true
  }
  return [...state, newTodo];
}
return state
}

function App() {
  const inputRef = useRef();
  const [todoState, dispatchTodo] = useReducer(reducerFn, data)

  const onAddItemHandler=()=>{
    dispatchTodo({type:ACTIONS.add, payload:inputRef.current.value})
    //forced dom manipulation
    inputRef.current.value='';
  }



  //list of items
  const listOfItems = todoState.map((item, index)=>{
    return (
        <Todo key={index} todo={item.item}/>
    )
  })

  return (
    <>
    <Container>
      <AppHeader title="Things to do"/>
      <EnterBox ref={inputRef}/>
      {listOfItems}
      <AppFooter addItemHandler={onAddItemHandler}/>
    </Container>
    </>
  )
}

export default App
