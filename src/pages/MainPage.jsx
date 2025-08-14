import { Hero } from '../pages/Hero'
import Branding from '../components/Branding'
import {ProductSection} from '../components/MenWatchSection'

export default function MainPage() {
    return (
        <>
            <Hero />
            <Branding />
            <ProductSection
                title="MEN'S WATCH"
                description="Upto 50% Off On Groceries | QUALITY | FREASH PRODUCT"
                category="Groceries"
            />
            <ProductSection
                title="MEN'S WATCH"
                description="Upto 50% Off On Fragrances | BEST QUALITY | GOOD"
                category="beauty"
            />
        </>
    )
}
