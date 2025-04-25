'use client';
import React, { useEffect, useState } from 'react';
import api from '@/app/api/api';

interface StreakData {
    habit_name: string;
    current_streak: number;
    longest_streak: number;
}

const Streaks: React.FC = () => {
    const [streaks, setStreaks] = useState<StreakData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStreaks = async () => {
        try {
            const response = await api.get('/users/me/dashboard/');
            console.log("Dashboard data:", response.data); // for debugging
            const data = response.data.streak_data || [];
            setStreaks(Array.isArray(data) ? data : Object.values(data));
        } catch (err) {
            console.log("Error fetching streaks:", err);
            setError("Could not fetch streak data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStreaks();

        // ✅ Listen for custom refresh event
        const handleRefresh = () => {
            setLoading(true);
            fetchStreaks();
        };

        window.addEventListener('refresh-streaks', handleRefresh);
        return () => window.removeEventListener('refresh-streaks', handleRefresh);
    }, []);

    if (loading) {
        return (
            <div className="bg-white text-black p-6 rounded-2xl shadow-md max-w-md w-70 border border-[#1f8bfe]">
                <p className="text-gray-500">Loading streaks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-md border border-red-300 w-full md:w-[400px] m-3">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-white text-black p-6 rounded-2xl shadow-md max-w-md w-70 border border-[#1f8bfe]">
            <h2 className="text-xl font-bold mb-4">🔥 Your Habit Streaks</h2>
            {streaks.length === 0 ? (
                <p className="text-sm text-gray-500">No streaks yet. Start building habits today!</p>
            ) : (
                <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {streaks.map((streak, index) => (
                        <li key={index} className="flex justify-between text-sm">
                            <div className="font-medium">{streak.habit_name}</div>
                            <div className="text-right">
                                <p className="font-bold text-blue-900">{streak.current_streak}</p>
                                <p className="text-gray-500 text-xs">Longest: {streak.longest_streak}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Streaks;
