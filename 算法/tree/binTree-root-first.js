// 根 左 右
function first1(tree) {
  if (!tree) {
    return;
  }
  console.log(tree.value);
  first1(tree.left);
  first1(tree.right);
}

function first2(tree) {
  const stack = [tree];
  while(stack.length !== 0) {
    const curr = stack.shift();
    if (!curr) {
      continue;
    }
    console.log(curr.value);
    curr.left && stack.push(curr.left);
    curr.right && stack.push(curr.right);
  }
}

// 左 根 右
function middle1(tree) {
  if (!tree) {
    return;
  }
  middle1(tree.left);
  console.log(tree.value);
  middle1(tree.right);
}

function last1(tree) {
  if (!tree) {
    return;
  }
  last1(tree.left);
  last1(tree.right);
  console.log(tree.value);
}

// 左 右 根
const root = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
      left: null,
      right: null
    },
    right: {
      value: 5,
      left: null,
      right: null
    }
  },
  right: {
    value: 3,
    left: {
      value: 6,
      left: null,
      right: null
    }
  }
}

first1(root);
console.log('===============');
first2(root);
console.log('===============');
middle1(root);
console.log('===============');
last1(root);