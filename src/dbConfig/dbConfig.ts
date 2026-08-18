import mongoose from 'mongoose'
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

export async function connect() {
    try {
        console.log(process.env.MONGO_URI!);
        
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log('MongoDB connected successfully');
            
        })

        connection.on('error',(err)=>{
            console.log('MongoDB connection error!!!', err);
            process.exit();
            
        })
    } catch (error) {
        
        console.log('Something went wrong');
        console.log(error);
        
    }
}