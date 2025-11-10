import express from 'express';
import { config } from './config';
import imageRoutes from './routes/imageRoutes';

const app = express();
app.use(express.json());
app.use('/api/images', imageRoutes);

app.get('/health', (_req, res) => res.send('PixlAgent API running'));

app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
