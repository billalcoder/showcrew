import { Hero } from '../pages/Hero'
import Branding from '../components/Branding'
import { ProductSection } from '../components/MenWatchSection'
import { useEffect } from 'react'

export default function MainPage() {

    async function guest() {
        try {
            const userId = await fetch(`${url}/guest/get`, { credentials: "include" })
            const userdata = await userId.json()
            if (!userdata.sid) {
                const res = await fetch(`${url}/guest`, { credentials: "include" })
                const s = await res.json()
            } else {
                console.log("user is logged in");
            }
        } catch (error) {
            console.log("Somthing went wrong");
        }
    }

    useEffect(() => {
        guest()
    }, [])
      const url = "https://showcrew-backend.onrender.com" //|| "http://localhost:3000" "https://showcrew-backend.onrender.com"

    return (
        <>
            <Hero />
            <Branding />
            {/* <ProductSection
                title="3113"
                description="Upto 50% Off On Groceries | QUALITY | FREASH PRODUCT"
                category="1313"
            />
            <ProductSection
                title="MEN'S WATCH"
                description="Upto 50% Off On Fragrances | BEST QUALITY | GOOD"
                category="2121"
            /> */}
        </>
    )
}
