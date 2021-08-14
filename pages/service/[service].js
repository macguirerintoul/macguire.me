import Layout from '../../components/layout'
import { getAllServiceIds, getServiceData } from '../../lib/services'

export async function getStaticProps({ params }) {
  const serviceData = await getServiceData(params.service)
  return {
    props: {
      serviceData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllServiceIds()
  return {
    paths,
    fallback: false
  }
}

export default function Service({ serviceData }) {
  return (
    <Layout>
      <h1>{ serviceData.title }</h1>
			<hr />
			<div className="overview__summary" dangerouslySetInnerHTML={{ __html: serviceData.contentHtml }} />
    </Layout>
  )
}
