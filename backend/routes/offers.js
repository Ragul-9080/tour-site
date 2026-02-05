const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// GET all offers
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('offers')
        .select('*');

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// POST create offer
router.post('/', async (req, res) => {
    const { title, discount_percentage, valid_till, description, image_url } = req.body;

    const { data, error } = await supabase
        .from('offers')
        .insert([{ title, discount_percentage, valid_till, description, image_url }])
        .select();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
});

// PUT update offer
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
        .from('offers')
        .update(updates)
        .eq('id', id)
        .select();

    if (error) return res.status(500).json({ error: error.message });
    res.json(data[0]);
});
// DELETE offer
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('offers')
        .delete()
        .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Offer deleted successfully' });
});

module.exports = router;
