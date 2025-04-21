import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Splash from "./components/splash/Splash";
import TodaysHabits from "@/app/components/Habits/TodayHabits";
export default function Home() {
    return (
        <div className="bg-white">
        <Header/><br />
        <Splash/><br/>
        <Footer/>
        </div>
    );
}
