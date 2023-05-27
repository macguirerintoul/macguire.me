const TOC = ({ headings }) => {
	console.log(headings);
	return (
		<aside className="toc">
			<p>Contents</p>
			<ul className="util-unstyled-list">
				{headings.map((item, index) => (
					<li key={index}>
						<a href={`#${item.id}`}>{item.value}</a>
					</li>
				))}
			</ul>
		</aside>
	);
};
export { TOC };
