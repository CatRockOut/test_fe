import { useMemo, useState } from 'react';

import { useUsers } from '../../context/UsersContext.jsx';
import Spinner from '../../components/Spinner/Spinner.jsx';
import { SearchFilter, UserCard } from './lib/index.js';

import styles from './UsersPage.module.scss';

export default function UsersPage() {
	const { users, status, reload } = useUsers();
	const [searchQuery, setSearchQuery] = useState('');
	
	const filtered = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) return users;
		
		return users.filter((user) => {
			const full = `${user.firstName} ${user.lastName}`.toLowerCase();
			return full.includes(query);
		});
	}, [users, searchQuery]);
	
	return (
		<section className={styles.userSection}>
			<h1>Users</h1>
			{status === 'loading' && <Spinner label="Loading user list..."/>}
			{status === 'error' && (
				<div className={styles.cardError}>
					<p>There was an error loading.</p>
					<button onClick={reload} className={styles.btn}>Try again</button>
				</div>
			)}
			А
			{status === 'ready' && (
				<>
					<SearchFilter value={searchQuery} onChange={setSearchQuery}/>
					
					{filtered.length === 0 ? (
						<p className={styles.empty}>
							Nothing found for request "{searchQuery}".
						</p>
					) : (
						<ul className={styles.userList}>
							{filtered.map((user) => (
								<UserCard key={user.id} {...user}/>
							))}
						</ul>
					)}
				</>
			)}
		</section>
	);
}
