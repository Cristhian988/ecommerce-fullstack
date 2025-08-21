import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

export default function Contact() {
    return (
        <>
        <div className="text-2xl text-center pt-10 border-t">
            <Title text1={"CONTACT"} text2={"US"} />
        </div>
        <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
            <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]" />
            <div className="flex flex-col justify-center items-center gap-6">
                <p className="text-xl font-semibold text-gray-600">Our Store</p>
                <p className="text-gray-500">Suite 350, Washington, D.C.</p>
                <p className="text-gray-500">Tel: (415) 555-0199 <br />Email: admin@forever.com</p>
                <p className="text-xl font-semibold text-gray-600">Careers at Forever</p>
                <p className="text-gray-500">Learn more aboutour teams and job openings</p>
                <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
            </div>
        </div>
        <NewsletterBox />
        </>
    )
}