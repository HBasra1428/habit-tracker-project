"use client";

import { useState } from "react";

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
            <div className="bg-white text-black p-6 rounded-2xl shadow-md border border-blue-300 w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Goal Tracker</h2>
                    <button
                        onClick={() => {
                            const newGoal = {
                                id: Date.now(),
                                title: "New Goal",
                                targetDays: 30,
                                progressDays: 0,
                            };
                            setGoals((prev) => [...prev, newGoal]);
                        }}
                        className="px-3 py-1 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
                    >
                        + New Goal
                    </button>
                </div>

                {/* Scrollable Goals List */}
                <div className="max-h-60 overflow-y-auto space-y-4 pr-1">
                    {goals.map((goal) => {
                        const percentage = Math.min(
                            Math.round((goal.progressDays / goal.targetDays) * 100),
                            100
                        );
                        const isComplete = percentage === 100;

                        const handleDelete = (id) => {
                            setGoals((prev) => prev.filter((goal) => goal.id !== id));
                        };

                        const handleEdit = (id) => {
                            const newTitle = prompt("Edit goal title:");
                            const newTarget = prompt("Edit target days:");
                            const newProgress = prompt("Edit progress days:");
                            setGoals((prev) =>
                                prev.map((g) =>
                                    g.id === id
                                        ? {
                                            ...g,
                                            title: newTitle || g.title,
                                            targetDays: Number(newTarget) || g.targetDays,
                                            progressDays: Number(newProgress) || g.progressDays,
                                        }
                                        : g
                                )
                            );
                        };

                        return (
                            <div key={goal.id} className="space-y-1 border-b pb-3 m-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-base font-medium">{goal.title}</h3>
                                    <span
                                        className={`text-sm px-2 py-0.5 rounded-full ${
                                            isComplete
                                                ? "bg-green-100 text-green-600"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                            {isComplete ? "Completed" : "In Progress"}
                        </span>
                                </div>
                                <div className="text-sm text-gray-600 mb-1">
                                    Target: {goal.targetDays} days • Progress: {goal.progressDays} days
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ease-out ${
                                            isComplete ? "bg-green-500" : "bg-yellow-500"
                                        }`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                                <div className="text-xs text-right text-gray-500">{percentage}%</div>
                                <div className="flex gap-3 text-sm mt-1">
                                    <button
                                        onClick={() => handleEdit(goal.id)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(goal.id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


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
