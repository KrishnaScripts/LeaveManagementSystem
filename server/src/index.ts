
import express,{Application} from "express";
import authRoutes from "./routes/authRoutes";
import cors from 'cors';
const app:Application = express();

app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only this origin (React app)
  methods: ['GET', 'POST'],         // Allow only specific methods if needed
  credentials: true                 // Allow cookies or credentials if needed
}));
const port = process.env.PORT || 5000;
app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });




