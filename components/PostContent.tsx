"use client";
import React from "react";
import { getMDXExport } from "mdx-bundler/client";

export function PostContent({ code }: { code: string }) {
	const mdxExport = getMDXExport(code);
	const Component = React.useMemo(() => mdxExport.default, [code]);
	return <Component />;
}
