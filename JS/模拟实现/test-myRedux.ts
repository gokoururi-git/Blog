import {Action, createStore, combineReducers, Reducer} from './myRedux';

type Test = {
  num: number;
};

// const test = (state: Test, action: Action<number>) => {
//   switch (action.type) {
//     case "add":
//       return {
//         num: state.num + action.payload,
//       };
//     case "sub":
//       return {
//         num: state.num - action.payload,
//       };
//     default:
//       return { num: 0 };
//   }
// };

// const store = createStore<Test, Action<number>>(test);

// const doAddOne = {
//   type: "add",
//   payload: 1,
// };

// console.log(store.getState());

// store.dispatch(doAddOne);

// console.log(store.getState());

// store.dispatch({
//   type: "sub",
//   payload: 1,
// });

// console.log(store.getState());

type NumAction = Action<number>

const reducer = combineReducers<Test, {num: Reducer<Test, NumAction>}>({
  num: (state, action) => {
    switch(action.type){
      case 'type1': {
        return {
          num: 1
        }
      }
      case 'type2': {
        return {
          num: 2
        }
      }
      case 'type3': {
        return {
          num: 'asd'
        }
      }
    }
    return {
      num: action.type === 'add' ? state.num + action.payload : state.num - action.payload
    }
  }
});

const store = createStore<Test, NumAction>(reducer, {num: 0});

console.log(store.getState());

store.dispatch({
  type: 'add', 
  payload: 2
});

console.log(store.getState());

