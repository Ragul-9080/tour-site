const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// GET all packages
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('packages')
        .select('*');

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// GET single package
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return res.status(404).json({ error: 'Package not found' });
    res.json(data);
});

// POST create package (Admin only - middleware to be added)
router.post('/', async (req, res) => {
    const { title, destination, category, duration, price, image_url, description } = req.body;

    const { data, error } = await supabase
        .from('packages')
        .insert([{ title, destination, category, duration, price, image_url, description }])
        .select();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
});

// PUT update package
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
        .from('packages')
        .update(updates)
        .eq('id', id)
        .select();

    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
});

// DELETE package
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Package deleted successfully' });
});

module.exports = router;
