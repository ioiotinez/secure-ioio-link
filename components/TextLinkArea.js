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
					className="bg-yellow-200/70 p-4 max-w-full"
					onChange={onChange}
					value={value}
					disabled={disabled}
					placeholder={placeholder}
				></textarea>
			</div>
		</>
	);
}
