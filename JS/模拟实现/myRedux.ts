interface BaseAction {
  type: string;
}
interface Action<T> extends BaseAction{
  payload?: T;
}

interface BaseState {};

const createStore = <StateType extends BaseState , ActionType extends BaseAction>(reducer: (state?: StateType, action?: ActionType) => StateType) => {
  let state = reducer({} as StateType, {type: 'default'} as ActionType) as StateType;
  const listeners = [];
  return {
    dispatch: (action: ActionType)=> {
      state = reducer(state, action);
      listeners.forEach((item) => {
        item();
      });
    },
    getState: (() => {return state})  as () => StateType,
    subscribe: (listener: Function) => {
      listeners.push(listener);
    },
  };
};

type Test = {
  num: number;
};

const test = (state: Test , action: Action<number>)=>{
  switch (action.type) {
    case "add":
      return {
        num: (state.num + action.payload),
      };
    case "sub":
      return {
        num: (state.num - action.payload),
      };
    default:
      return { num: 0 };
  }
};

const store = createStore<Test, Action<number>>(test);

const doAddOne = {
  type: 'add',
  payload: 1
}

console.log(store.getState())

store.dispatch(doAddOne);

store.dispatch({
  type: 'sub', 
  payload: 1
})