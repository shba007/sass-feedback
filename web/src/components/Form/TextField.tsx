import './TextField.scss';

function TextField({ inline = true, name, placeholder = '' }: { inline?: boolean; name: string; placeholder?: string }) {
	return inline ? (
		<input name={name} className="text-field" placeholder={placeholder} />
	) : (
		<textarea name={name} className="text-field" placeholder={placeholder} />
	);
}

export default TextField;
