import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { addTodo, toggleTodoByText } from '../actions';
import VisibleTodoList from '../containers/VisibleTodoList';
import rootReducer from '../reducers';

const stories = storiesOf('Storybook Knobs', module);
stories.addDecorator(withKnobs);


const getTodoText = i => `Todo ${i+1}`;

const WithRedux = () => {
  // add a "todo amount" slider
  const todoNumber = number("Number of Todos", 2, {
    range: true,
    min: 1,
    max: 5,
    step: 1,
  });

  // for every todo, add a checkbox to toggle it
  const booleans = [];
  for(let i = 0, n = todoNumber; i < n; i++) {
    booleans.push(boolean(getTodoText(i), false));
  }

  // every time the (coming from knobs) todos change, dispatch the corresponding actions
  React.useEffect(() => {
    booleans.forEach((todo, i) => {
      // add a todo
      store.dispatch(addTodo(getTodoText(i)))
      // toggle the todo if needed
      if(todo === true) {
        store.dispatch(toggleTodoByText(getTodoText(i)))
      }
    });
  }, [booleans.join(",")]);

  // return a new component connected to a new store
  const store = createStore(rootReducer)
  return(
  <Provider store={store}>
    <VisibleTodoList />
  </Provider>
)}


stories
  .add('with Redux', () => <WithRedux />);
