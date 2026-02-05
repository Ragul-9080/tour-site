import { useState, useEffect } from 'react';
import api from '../api';

const useSettings = () => {
    const [settings, setSettings] = useState({
        phone_number: '+91 9940882200',
        contact_email: 'mail.leholidays@gmail.com'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await api.get('/settings');
                setSettings(response.data);
            } catch (error) {
                console.error('Error fetching settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const updateSetting = async (key, value) => {
        try {
            await api.put(`/settings/${key}`, { value });
            setSettings(prev => ({ ...prev, [key]: value }));
            return true;
        } catch (error) {
            console.error(`Error updating setting ${key}:`, error);
            return false;
        }
    };

    return { settings, loading, updateSetting };
};

export default useSettings;
