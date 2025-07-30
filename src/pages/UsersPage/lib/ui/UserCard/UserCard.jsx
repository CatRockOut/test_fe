import { Link } from 'react-router-dom';

import styles from './UserCard.module.scss';

export const UserCard = (props) => {
	const { id, avatar, firstName, lastName, email} = props;
	
	console.log(props);
	
	return (
		<li key={id} className={styles.card}>
			<div className={styles.cardInner}>
				<img src={avatar} alt={`avatar ${firstName} ${lastName}`}/>
				<div className={styles.userMeta}>
					<div className={styles.userName}>
						<span>{firstName}</span>
						<span>{lastName}</span>
					</div>
					<div className={styles.userEmail}>{email}</div>
				</div>
			</div>
			
			<div className={styles.cardActions}>
				<Link to={`/users/${id}`} className={styles.btn}>Details</Link>
			</div>
		</li>
	);
};
