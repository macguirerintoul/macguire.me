import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {remark} from 'remark'
import html from 'remark-html'

const servicesDirectory = path.join(process.cwd(), 'services')

export function getAllServiceIds() {
  const fileNames = fs.readdirSync(servicesDirectory)
 
  return fileNames.map(fileName => {
    return {
      params: {
        service: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getServiceData(id) {
  const fullPath = path.join(servicesDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

	// Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
		contentHtml,
    ...matterResult.data
  }
}
