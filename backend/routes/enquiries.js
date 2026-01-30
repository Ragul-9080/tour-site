const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// POST submit enquiry
router.post('/', async (req, res) => {
    const {
        name, email, phone, city, whatsapp,
        destination, travel_date, people_count,
        vacation_type, message, package_id
    } = req.body;

    const { data, error } = await supabase
        .from('enquiries')
        .insert([{
            name, email, phone, city, whatsapp,
            destination, travel_date, people_count,
            vacation_type, message, package_id
        }])
        .select();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
});

// GET all enquiries (Admin)
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('enquiries')
        .select('*, packages(title)')
        .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

module.exports = router;
