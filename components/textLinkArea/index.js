import styles from "../../styles/Home.module.css";

export default function TextLinkArea({ onChange, value }) {
	return (
		<>
			<textarea
				rows="10"
				cols="50"
				defaultValue=""
				className={styles.textLink}
				onChange={onChange}
				value={value}
			></textarea>
		</>
	);
}
