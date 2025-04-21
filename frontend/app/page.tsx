import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Splash from "./components/splash/Splash";
import GoalTracker from "@/app/components/Goals/GoalTracker";
export default function Home() {
    return (
        <div className="bg-white">
        <Header/><br />
        <Splash/><br/>
        <div className="m-4">
            <GoalTracker/>
        </div>
        <Footer/>
        </div>
    );
}
