export default function ResumeButtons() {
	return (
		<>
			<button
				className="resume-button"
				onClick={() => window.open("/api/resume")}
			>
				Download resumé
			</button>
			<button
				className="resume-button"
				onClick={() =>
					window.open(
						"https://raw.githubusercontent.com/macguirerintoul/macguire.me/main/content/resume.yaml"
					)
				}
			>
				Get it in YAML!
			</button>
		</>
	);
}
