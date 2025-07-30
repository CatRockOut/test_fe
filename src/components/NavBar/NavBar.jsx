import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from './NavBar.module.scss';

export default function NavBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	
	const toggleMenuOpen = () => setIsMenuOpen((prevState) => !prevState);
	const closeMenu = () => setIsMenuOpen(false);
	
	return (
		<header className={styles.navbar}>
			<div className={styles.navbarInner}>
				<Link to='/' className={styles.brand}>Logo</Link>
				<button className={styles.burgerMenu} onClick={toggleMenuOpen}>
					<span/>
					<span/>
					<span/>
				</button>
				<nav
					className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}
					onClick={closeMenu}
				>
					<NavLink to="/about">About</NavLink>
					<NavLink to="/users">Users</NavLink>
				</nav>
			</div>
		</header>
	);
}
