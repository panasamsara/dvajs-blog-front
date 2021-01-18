import React, {useState, useEffect } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

function IndexPage(props) {
 
  const [name, setName] = useState(props.exampleIndex.users.name)
  useEffect(()=>{
    // console.log(111, props)
  })
  
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
      <div>111{name}</div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect(state=>state)(IndexPage);
