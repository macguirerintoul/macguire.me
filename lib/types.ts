import { MDXRemoteSerializeResult } from "next-mdx-remote"

export type ProjectType = {
  id: string;
  meta: {
    title: string;
    for: string;
    description: string;
    imagePath: string;
    year: number;
    order: number;
    url: string;
    tags: string[];
    roles: string[];
    tools: string[]
    summary: string;
    parentProject?: boolean;
  };
  mdxProject: MDXRemoteSerializeResult;
  mdxProcess: MDXRemoteSerializeResult;
}