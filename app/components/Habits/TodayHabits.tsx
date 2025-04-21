"use client";

import { useState } from "react";

const TodaysHabits = () => {
    // Example mock data - replace with props or API data later
    const [habits, setHabits] = useState([
        { id: 1, name: "Morning Run", completed: true },
        { id: 2, name: "Meditation", completed: false },
        { id: 3, name: "Drink 2L Water", completed: false },
    ]);

    const toggleHabit = (id) => {
        setHabits((prev) =>
            prev.map((habit) =>
                habit.id === id ? { ...habit, completed: !habit.completed } : habit
            )
        );
    };

    return (
        <div className="bg-white text-blue-800 p-6 rounded-2xl shadow-md max-w-md w-full border border-gray-200">
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
    );
};

export default TodaysHabits;
