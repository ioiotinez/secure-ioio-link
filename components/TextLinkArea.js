export default function TextLinkArea({ onChange, value, disabled }) {
	return (
		<>
			<div className="fadeIn">
				<textarea
					rows="10"
					cols="40"
					className="textLink"
					onChange={onChange}
					value={value}
					disabled={disabled}
				></textarea>
			</div>
		</>
	);
}
