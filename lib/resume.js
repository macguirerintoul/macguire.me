import fs from 'fs'
import yaml from 'js-yaml'

export function getResume() {
	const file = fs.readFileSync('public/resume.yaml', 'utf8') 
	return yaml.load(file)
}