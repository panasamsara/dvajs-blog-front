import React, {useState, useEffect } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

function IndexPage({dispatch, exampleIndex}) {
 
  const [name, setName] = useState(exampleIndex.name)
  useEffect(()=>{ // 监听name变化
    setName(exampleIndex.name)
  }, exampleIndex.name)

  const clickTest = ()=>{ //点击事件 重设model中 name值
    dispatch({type:'exampleIndex/test' , payload: {
      name: '李四'
    }})
  }
  
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
      <div onClick={()=>{clickTest()}}>按钮test</div>
      <div>111{name}</div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect(state=>state)(IndexPage);
