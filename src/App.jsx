import React, { useReducer, useRef, useState } from "react";
import ReactDOM  from "react-dom";
import Container from "./components/Container/Container";
import AppHeader from "./components/AppHeader/AppHeader";
import EnterBox from "./components/EnterBox/EnterBox";
import Todo from "./components/Todo/Todo";
import AppFooter from "./components/AppFooter/AppFooter";
import Overlay from "./components/Overlay/Overlay";
import ErrorModal from "./components/ErrorModal/ErrorModal";

const data = { items: [], filteredData:null, filteredStatus:false}

const error = {
  status:false,
  title:'',
  message:'', 
}

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
  return {...state, items:[...state.items, newTodo], filteredData:null, filteredStatus:false}
}
if(action.type === ACTIONS.search){
  const searchedItemState=state.items.filter((itemObj)=>{
    return itemObj.item.includes(action.payload)
  });
 return {...state, filteredData:searchedItemState, filteredStatus:true};
}
return state
}

function App() {
  const inputRef = useRef(null);
  const [todoState, dispatchTodo] = useReducer(reducerFn, data);
  const [errorState, setErrorState] = useState(error)

  let listOfItems;

  const onAddItemHandler=()=>{
    if(inputRef.current.value===''){
      setErrorState({status:true, title:'Empty Input Box Error', message:'Please input box cannot be empty'})
      return
    }
    dispatchTodo({type:ACTIONS.add, payload:inputRef.current.value})
    //forced dom manipulation
    inputRef.current.value='';
  }


  const onSearchItemHandler=()=>{
    if(inputRef.current.value===''){
      setErrorState({status:true, title:'Empty Input Box Error', message:'Please input box cannot be empty'})
      return
    }
    dispatchTodo({type:ACTIONS.search, payload:inputRef.current.value})
    console.log(todoState)
  }

  const onCloseModalHandler=()=>{
    setErrorState({...errorState, status:false})
  }



  //list of items
  if(todoState.filteredStatus){
    listOfItems = todoState.filteredData.map((item, index)=>{
      return (
          <Todo key={index} todo={item.item}/>
      )
    })
  }else{
    listOfItems = todoState.items.filter((item)=>{
      return item.active === true
    }).map((item, index)=>{
      return (
          <Todo key={index} todo={item.item}/>
      )
    })
  }
  

  return (
    <>
    {errorState.status && ReactDOM.createPortal(<Overlay/>, document.getElementById('overlay'))}
    {errorState.status && ReactDOM.createPortal(<ErrorModal
    title={errorState.title}
    message={errorState.message}
    onCloseModal={onCloseModalHandler}
    />, document.getElementById('error-modal'))}
    <Container>
      <AppHeader title="Things to do"/>
      <EnterBox ref={inputRef}/>
      {listOfItems}
      <AppFooter activeItems={listOfItems.length} addItemHandler={onAddItemHandler} searchItemHandler={onSearchItemHandler}/>
    </Container>
    </>
  )
}

export default App
