import styles from "./Layout.module.css";

function Layout(props) {
	return (
		<>
			<div className={styles.layout}>
				<div className={styles.container}>
					<div className={styles.content}>{props.children}</div>
				</div>
			</div>
		</>
	);
}

export default Layout;
