/*
 * @Description: 
 * @Author: caohaohao
 * @Date: 2021-04-06 10:24:30
 * @LastEditTime: 2021-04-20 17:08:33
 * @LastEditors: caohaohao
 */
/**
 * 查询符合selector以及其所有祖先元素的常用css属性
 * @param { string | HTMLElement } item
 * @param { string | undefined } attr
 */
function getStyleInfo(item, attr) {
  let ele = null;
  if(typeof item === 'string'){
    ele = document.querySelector(item);
  }else if(item.tagName){
    ele = item;
  }else{
    console.error('no item matched:');
    console.error(item);
  }
  console.log(ele);
  let styles = window.getComputedStyle(ele);
  console.log(`:
  width: ${styles.width}
  height: ${styles.height}
  margin: ${styles.margin}
  border: ${styles.border}
  padding: ${styles.padding}
  position: ${styles.position}
  top: ${styles.top}
  right: ${styles.right}
  bottom: ${styles.bottom}
  left: ${styles.left}
  display: ${styles.display}
  ${attr ? attr : '...'}:${attr ? styles[attr] : ''}`);
  if (ele.parentElement.tagName !== 'HTML') {
    getStyleInfo(ele.parentElement, attr);
  }
}

/**
 * 查询两个元素之间的距离
 * @param { HTMLElement } container
 * @param { HTMLElement } item
 */
function getOffset(container, item) {
  let containerRect = container.getBoundingClientRect();
  let itemRect = item.getBoundingClientRect();
  console.log('container:');
  console.log(container);
  console.log('item:');
  console.log(item);
  console.log(`
  上边距差${itemRect.top - containerRect.top}px
  右边距差${containerRect.right - itemRect.right}px
  下边距差${containerRect.bottom - itemRect.bottom}px
  左边距差${itemRect.left - containerRect.left}px
  `);
}


