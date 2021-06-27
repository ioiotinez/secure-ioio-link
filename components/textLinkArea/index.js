import styles from "../../styles/Home.module.css";

export default function TextLinkArea({ onChange }) {
	return (
		<>
			<textarea
				rows="10"
				cols="50"
				defaultValue=""
				className={styles.textLink}
				onChange={onChange}
			></textarea>
		</>
	);
}
