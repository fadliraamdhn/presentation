import express from "express";
import hbs from "hbs";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import flash from "express-flash";
import portfolioRoutes from './routes/portofolioRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

hbs.registerHelper('formatMonthYear', function(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long' });
});

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use('/', portfolioRoutes);

app.listen(PORT, () => {
    console.log(`Server dijalankan di http://localhost:${PORT}`)
})