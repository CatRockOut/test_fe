import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
	return (
		<section className={styles.notFoundSection}>
			<h1>404 - Page not found</h1>
			<p>The requested page does not exist.</p>
			<div className={styles.row}>
				<Link to="/about" className={styles.btn}>Go to About Page</Link>
				<Link to="/users" className={`${styles.btn} ${styles.ghost}`}>Go to Users Page</Link>
			</div>
		</section>
	);
}
