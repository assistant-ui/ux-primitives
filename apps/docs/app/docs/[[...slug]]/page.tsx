import type { Metadata } from "next";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug ?? []);

  if (!page) notFound();

  const { body: Body, toc, ...rest } = page.data as any;

  return (
    <DocsPage toc={toc}>
      <DocsBody>
        <h1>{rest.title}</h1>
        {rest.description && (
          <p className="text-fd-muted-foreground -mt-2 text-lg">
            {rest.description}
          </p>
        )}
        <Body components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug ?? []);

  if (!page) return { title: "Not Found" };

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
