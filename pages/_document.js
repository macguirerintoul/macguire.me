import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
				
          <Main />
          <NextScript />
					<script type="text/javascript" src="theme.js"></script>

					{/* Stand-in form because Netlify can't parse JS-rendered forms 
					 		See https://www.netlify.com/blog/2018/09/07/how-to-integrate-netlify-forms-in-a-vue-app/ */}
					<form name="Contact" netlify hidden>
						<input type="text" name="name" hidden />
						<input type="email" name="email" hidden />
						<textarea name="message" hidden></textarea>
					</form>
        </body>
      </Html>
    )
  }
}

export default MyDocument
