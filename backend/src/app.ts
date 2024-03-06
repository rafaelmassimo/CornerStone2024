import express from 'express';
import morgan from 'morgan';
import { 
    usersRoutes, 
    authRoutes,
    sectionTextRoutes,
    sectionImageRoutes,
    sectionImageTextRoutes,
    sectionEmbeddedMediaRoutes,
    sectionDividerRoutes,
    seedRoutes,
    portfolioRoutes
    
} from './routes';
import cors from "cors";

//* Start Express
const app = express();

//* Middlewares
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use(morgan('dev'));

//*Cors
app.use(cors({ origin: "*" }));

//* Routes
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/section-text', sectionTextRoutes);
app.use('/api/section-image', sectionImageRoutes);
app.use('/api/section-image-text', sectionImageTextRoutes);
app.use('/api/section-embedded-media', sectionEmbeddedMediaRoutes);
app.use('/api/section-divider', sectionDividerRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/portfolio', portfolioRoutes);



export default app;
