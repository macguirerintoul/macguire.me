import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'

import html from 'remark-html'
const workDirectory = path.join(process.cwd(), 'work')

export function getWork() {
  // Get file names under /work
  const fileNames = fs.readdirSync(workDirectory)
  const allWorkData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(workDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      slug,
			path: slug,
      ...matterResult.data
    }
  })

  return allWorkData
}

export function getAllWorkIds() {
  const fileNames = fs.readdirSync(workDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        project: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getProjectData(id) {
  const fullPath = path.join(workDirectory, `${id}.md`)
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
