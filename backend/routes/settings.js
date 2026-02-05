const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// GET all settings
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('settings')
            .select('*');

        if (error) return res.status(500).json({ error: error.message });

        // Convert array to object for easier consumption
        const settings = data.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});

        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT update setting
router.put('/:key', async (req, res) => {
    const { key } = req.params;
    const { value } = req.body;

    try {
        const { data, error } = await supabase
            .from('settings')
            .update({ value, updated_at: new Date() })
            .eq('key', key)
            .select();

        if (error) return res.status(500).json({ error: error.message });
        res.json(data[0]);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
