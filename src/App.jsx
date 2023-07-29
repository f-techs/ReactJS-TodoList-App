import React, { useEffect, useReducer, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Container from "./components/Container/Container";
import AppHeader from "./components/AppHeader/AppHeader";
import EnterBox from "./components/EnterBox/EnterBox";
import Todo from "./components/Todo/Todo";
import AppFooter from "./components/AppFooter/AppFooter";
import Overlay from "./components/Overlay/Overlay";
import ErrorModal from "./components/ErrorModal/ErrorModal";

const data = {
  items: [
    // {
    //   itemId: 0,
    //   item: "",
    //   completed: false,
    //   active: false,
    // },
  ],
  filteredData: null,
  filteredStatus: false,
  filteredText: "Active Items Left",
};

const error = {
  status: false,
  title: "",
  message: "",
};

const ACTIONS = {
  add: "ADD_ITEM",
  search: "SEARCH_ITEM",
  check: "MARK_ITEM",
  active: "ACTIVE_ITEMS",
  completed: "COMPLETED_ITEMS",
  all: "ALL_ITEMS",
};

const reducerFn = (state, action) => {
  if (action.type === ACTIONS.add) {
    const newTodo = {
      itemId: state.items.length + 1 - 1,
      item: action.payload,
      completed: false,
      active: true,
    };
    return {
      ...state,
      items: [...state.items, newTodo],
      filteredData: null,
      filteredStatus: false,
      filteredText: "Active Items",
    };
  }
  if (action.type === ACTIONS.search) {
    const searchedItemState = state.items.filter((itemObj) => {
      return itemObj.item.toLowerCase().includes(action.payload.toLowerCase());
    });
    return {
      ...state,
      filteredData: searchedItemState,
      filteredStatus: true,
      filteredText: "Items Found",
    };
  }
  if (action.type === ACTIONS.check) {
    //update const is possible since we are not reassigning
    const UpdatedTodoItemsItem = [...state.items]
    UpdatedTodoItemsItem[action.payload].completed=true
    UpdatedTodoItemsItem[action.payload].active=false

     //refilter to get only active items
      const filteredData = state.items.filter((item) => {
      return item.active === true;
    });
    return {
      ...state,
      items: UpdatedTodoItemsItem,
      filteredData: filteredData,
      filteredStatus: true,
    };
  }
  if(action.type === ACTIONS.active){
    const filteredData = state.items.filter((item)=>{
        return item.active === true
    })
    return {...state, items:[...state.items], filteredData:filteredData, filteredStatus:true}
  }

  if(action.type === ACTIONS.completed){
    const filteredData = state.items.filter((item)=>{
      return item.completed === true
  })
  return {...state, items:[...state.items], filteredData:filteredData, filteredStatus:true}
  }

  if(action.type === ACTIONS.all){
    return {...state, items:[...state.items], filteredData:[...state.items], filteredStatus:true}
  }
  return state;
};

function App() {
  const inputRef = useRef(null);
  const [todoState, dispatchTodo] = useReducer(reducerFn, data);
  const [errorState, setErrorState] = useState(error);

  let listOfItems;

  console.log(todoState.items);

  const onAddItemHandler = () => {
    if (inputRef.current.value === "") {
      setErrorState({
        status: true,
        title: "Empty Input Box Error",
        message: "Please input box cannot be empty",
      });
      return;
    }
    dispatchTodo({ type: ACTIONS.add, payload: inputRef.current.value });
    //forced dom manipulation
    inputRef.current.value = "";
  };

  const onSearchItemHandler = () => {
    if (inputRef.current.value === "") {
      setErrorState({
        status: true,
        title: "Empty Input Box Error",
        message: "Please input box cannot be empty",
      });
      return;
    }
    dispatchTodo({ type: ACTIONS.search, payload: inputRef.current.value });
    console.log(todoState);
  };

  const onCloseModalHandler = () => {
    setErrorState({ ...errorState, status: false });
  };

  const completeTodoHandler = (ITEMID) => {
    dispatchTodo({ type: ACTIONS.check, payload: ITEMID });
    console.log(ITEMID);
  };

  const onFilterActiveItemsHandler = ()=>{
    dispatchTodo({type:ACTIONS.active})
  }

  const onAllItemsHandler = () =>{
    dispatchTodo({type:ACTIONS.all})
  }
  
  const onCompletedItemsHandler = ()=>{
    dispatchTodo({type:ACTIONS.completed})
  }

  //list of items
  if (todoState.filteredStatus) {
    listOfItems = todoState.filteredData.map((item, index) => {
      return (
        <Todo
          key={index}
          todo={item.item}
          complete={item.completed}
          onCompleteHandler={() => completeTodoHandler(index)}
        />
      );
    });
  } else {
    listOfItems = todoState.items
      .filter((item) => {
        return item.active === true;
      })
      .map((item, index) => {
        return (
          <Todo
            key={index}
            todo={item.item}
            complete={item.completed}
            onCompleteHandler={() => completeTodoHandler(index)}
          />
        );
      });
  }

  return (
    <>
      {errorState.status &&
        ReactDOM.createPortal(<Overlay />, document.getElementById("overlay"))}
      {errorState.status &&
        ReactDOM.createPortal(
          <ErrorModal
            title={errorState.title}
            message={errorState.message}
            onCloseModal={onCloseModalHandler}
          />,
          document.getElementById("error-modal")
        )}
      <Container>
        <AppHeader title="Things to do" />
        <EnterBox ref={inputRef} />
        {listOfItems}
        <AppFooter
          activeItems={listOfItems.length}
          filteredText={todoState.filteredText}
          addItemHandler={onAddItemHandler}
          searchItemHandler={onSearchItemHandler}
          findActiveItemsHandler={onFilterActiveItemsHandler}
          findAllItemsHandler={onAllItemsHandler}
          findCompletedItemsHandler={onCompletedItemsHandler}
        />
      </Container>
    </>
  );
}

export default App;
