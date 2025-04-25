"use client";

import React, { useEffect, useState } from "react";
import api from "@/app/api/api";

interface Reminder {
    reminder_id: number;
    habit: string;
    time: string;
    frequency: string;
}

interface Habit {
    habit_id: number;
    name: string;
}

const Reminders = () => {
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [habit, setHabit] = useState("");
    const [time, setTime] = useState("");
    const [frequency, setFrequency] = useState("daily");
    const [habits, setHabits] = useState<Habit[]>([]);

    // 🔄 Fetch user habits
    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const res = await api.get('/habits/?status=active');
                setHabits(res.data);
            } catch (error) {
                console.error("Failed to load habits:", error);
            }
        };
        fetchHabits();
    }, []);


    const fetchReminders = async () => {
        try {
            const res = await api.get("/reminders/");
            console.log("Fetched reminders:", res.data); // 👈 add this
            setReminders(res.data);
        } catch (err) {
            console.error("Error fetching reminders:", err);
        }
    };

    useEffect(() => {
        fetchReminders();
    }, []);

    const handleNewReminder = async () => {
        try {
            await api.post("/reminders/", {
                habit: parseInt(habit),
                time,
                frequency,
                is_active: true,
            });
            setHabit("");
            setTime("");
            setFrequency("daily");
            setShowForm(false);
            fetchReminders(); // Refresh the list
        } catch (err) {
            console.error("Error creating reminder:", err);
        }
    };

    //
    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/reminders/${id}/`);
            console.log("Deleting reminder with ID:", id);

            setReminders((prev) => prev.filter((r) => r.reminder_id !== id));
        } catch (err) {

            console.log("Deleting reminder with ID:", id);
        }
    };

    return (
        <div className="bg-white text-black p-6 rounded-2xl shadow-md max-w-xl w-full border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Reminders</h2>
                <button
                    onClick={() => setShowForm((prev) => !prev)}
                    className="px-3 py-1 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
                >
                    + New Reminder
                </button>
            </div>

            {showForm && (
                <div className="mb-4 space-y-2">
                    {/* Dropdown for Habit */}
                    <select
                        value={habit}
                        onChange={(e) => setHabit(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select a habit</option>
                        {habits.map((h) => (
                            <option key={h.habit_id} value={h.habit_id}>
                                {h.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="custom">Custom</option>
                    </select>

                    <button
                        onClick={handleNewReminder}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                        Add Reminder
                    </button>
                </div>
            )}

            <ul className="space-y-4">
                {reminders.map((reminder) => (
                    <li key={reminder.reminder_id} className="...">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold">{reminder.habit}</h3>
                                <p className="text-sm text-gray-600">
                                    {reminder.time} • {reminder.frequency}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(reminder.reminder_id)}
                                className="text-sm text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default Reminders;
