interface BaseAction {
  type: string;
}
export interface Action<T> extends BaseAction {
  payload: T;
}

interface BaseState {}

export type Reducer<
  StateType extends BaseState = BaseState,
  ActionType extends BaseAction = BaseAction
> = (state: StateType, action: ActionType) => StateType;

export const createStore = <
  StateType extends BaseState,
  ActionType extends BaseAction
>(
  reducer: Reducer<StateType, ActionType>,
  initialState?: StateType
) => {
  // 执行createStore时initialState不传的话，给state传的值就是undefined，所以这里不用对initialState进行检查
  let state = reducer(initialState, {
    type: "__unique__default__type__", // 应该传一个以后不会出现的hash值，这里做了简化
  } as ActionType) as StateType;
  const listeners = [] as Function[];
  return {
    dispatch: (action: ActionType) => {
      state = reducer(state, action);
      listeners.forEach((item) => {
        item();
      });
    },
    getState: (() => {
      return state;
    }) as () => StateType,
    subscribe: (listener: Function) => {
      listeners.push(listener);
    },
  };
};

export const combineReducers = <
  StateType extends BaseState,
  ReducersType extends {
    [reducerKey in keyof StateType]: Reducer<StateType, BaseAction>;
  }
>(
  reducers: ReducersType
) => {
  return <ActionType>(state: StateType, action: ActionType) => {
    return Object.keys(reducers).reduce((previousState, currentKey) => {
      previousState[currentKey] = reducers[currentKey](previousState, action);
      return previousState;
    }, state);
  }
};
