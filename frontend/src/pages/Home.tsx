import Hero from "../components/Hero"
import LastestCollection from "../components/LastestCollection"
import BestSeller from "../components/BestSeller"
import OurPolicy from "../components/OurPolicy"
import NewsletterBox from "../components/NewsletterBox"

export default function Home() {
  return (
    <div>
      <Hero />
      <LastestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}
