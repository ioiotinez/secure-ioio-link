export default function TextLinkArea({
	onChange,
	value,
	disabled,
	placeholder,
}) {
	return (
		<>
			<div>
				<textarea
					rows="10"
					cols="40"
					className="textLink"
					onChange={onChange}
					value={value}
					disabled={disabled}
					placeholder={placeholder}
				></textarea>
			</div>
		</>
	);
}
