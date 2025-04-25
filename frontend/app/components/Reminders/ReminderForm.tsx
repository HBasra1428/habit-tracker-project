"use client";

import { useEffect, useState } from "react";
import api from "@/app/api/api";

const ReminderForm = ({ onSuccess }: { onSuccess?: () => void }) => {
    const [habits, setHabits] = useState([]);
    const [habitId, setHabitId] = useState("");
    const [time, setTime] = useState("");
    const [frequency, setFrequency] = useState("daily");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const res = await api.get("/habits/?status=active");
                setHabits(res.data || []);
            } catch (err) {
                console.error("Failed to fetch habits:", err);
                setError("Could not load habits.");
            }
        };

        fetchHabits();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await api.post("/reminders/", {
                time,
                frequency,
                description,
                habit: habitId,
                is_active: true,
            });

            if (onSuccess) onSuccess();
            setTime("");
            setFrequency("daily");
            setDescription("");
            setHabitId("");
        } catch (err) {
            console.error("Error creating reminder:", err);
            setError("Failed to create reminder.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white border border-blue-300 rounded-xl shadow-md p-6 space-y-4 w-full max-w-md"
        >
            <h2 className="text-lg font-semibold">Add Reminder</h2>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* Habit Dropdown */}
            <div className="space-y-2">
                <label className="block font-medium">Select Habit</label>
                <select
                    value={habitId}
                    onChange={(e) => setHabitId(e.target.value)}
                    className="w-full border rounded-md p-2"
                    required
                >
                    <option value="">Choose a habit</option>
                    {habits.map((habit: any) => (
                        <option key={habit.habit_id} value={habit.habit_id}>
                            {habit.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Time input */}
            <div className="space-y-2">
                <label className="block font-medium">Time</label>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full border rounded-md p-2"
                    required
                />
            </div>

            {/* Frequency dropdown */}
            <div className="space-y-2">
                <label className="block font-medium">Frequency</label>
                <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full border rounded-md p-2"
                >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="custom">Custom</option>
                </select>
            </div>

            {/* Description input */}
            <div className="space-y-2">
                <label className="block font-medium">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded-md p-2"
                    placeholder="Drink water, Go for a walk..."
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800"
            >
                {loading ? "Saving..." : "Create Reminder"}
            </button>
        </form>
    );
};

export default ReminderForm;
