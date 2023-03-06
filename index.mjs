import express from "express";          //route management
import nodemailer from "nodemailer";    //send emails
import cors from "cors";                //
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env);

//assigns port assigned by netlify
const port = process.env.PORT || 3000;


const app = express()
app.use(cors())

app.get('/', async(req, res) => {
    console.log('Running in browser');

    const name = req.query.name;
    const email = req.query.email;
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    })
    try {
        await transporter.sendMail({
            from: '"Moloko" <molokochrisp742@gmail.com>',
            to: email,
            subject: 'Welcome ' + `${name}`,
            text: '',
            html: `
            <div style="height:fit-content; width: fit-content; border: 1px solid rgb(200, 100, 100); border-radius: 10px">
            <div style="margin: 20px">
                <h3>Welcome ${name}</h3>
                <p>Hi and welcome to the tech family.</p>
                <p>If you wish to upgrade to more features, please contact us at bfkjb@odnndfc.com, 
                    for more info contact us at kdffnvfdkl@dfkvnfo.com or call: 098 876 5432.</p>
            </div>
            </div>
            `
        })
        res.send({message: 'success'})
    } catch (error) {
        res.send({message: 'Error'})
    }
    
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})