
namespace GradingSystem {
  interface Action {
    handler: Function;
    grade: number;
  }
  interface ActionStore {
    [actionKey: string]: Action[];
  }
  class GradingSystemCenter {
    private actionStore = {} as ActionStore;
    register = (actionKey: string, handler: Function, grade?: number) => {
      if (this.actionStore[actionKey]) {
        this.actionStore[actionKey].push({ handler, grade: grade ?? -1 });
      } else {
        this.actionStore[actionKey] = [{ handler, grade: grade ?? -1 }];
      }
    };
    withdraw = (actionKey: string, handler?: Function) => {
      if (handler) {
        let targetIndex = this.actionStore[actionKey].findIndex(
          (item) => item.handler === handler
        );
        this.actionStore[actionKey].splice(targetIndex, 1);
      } else {
        delete this.actionStore[actionKey];
      }
    };
    doWithGrade = (actionKey: string, grade?: number) => {
      grade = grade ?? -1;
      return Promise.allSettled(
        this.actionStore[actionKey]
          .filter((item) => grade >= item.grade)
          .map((item) => {
            return new Promise(() => {
              return item.handler();
            });
          })
      );
    };
  }
  const gradeCanter = new GradingSystemCenter();

  gradeCanter.register('close', ()=>{console.log('close is launched with grade 1')}, 1);
  gradeCanter.register('close', ()=>{console.log('close is launched with grade 2')}, 2);
  gradeCanter.register('close', ()=>{console.log('close is launched with grade 3')}, 3);
  gradeCanter.register('close', ()=>{console.log('close is launched with grade 4')}, 4);
  gradeCanter.register('close', ()=>{console.log('close is launched with grade 5')}, 5);
  gradeCanter.register('close', ()=>{console.log('close is launched with grade 6')}, 6);
  gradeCanter.register('close', ()=>{console.log('close is launched with grade 7')}, 7);
  gradeCanter.register('close', ()=>{console.log('close is launched with grade 8')}, 8);
  gradeCanter.register('close', ()=>{console.log('close is launched with grade 9')}, 9);
  gradeCanter.register('close', ()=>{console.log('close is launched with grade 10')}, 10);
  gradeCanter.register('close', ()=>{console.log('close is launched with grade 11')}, 11);
  gradeCanter.register('close', ()=>{console.log('close is launched with grade 12')}, 12);
  gradeCanter.register('close', ()=>{console.log('close is launched with grade 13')}, 13);
  gradeCanter.register('close', ()=>{console.log('close is launched with grade 14')}, 14);
  gradeCanter.register('close', ()=>{console.log('close is launched with grade 15')}, 15);

  gradeCanter.doWithGrade('close', 9);
}

import {useEffect, useState} from 'react';

const [data, setData] = useState('data');

useEffect(()=>{
  setTimeout(()=>{
    console.log(data);
  }, 500);
}, [data]);

