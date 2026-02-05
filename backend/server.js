const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/offers', require('./routes/offers'));
app.use('/api/enquiries', require('./routes/enquiries'));
app.use('/api/settings', require('./routes/settings'));

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Tour Packages API is running');
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { supabase };
