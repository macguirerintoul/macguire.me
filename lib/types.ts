import { MDXRemoteSerializeResult } from "next-mdx-remote"

export type Project = {
  meta: {
    title: string;
    parentProject: boolean;
  };
  content: MDXRemoteSerializeResult;
  process: MDXRemoteSerializeResult;
}