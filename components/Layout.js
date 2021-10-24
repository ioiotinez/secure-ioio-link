import styles from "./Layout.module.css";

function Layout(props) {
	return (
		<div className={styles.layout}>
			<div className={styles.container}>{props.children}</div>
		</div>
	);
}

export default Layout;
