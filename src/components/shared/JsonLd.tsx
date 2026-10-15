/** Renders one or more JSON-LD blocks. Content must mirror what is visible on the page. */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data]
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  )
}
