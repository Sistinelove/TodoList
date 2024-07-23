import express, { Request, Response } from 'express';
import cors from 'cors';

const PORT = 4000;
const app = express();
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({ fruits: ['apple', 'sdhadjlkadj', 'hasdkasd'] });
});

app.listen(PORT, () => console.log('HELLO MOTHERFUCKER'));
