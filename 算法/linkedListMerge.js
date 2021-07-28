function arrayToLink(a){
  const root = {
    value: a[0],
    next: null
  }
  let p = root;
  for(let i = 1; i < a.length; i++){
    p.next = {
      value: a[i],
      next: null
    }
    p = p.next;
  }
  p.next = null;
  return root;
}

function merge(link1, link2){
  let p1 = link1, p2 = link2;
  const root = {
    value: undefined,
    next: null
  }
  let p = root;
  while(p1 && p2){
    if(p1.value <= p2.value){
      p.value = p1.value;
      p1 = p1.next;
    }else{
      p.value = p2.value;
      p2= p2.next;
    }
    p.next = {
      value: undefined,
      next: null
    };
    p = p.next;
  }
  while(p1 !== null){
    p.value = p1.value;
    p.next = {
      value: undefined,
      next: null
    };
    p = p.next;
    p1 = p1.next;
  }
  while(p2 !== null){
    p.value = p2.value;
    p.next = {
      value: undefined,
      next: null
    };
    p = p.next;
    p2 = p2.next;
  }
  return root;
}

function myPrint(root){
  let p = root;
  while(p && p.value){
    console.log(`${p.value},`);
    p = p.next;
  }
}

const link1 = arrayToLink([1,3,5,7,9]);

const link2 = arrayToLink([2,3,4,8,9]);

myPrint(merge(link1,link2));
