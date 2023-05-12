import { Tendance } from "../subComponents/explorerElements";
import { Params } from "../widgets/myIcons";
import "./explorer.css";

const Explorer = () => {
	return (
		<div className="explorer-container">
			<div className="explorer-header">
				<h3>Explore</h3>
				<Params />
			</div>
			<div className="tendances-container">
				<Tendance />
			</div>
		</div>
	);
};

export default Explorer;
