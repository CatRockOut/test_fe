import styles from './AboutPage.module.scss';

export default function AboutPage() {
	return (
		<section className={styles.aboutSection}>
			<h1>About</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
				hendrerit, urna quis ultrices suscipit, risus lacus sodales urna, non
				bibendum quam felis et velit. Phasellus quis leo sed est gravida
				tincidunt. Sed id arcu id metus tincidunt feugiat.
			</p>
		</section>
	);
}
