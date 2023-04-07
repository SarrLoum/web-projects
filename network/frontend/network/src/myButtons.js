import "./myButtons.css";

export const MetricButtons = ({ posType }) => {
	return <div className='metric-btn'>Comment Repost Like Stats Shares</div>;
};

export const MediaButtons = () => {
	return (
		<div className='media-inputs'>
			<label for='media-input'>
				<img
					className='media-icon'
					src='{userProfile}'
					alt='Select a file'
				></img>
				<input
					type='file'
					name='media'
					id='media-input'
					accept='image/*,video/*,image/gif'
					multiple
				></input>
			</label>
			<label>
				<img
					className='media-icon'
					src='{userProfile}'
					alt='Select a file'
				></img>
				<input
					type='file'
					name='media'
					id='media-input'
					accept='image/*,video/*,image/gif'
					multiple
				></input>
			</label>
			<button>
				<img className='media-icon' src='' alt='' />
			</button>
			<button>
				<img className='media-icon' src='' alt='' />
			</button>
			<button>
				<img className='media-icon' src='' alt='' />
			</button>
			<button>
				<img className='media-icon' src='' alt='' />
			</button>
		</div>
	);
};
