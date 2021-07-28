const listenerList = Symbol();
const maxListener = Symbol();
export class EventEmitter {
  constructor() {
    this[listenerList] = {};
    this[maxListener] = 10;
  }
  on(eventType, listener) {
    if (this[listenerList][eventType] === undefined) {
      this[listenerList][eventType] = [listener];
    } else {
      if (this[listenerList][eventType].length === 10) {
        throw new RangeError(
          `error add listener: the listeners of type ${eventType} is more than maximum ${this[maxListener]}`
        );
      } else {
        this[listenerList][eventType].push(listener);
      }
    }
  }
  emit(eventType, ...args) {
    this[listenerList][eventType] &&
      this[listenerList][eventType].forEach((item) => {
        item.call(null, ...args);
      });
  }
  removeListener(eventType, listener) {
    this[listenerList][eventType] &&
      this[listenerList][eventType].forEach((item, index, arr) => {
        if (item === listener) {
          arr.splice(index, 1);
        }
      });
  }
  once(eventType, listener) {
    this.on(eventType, (...args) => {
      listener.call(null, ...args);
      this.off(eventType, listener);
    });
  }
  removeAllListeners(eventType) {
    this[listenerList][eventType] = [];
  }
  listeners(eventType) {
    return this[listenerList][eventType];
  }
}
