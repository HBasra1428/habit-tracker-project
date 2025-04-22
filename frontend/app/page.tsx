import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Splash from "./components/splash/Splash";
import Splash2 from "@/app/components/splash/Splash2";
import Reminders from "@/app/components/Reminders/Reminders";
export default function Home() {
    return (
        <div className="bg-white">
        <Header/><br />
        <Splash/><br/>
        <Splash2/><br/>
        <Footer/>
        </div>
    );
}
