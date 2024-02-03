import { Link } from 'react-router-dom';
import './CTAButton.scss';

function CTAButton({
	type = 'primary',
	icon,
	label,
	to,
}: {
	type?: 'primary' | 'secondary' | 'neutral' | 'danger';
	icon?: string;
	label: string;
	to?: string;
}) {
	return to === undefined ? (
		<button className={`cta-button ${type}`}>{label}</button>
	) : (
		<Link to={to} className={`cta-button ${type}`}>
			{label}
		</Link>
	);
}

export default CTAButton;
