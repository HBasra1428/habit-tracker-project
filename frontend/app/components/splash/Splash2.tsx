"use client";

import { useState } from "react";
import Achievements from "@/app/components/Achievements/Achievements";
import Reminders from "@/app/components/Reminders/Reminders";

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
            <Reminders/>
        </div>
    );
};

export default GoalTracker;
