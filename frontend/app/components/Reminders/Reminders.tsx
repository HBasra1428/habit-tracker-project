"use client";

import { useState } from "react";

const Reminders = () => {
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
        // Replace with modal or inline editor later
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
        <div className="bg-white text-black p-6 rounded-2xl shadow-md max-w-xl w-full border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Reminders</h2>
                <button
                    onClick={handleNewReminder}
                    className="px-3 py-1 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
                >
                    + New Reminder
                </button>
            </div>
            <ul className="space-y-4">
                {reminders.map((reminder) => (
                    <li
                        key={reminder.id}
                        className="border-l-4 border-black pl-4 py-2 bg-gray-50 rounded-md shadow-sm"
                    >
                        <div className="flex justify-between items-start">
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reminders;
