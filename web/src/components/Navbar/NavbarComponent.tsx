import * as React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './NavbarComponent.css';

const elements = [
    ['/', 'Home'],
    ['/blog', 'Blog'],
    ['/storage', 'Storage'],
    ['/about', 'About']
];

export class NavbarComponent extends React.Component {
    public render() {
        return (
            <div className={styles.Navbar}>
                {
                    Array.from(elements).map((value, index) =>
                        <div className={styles.NavbarFont}><Link to={value[0]}>{value[1]}</Link></div>)
                }
            </div>
        );
    }
}