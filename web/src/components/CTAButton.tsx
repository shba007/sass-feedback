import { Link } from 'react-router-dom';
import './CTAButton.scss';

function CTAButton({
	type = 'primary',
	icon,
	label,
	to,
	onClick: onClickHandler,
}: {
	type?: 'primary' | 'secondary' | 'neutral' | 'danger';
	icon?: string;
	label: string;
	to?: string;
	onClick?: Function;
}) {
	return to === undefined ? (
		<button className={`cta-button ${type}`} onClick={(e) => onClickHandler && onClickHandler(e)}>
			{label}
		</button>
	) : (
		<Link to={to} className={`cta-button ${type}`} onClick={(e) => onClickHandler && onClickHandler(e)}>
			{label}
		</Link>
	);
}

export default CTAButton;
