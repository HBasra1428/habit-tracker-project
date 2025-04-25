'use client';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import api from "@/app/api/api";
import Learn from "@/app/components/AboutUs/Learn";
import HabitStreaks from "@/app/components/HabitStreaks/HabitStreaks";
import {Plus} from 'lucide-react'; // install if not present
import { Trash2 } from 'lucide-react';



const Splash: React.FC = () => {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [newHabitName, setNewHabitName] = useState("");
    const [newHabitDesc, setNewHabitDesc] = useState("");

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
                const [habitsRes, logsRes] = await Promise.all([
                    api.get('/habits/?status=active'),
                    api.get('/habit-logs/today/')
                ]);
                const doneTodayIds: number[] = logsRes.data;

                const fetchedHabits = habitsRes.data.map((habit: any) => ({
                    id: habit.habit_id,
                    name: habit.name,
                    completed: doneTodayIds.includes(habit.habit_id),
                }));

                setHabits(fetchedHabits);
            } catch (err) {
                console.error("Failed to fetch habits:", err);
            }
        };

        fetchHabits();
    }, []);

    const deleteHabit = async (id: number) => {
        try {
            await api.delete(`/habits/${id}/`);
            setHabits((prev) => prev.filter((habit) => habit.id !== id));
        } catch (err) {
            console.error("Error deleting habit:", err);
        }
    };


    const handleAddHabit = async () => {
        if (!newHabitName.trim()) return;
        try {
            const res = await api.post("/habits/", {
                name: newHabitName,
                description: newHabitDesc,
                status: "active", // you can tweak this
            });

            setHabits(prev => [...prev, {
                id: res.data.habit_id,  // ensure you're getting back the habit_id
                name: res.data.name,
                completed: false,
            }]);

            setNewHabitName("");
            setNewHabitDesc("");
            setShowForm(false);
        } catch (err) {
            console.error("Error adding habit:", err);
        }
    };

    const toggleHabit = async (id: number) => {
        const habit = habits.find(h => h.id === id);
        if (!habit || habit.completed) return;

        try {
            await api.post(`/habits/${id}/mark_done/`, {
                notes: "Marked as done from checklist",
            });

            setHabits(prev =>
                prev.map(h =>
                    h.id === id ? {...h, completed: true} : h
                )
            );

            //  Trigger streak refresh
            if (typeof window !== "undefined") {
                const event = new CustomEvent("refresh-streaks");
                window.dispatchEvent(event);
            }
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
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Today's Habit Checklist</h2>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="text-blue-500 hover:text-blue-700"
                            aria-label="Add Habit"
                        >
                            <Plus/>
                        </button>
                    </div>

                    {showForm && (
                        <div className="mb-4 space-y-2">
                            <input
                                type="text"
                                value={newHabitName}
                                onChange={(e) => setNewHabitName(e.target.value)}
                                placeholder="Habit name"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                value={newHabitDesc}
                                onChange={(e) => setNewHabitDesc(e.target.value)}
                                placeholder="Description (optional)"
                                className="w-full p-2 border rounded"
                            />
                            <button
                                onClick={handleAddHabit}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Add
                            </button>
                        </div>
                    )}
                    <ul className="space-y-3">
                        {habits.map((habit) => (
                            <li key={habit.id} className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
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
                                </div>
                                <button onClick={() => deleteHabit(habit.id)} className="text-red-500 hover:text-red-700">
                                    <Trash2 size={18} />
                                </button>
                            </li>

                        ))}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Splash;
