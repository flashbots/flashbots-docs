import React from 'react';
import Navbar from '@theme-original/Navbar';
import Banner from '../../components/Banner/Banner'
import styles from './navbar.module.css'

export default function NavbarWrapper(props) {
  return (
    <div className={styles.combinedNavigation}>
      <Banner/>
      <Navbar {...props} />
    </div>
  );
}
