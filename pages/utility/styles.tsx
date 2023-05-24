export default function Styles() {
	return (
		<>
			<h1>Styles</h1>
			<hr />
			<h2>a</h2>
			<a href="/about">Lorem Ipsum</a>
			<h2>address</h2>
			<address>
				<a href="mailto:jim@rock.com">jim@rock.com</a>
			</address>
			<h2>button</h2>
			<button>Add to favorites</button>
			<h2>details</h2>
			<details>
				<summary>Details</summary>
				Something small enough to escape casual notice.
			</details>
			<h2>dialog</h2>
			<dialog open>
				<p>Greetings, one and all!</p>
				<form method="dialog">
					<button>OK</button>
				</form>
			</dialog>
			<h2>dl</h2>

			<dl>
				<dt>Beast of Bodmin</dt>
				<dd>A large feline inhabiting Bodmin Moor.</dd>

				<dt>Morgawr</dt>
				<dd>A sea serpent.</dd>

				<dt>Owlman</dt>
				<dd>A giant owl-like creature.</dd>
			</dl>
			<h2>em</h2>
			<p>
				In HTML 5, what was previously called <em>block-level</em> content is
				now called <em>flow</em> content.
			</p>
			<h2>fieldset</h2>
			<h2>figure</h2>
			<figure>
				<img
					src="https://images.unsplash.com/photo-1433770082169-c9bfaf2c323f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
					alt="Elephant at sunset"
				/>
				<figcaption>An elephant at sunset</figcaption>
			</figure>
			<h2>form</h2>
			<form action="" method="get">
				<div>
					<label htmlFor="name">Enter your name: </label>
					<input type="text" name="name" id="name" required />
				</div>
				<div>
					<label htmlFor="email">Enter your email: </label>
					<input type="email" name="email" id="email" required />
				</div>
				<div>
					<input type="submit" value="Subscribe!" />
				</div>
			</form>
			<h2>hr</h2>
			<hr />
			<p>
				<a href="/about">Lorem Ipsum</a> is simply dummy text <kbd>of</kbd> the
				printing and typesetting <code>industry</code>. Lorem Ipsum has been the
				industry's standard dummy text ever since the 1500s, when an unknown
				printer took a galley of type and scrambled it to make a type specimen
				book. It has survived not only five centuries, but also the leap into
				electronic typesetting, remaining essentially unchanged. It was
				popularised in the 1960s with the release of Letraset sheets containing
				Lorem Ipsum passages, and more recently with desktop publishing software
				like Aldus PageMaker including versions of Lorem Ipsum.
			</p>

			<h2>
				This here is an <code>h2</code>
			</h2>
			<p>
				Ashok's joke made me <abbr title="Laugh Out Loud">LOL</abbr> big time.
			</p>
			<figure>
				<blockquote>
					<p>
						This is a long block quote. Lorem Ipsum has been the industry's
						standard dummy text ever since the 1500s, when an unknown printer
						took a galley of type and scrambled it to make a type specimen book.
						It has survived not only five centuries, but also the leap into
						electronic typesetting, remaining essentially unchanged.
					</p>
				</blockquote>
				<figcaption>
					—Quote Speaker, <cite>Work the Quote was In</cite>
				</figcaption>
			</figure>
			<h3>
				This here is an <code>h3</code>
			</h3>
			<p>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy text ever
				since the 1500s, when an unknown printer took a galley of type and
				scrambled it to make a type specimen book. It has survived not only five
				centuries, but also the leap into electronic typesetting, remaining
				essentially unchanged. It was popularised in the 1960s with the release
				of Letraset sheets containing Lorem Ipsum passages, and more recently
				with desktop publishing software like Aldus PageMaker including versions
				of Lorem Ipsum.
			</p>
			<h4>
				This here is an <code>h4</code>
			</h4>
			<p>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy text ever
				since the 1500s, when an unknown printer took a galley of type and
				scrambled it to make a type specimen book. It has survived not only five
				centuries, but also the leap into electronic typesetting, remaining
				essentially unchanged. It was popularised in the 1960s with the release
				of Letraset sheets containing Lorem Ipsum passages, and more recently
				with desktop publishing software like Aldus PageMaker including versions
				of Lorem Ipsum.
			</p>
			<h5>
				This here is an <code>h5</code>
			</h5>
			<p>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy text ever
				since the 1500s, when an unknown printer took a galley of type and
				scrambled it to make a type specimen book. It has survived not only five
				centuries, but also the leap into electronic typesetting, remaining
				essentially unchanged. It was popularised in the 1960s with the release
				of Letraset sheets containing Lorem Ipsum passages, and more recently
				with desktop publishing software like Aldus PageMaker including versions
				of Lorem Ipsum.
			</p>
			<h6>
				This here is an <code>h6</code>
			</h6>
			<p>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy text ever
				since the 1500s, when an unknown printer took a galley of type and
				scrambled it to make a type specimen book. It has survived not only five
				centuries, but also the leap into electronic typesetting, remaining
				essentially unchanged. It was popularised in the 1960s with the release
				of Letraset sheets containing Lorem Ipsum passages, and more recently
				with desktop publishing software like Aldus PageMaker including versions
				of Lorem Ipsum.
			</p>
		</>
	);
}
