import Head from "next/head";
import Layout from "../components/layout";
import MagicLink from "../components/magiclink";

export default function Visier() {
	return (
		<Layout>
      <h1>Visier</h1>
      <MagicLink url="/visier/relationship">relationship</MagicLink>
    </Layout>
  )
}