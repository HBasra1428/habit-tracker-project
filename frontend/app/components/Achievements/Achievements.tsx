'use client';
import React, { useEffect, useState } from 'react';
import api from '@/app/api/api';

interface Achievement {
    achievement_id: number;
    name: string;
    description: string;
    locked_status: boolean;
}

const Achievements: React.FC = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await api.get('/achievements/me/');
                setAchievements(response.data);
            } catch (err) {
                console.error("Failed to fetch achievements:", err);
            }
        };

        fetchAchievements();
    }, []);

    return (
        <div className="bg-white text-black p-6 rounded-2xl shadow-md border border-blue-300 w-full">
            <h2 className="text-xl font-bold mb-4">🏅 Achievements</h2>
            {achievements.length === 0 ? (
                <p className="text-gray-500 text-sm">No achievements yet!</p>
            ) : (
                <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {achievements.map((ach) => (
                        <li key={ach.achievement_id} className="flex justify-between text-sm">
                            <div>
                                <p className="font-medium">{ach.name}</p>
                                <p className="text-xs text-gray-600">{ach.description}</p>
                            </div>
                            <span
                                className={`px-4 py-2 text-xs rounded-full ${
                                    ach.locked_status ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'
                                }`}
                            >
                                {ach.locked_status ? 'Locked' : 'Unlocked'}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Achievements;
