import './TextField.scss';

function TextField({ inline = true, name, placeholder = '', value }: { inline?: boolean; name: string; placeholder?: string; value?: string }) {
	return inline ? (
		<input name={name} className="text-field" placeholder={placeholder} value={value} />
	) : (
		<textarea name={name} className="text-field" placeholder={placeholder} value={value} />
	);
}

export default TextField;
