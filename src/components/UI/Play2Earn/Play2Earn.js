import "bootstrap/dist/css/bootstrap.min.css";
import "./Play2Earn.scss";

export const Play2Earn = () => {
	const triggerWalletConnect = () => {
		if (window.triggerWalletConnect) {
			window.triggerWalletConnect();
		}
	};

	return (
		<div className="playToEarn">
			<div className="u-container">
				<div className="u-ribbon">Play2Earn</div>
				<div className="u-content">
					<div className="u-logo"></div>

					<div className="u-buttongroup">
						<button className="u-button" onClick={ () => { alert('Connect Wallet please!') } }>Create Game</button>
						<button className="u-button" onClick={ () => { alert('Connect Wallet please!') } }>Join Game</button>
					</div>
				</div>
				<div className="u-ribbon1" onClick={triggerWalletConnect}>
					Connect Wallet
				</div>
			</div>
		</div>
	);
}

export default Play2Earn;