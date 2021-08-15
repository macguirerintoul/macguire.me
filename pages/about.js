import Head from 'next/head' 
import Layout from '../components/layout'
import Resume from "../components/resume"
import {getResume} from "../lib/resume"
import Image from 'next/image'
import me from '../public/me.jpg'
 
export async function getStaticProps() { 
	const resume = getResume() 
  return {
    props: { 
			resume
    }
  }
}

export default function About({resume}){
	return (
		<Layout>
			<Head>
        <title>About ✦ Macguire Rintoul</title>
      </Head>
			<h1>About</h1>
			<hr />
			<p className="overview__summary">
				I&apos;m Macguire — an experience designer, software developer, music producer,
				and DJ. I currently work as a User Experience Designer at Visier. In
				December 2020, I graduated with distinction with a Bachelor of Science in
				Interactive Arts & Technology from SFU. 🎉
			</p> 
			<hr />
			<Resume resume={resume} />
		</Layout>
	)
}
  
