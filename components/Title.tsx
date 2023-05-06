export default function Title({ title }: { title: string }) {
	const fullTitle = title + " | example.com";
	return <title>{fullTitle}</title>;
}
