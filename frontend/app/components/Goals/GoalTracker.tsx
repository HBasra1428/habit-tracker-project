"use client";

import { useState } from "react";

const GoalTracker = () => {
    const [goals, setGoals] = useState([
        {
            id: 1,
            title: "Read 10 pages daily",
            targetDays: 30,
            progressDays: 12,
        },
        {
            id: 2,
            title: "Workout 5x per week",
            targetDays: 20,
            progressDays: 20,
        },
    ]);

    return (
        <div className="bg-white text-black p-6 rounded-2xl shadow-md max-w-md w-full border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Goal Tracker</h2>
            <ul className="space-y-4">
                {goals.map((goal) => {
                    const percentage = Math.min(
                        Math.round((goal.progressDays / goal.targetDays) * 100),
                        100
                    );
                    const isComplete = percentage === 100;

                    return (
                        <li key={goal.id} className="space-y-1">
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
                            <div className="text-xs text-right text-gray-500">
                                {percentage}%
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default GoalTracker;
