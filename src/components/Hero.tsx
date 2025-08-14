import { BoxReveal } from './BoxReveal'

export const userData = {
  name: "Phineas Kibbey",
  bio: "My story is one of continuous adaptation and learning, from co-founding one of the UK's first social networks to architecting solutions for modern smart homes.",
  site: 'pkibbey.github.io',
  location: 'Paris (Relocating from Seattle, WA)'
}

export default function Hero() {
  return (
    <div className="container max-w-2xl mx-auto px-4">
      <BoxReveal direction="right">
        <h2 className="typography-heading-1 mb-3 pr-4">{userData.name}</h2>
      </BoxReveal>
      <BoxReveal delay={120} className="block" direction="right">
        <p className="typography-caption mb-4">
          {userData.bio}
        </p>
      </BoxReveal>
    </div>
  )
}