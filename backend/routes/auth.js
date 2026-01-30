const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // In a real app, you should hash passwords. 
        // For this demo, we are comparing plain text as per the initial setup simplicity, 
        // but we strongly recommend hashing (bcrypt) in production.
        // We will check against the 'users' table.

        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Simple password check (Replace with bcrypt.compare in production)
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Return user info (excluding password)
        res.json({
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});


// Create Admin Route
router.post('/create-admin', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if user already exists
        const { data: existingUser, error: checkError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Insert new user
        const { data, error } = await supabase
            .from('users')
            .insert([
                { name, email, password, role: role || 'admin' }
            ])
            .select();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json({ message: 'Admin created successfully', user: data[0] });

    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get All Admins Route
router.get('/admins', async (req, res) => {
    try {
        const { data: admins, error } = await supabase
            .from('users')
            .select('*')
            .in('role', ['admin', 'super_admin']);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json(admins);

    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete Admin Route
router.delete('/admin/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json({ message: 'Admin deleted successfully' });

    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
