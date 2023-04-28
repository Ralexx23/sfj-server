import app from './app';
import connectDB from './libs/mongoose';

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    console.log(`http://localhost:${port}`);

    const db = await connectDB();

    if (db) {
        console.log('DB is connected');
    }else{
        console.log('DB is not connected');
        process.exit(1);
    }
});
