import * as dotenv from 'dotenv';
dotenv.config();
import app from './server';



// const PORT = process.env.PORT;
// const PORT = 3000;
// get port from .env file or use 3000
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
})

