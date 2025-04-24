'use client';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import api from "@/app/api/api";
import Learn from "@/app/components/AboutUs/Learn";
import HabitStreaks from "@/app/components/HabitStreaks/HabitStreaks";

const Splash: React.FC = () => {
    const router = useRouter();

    const handleSplashClick = () => {
        router.push('/Learn');
    };

    type Habit = {
        id: number;
        name: string;
        completed: boolean;
    };

    const [habits, setHabits] = useState<Habit[]>([]);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const res = await api.get('/habits/?status=active'); // or customize this
                const fetchedHabits = res.data.map((habit: any) => ({
                    id: habit.habit_id,
                    name: habit.name,
                    completed: false, // We'll check this in the next step
                }));
                console.log(fetchedHabits);
                setHabits(fetchedHabits);
            } catch (err) {
                console.error("Failed to fetch habits:", err);
            }
        };

        fetchHabits();
    }, []);

    const toggleHabit = async (id: number) => {
        const habit = habits.find(h => h.id === id);
        if (!habit || habit.completed) return;

        try {
            await api.post(`/habits/${id}/mark_done/`, {
                notes: "Marked as done from checklist",
            });

            setHabits((prev) =>
                prev.map((h) =>
                    h.id === id ? {...h, completed: true} : h
                )
            );
        } catch (err) {
            console.error("Error marking habit done:", err);
        }
    };

    return (
        <div className="mt-15">
            <div className="flex flex-1 flex-col md:flex-row m-3">
                {/* Welcome message */}
                <div
                    className="flex flex-col m-3 bg-gradient-to-br from-[#00e2a2] to-[#1f8bfe] p-10 rounded-2xl shadow-xl">
                    <h1 className="text-6xl text-white font-bold text-left">
                        Welcome to the Habit Tracker!
                    </h1>
                    <nav className="flex flex-col md:flex-row items-center gap-6 mt-6 text-white">
                        <p className="text-2xl md:text-4xl text-center md:text-left">
                            Elevate your lifestyle to the next level.
                            <br/>
                        </p>
                    </nav>
                </div>

                {/* streaks */}
                <div className="flex flex-col md:flex-row m-3 text-white"><HabitStreaks/>
                </div>


                {/* Today's Habit Checklist */}
                <div
                    className="bg-white text-black p-6 rounded-2xl shadow-md max-w-md w-full border border-[#1f8bfe] m-3">
                    <h2 className="text-xl font-bold mb-4">Today's Habit Checklist</h2>
                    <ul className="space-y-3">
                        {habits.map((habit) => (
                            <li key={habit.id} className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={habit.completed}
                                    onChange={() => toggleHabit(habit.id)}
                                    disabled={habit.completed}
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
