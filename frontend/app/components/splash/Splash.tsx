'use client';
addimport React, {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useState} from "react";
import api from "@/app/api/api";
import Learn from "@/app/components/AboutUs/Learn";

const Splash: React.FC = () => {
    const router = useRouter();
    const [streak, setStreak] = useState<number | null>(null);
    useEffect(() => {
        const fetchStreak = async () => {
            try {
                const res = await api.get("streak/"); // adjust to your real endpoint
                setStreak(res.data.current_streak || 0); // or however your backend responds
            } catch (err) {
                console.error("Failed to fetch streak", err);
            }
        };

        fetchStreak();
    }, []);


    const handleSplashClick = () => {
        router.push('/Learn');
    };
    const [habits, setHabits] = useState([
        {id: 1, name: "Morning Run", completed: true},
        {id: 2, name: "Meditation", completed: false},
        {id: 3, name: "Drink 2L Water", completed: false},
    ]);

    // @ts-ignore
    const toggleHabit = (id) => {
        setHabits((prev) =>
            prev.map((habit) =>
                habit.id === id ? {...habit, completed: !habit.completed} : habit
            )
        );
    };

    return (
        // splash
        <div className="mt-15 ">
            {/* text and checklist */}
            <div className="flex flex-1 flex-col md:flex-row m-3">
                {/* heading and text */}
                <div className="flex flex-col m-3 bg-gradient-to-br from-[#00e2a2] to-[#1f8bfe] p-10 rounded-2xl shadow-xl">
                    {/* heading */}
                    <h1 className="text-6xl text-white font-bold text-left">
                    Welcome to the Habit Tracker!
                </h1>
                    {/* text */}
                    <nav className="flex flex-col md:flex-row items-center gap-6 mt-6 text-white">
                        <p className="text-2xl md:text-4xl text-center md:text-left">
                            Elevate your lifestyle to the next level.
                            <br/>
                        </p>
                    </nav>
                </div>
                {/* streak div */}
                <div className="bg-white text-blue-800 p-6 w-[20%] rounded-2xl shadow-md border border-[#1f8bfe] m-3 ">
                    <h2 className="text-lg font-semibold mb-2"> Daily Streak</h2>
                    <p className="text-3xl font-bold text-blue-800">
                        {streak !== null ? `${streak} Days` : "Loading..."}
                    </p>
                    <p className="text-sm text-gray-600">Keep it going!</p>
                </div>
                {/* checklist div*/}
                <div
                    className="bg-white text-blue-800 p-6 rounded-2xl shadow-md max-w-md w-full border border-[#1f8bfe] m-3 ">
                    <h2 className="text-xl font-bold mb-4">Today's Habit Checklist</h2>
                    <ul className="space-y-3">
                        {habits.map((habit) => (
                            <li key={habit.id} className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={habit.completed}
                                    onChange={() => toggleHabit(habit.id)}
                                    className="w-5 h-5 accent-green-400 border border-blue-400"
                                />
                                <span
                                    className={`text-base ${
                                        habit.completed ? "line-through text-gray-500" : ""
                                    }`}
                                >
              {habit.name}
            </span>
                            </li>
                        ))}
                    </ul>
                </div>
        </div>
    </div>
    );
};
export default Splash;
