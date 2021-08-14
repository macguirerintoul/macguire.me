export default function MagicImage(props) {
	return (
		<cld-image
		cloud-name="macguire"
		secure="true"
		class="magic-image"
		loading="lazy"
		dpr="auto"
		width="auto"
		crop="scale"
		:alt="alt"
		:public-id="path"
	>
		<cld-transformation quality="auto" fetch-format="auto" />
	</cld-image>
	)
} 
 