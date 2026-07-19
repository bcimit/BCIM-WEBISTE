import { resolveImage } from '@/lib/utils'

interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  image?: string
  overlay?: boolean
  dark?: boolean
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  overlay = true,
  dark = false,
}: PageHeroProps) {
  if (dark && image) {
    return (
      <section className="relative pt-[68px] h-[380px] md:h-[440px] flex items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolveImage(image, 1800)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {overlay && <div className="absolute inset-0 bg-dark/75" />}
        <div className="relative z-10 container-xl pb-14 pt-8 w-full">
          {eyebrow && <p className="eyebrow text-primary mb-3">{eyebrow}</p>}
          <h1 className="text-[1.875rem] sm:text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-3xl">{title}</h1>
          {description && (
            <p className="mt-4 text-white/70 text-[1.0625rem] max-w-2xl leading-relaxed">{description}</p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="pt-[68px] bg-bg border-b border-navy-100">
      <div className="container-xl py-14 md:py-20">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="text-[1.875rem] sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight max-w-3xl">{title}</h1>
        {description && (
          <p className="mt-4 text-navy-500 text-[1.0625rem] max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  )
}
