import styles from './Spinner.module.scss';

export default function Spinner() {
	return (
		<div className={styles.spinnerWrap}>
			<div className={styles.spinner}/>
		</div>
	);
}
