const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const { Client } = require('whatsapp-web.js');
const whatsappController = require('./controllers/whatsappController');
const dotenv = require('dotenv');
const path = require('path');
const privateKey = require('./config').privateKey;
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const User = require('./models/user.js');

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.get('/chat', (req, res) => {
  res.render('chat');
});
dotenv.config({ path: './config/.env' });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const client = new Client();
client.initialize();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.send('Welcome to Manugo Sushi!');
});

app.use(express.json());

app.use('/users', userRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;