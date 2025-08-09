import { BoxReveal } from './BoxReveal'

export default function Hero() {
  return (
    <div className="container max-w-2xl mx-auto px-4">
      <BoxReveal direction="right">
        <h2 className="typography-heading-1 mb-3">Phineas Kibbey</h2>
      </BoxReveal>
      <BoxReveal delay={120} className="block" direction="right">
        <p className="typography-caption mb-4">
          My story is one of continuous adaptation and learning, from
          co-founding one of the UK's first social networks to architecting
          solutions for modern smart homes.
        </p>
      </BoxReveal>
    </div>
  )
}