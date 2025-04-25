"use client";

import { useState } from "react";
import Achievements from "@/app/components/Achievements/Achievements";

const GoalTracker = () => {
    const [goals, setGoals] = useState([
        {
            id: 1,
            title: "Read 10 pages daily",
            targetDays: 30,
            progressDays: 15,
        },
        {
            id: 2,
            title: "Workout 5x per week",
            targetDays: 20,
            progressDays: 20,
        },
    ]);

    const [reminders, setReminders] = useState([
        {
            id: 1,
            habit: "Drink Water",
            time: "09:00 AM",
            frequency: "Daily",
        },
        {
            id: 2,
            habit: "Workout",
            time: "06:00 PM",
            frequency: "Mon, Wed, Fri",
        },
    ]);

    const handleDelete = (id) => {
        setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
    };

    const handleEdit = (id) => {
        alert(`Edit reminder with ID: ${id}`);
    };

    const handleNewReminder = () => {
        const newReminder = {
            id: Date.now(),
            habit: "New Habit",
            time: "12:00 PM",
            frequency: "Once",
        };
        setReminders((prev) => [...prev, newReminder]);
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 justify-center p-9">
            {/* Goal Tracker Box */}
            <Achievements/>

            {/* Reminders Box */}
            <div className="bg-white text-black p-6 rounded-2xl shadow-md border border-blue-300 w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Reminders</h2>
                    <button
                        onClick={handleNewReminder}
                        className="px-3 py-1 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
                    >
                        + New Reminder
                    </button>
                </div>
                {/* Scrollable list with max height */}
                <div className="max-h-60 overflow-y-auto space-y-4 pr-1 h-60">
                    {reminders.map((reminder) => (
                        <div
                            key={reminder.id}
                            className="bg-gray-50 rounded-lg px-4 py-2 shadow-sm flex justify-between items-start"
                        >
                            <div>
                                <h3 className="font-semibold">{reminder.habit}</h3>
                                <p className="text-sm text-gray-600">
                                    {reminder.time} • {reminder.frequency}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(reminder.id)}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(reminder.id)}
                                    className="text-sm text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GoalTracker;
