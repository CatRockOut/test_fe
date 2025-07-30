import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { useUsers } from '../../context/UsersContext.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
import { useToast } from '../../components/Toast/Toast.jsx';

import styles from './UserDetailsPage.module.scss';

export default function UserDetailsPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { status, getById } = useUsers();
	const { addToast } = useToast();
	
	const user = getById(id);
	
	useEffect(() => {
		if (status === 'ready' && !user) {
			addToast('The user was not found in the loaded list.', 'error');
		}
	}, [status, user, addToast]);
	
	if (status === 'loading') return <Spinner label="Loading user details..."/>;
	
	if (!user) {
		return (
			<section className={styles.userDetailsSection}>
				<h1>User not found</h1>
				<p>Go to the user list and select the user from there.</p>
				<div className={styles.row}>
					<button className={styles.btn} onClick={() => navigate('/users')}>Back to list</button>
					<Link to="/about" className={`${styles.btn} ${styles.ghost}`}>To the home page</Link>
				</div>
			</section>
		);
	}
	
	return (
		<section className={styles.userDetailsSection}>
			<button className={`${styles.btn} ${styles.ghost}`} onClick={() => navigate('/users')}>
				&larr; Back to list
			</button>
			
			<div className={styles.userDetailsInner}>
				<img
					className={styles.detailsAvatar}
					src={user.avatar}
					alt={`avatar ${user.firstName} ${user.lastName}`}
				/>
				<div className={styles.detailsBody}>
					<h1 className={styles.detailsName}>
						{user.firstName} {user.lastName}
					</h1>
					<dl className={styles.detailsList}>
						<div>
							<dt>Username</dt>
							<dd>{user.username}</dd>
						</div>
						<div>
							<dt>Email</dt>
							<dd><a href={`mailto:${user.email}`}>{user.email}</a></dd>
						</div>
						<div>
							<dt>Phone</dt>
							<dd><a href={`tel:${user.phone}`}>{user.phone}</a></dd>
						</div>
						<div>
							<dt>Website</dt>
							<dd>
								<a target="_blank" href={`https://${user.website}`}>
									{user.website}
								</a>
							</dd>
						</div>
						<div>
							<dt>Company</dt>
							<dd>{user.company}</dd>
						</div>
						<div>
							<dt>City</dt>
							<dd>{user.city}</dd>
						</div>
					</dl>
				</div>
			</div>
		</section>
	);
}
