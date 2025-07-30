import styles from './SearchFilter.module.scss';

export const SearchFilter = ({value, onChange}) => {
	return (
		<label className={styles.filter}>
			<span className={styles.filterLabel}>Filter by name</span>
			<input
				type="text"
				placeholder="Start typing name..."
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</label>
	);
};
