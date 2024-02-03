import './CTAButton.scss';

function CTAButton({ primary, icon, label }: { primary?: boolean; icon?: string; label: string }) {
	return <button className={`cta-button ${primary && 'btn-secondary'}`}>{label}</button>;
}

export default CTAButton;
