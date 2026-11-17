
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import router from './src/routes.js';

const nodeEnv =
  process.env.NODE_ENV?.toLowerCase() || 'development';

const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// EJS configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Application routes
app.use(router);

// 404 - Page Not Found
app.use((req, res, next) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  const status = err.status === 404 ? 404 : 500;

  res.status(status).render(
    status === 404 ? '404' : '500',
    {
      title: status === 404
        ? 'Page Not Found'
        : 'Internal Server Error'
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${nodeEnv}`);
});
