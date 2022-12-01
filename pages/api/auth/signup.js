import {client} from '../../../lib/mongodb';

import {hashPassword} from '../../../lib/auth';

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            // connect to mongodb
            try{
                const connect = await client.connect();
                const db =  connect.db();
                const users = db.collection('users');
                const {username, email, password} = req.body;

                const existingUser = await users.findOne({
                    "$or": [
                        {username: username},
                        {email: email}
                    ]                       
                });

                if(existingUser){
                    res.status(409).json({message: 'User already exists!'});
                    client.close();
                    return;
                }

                if (username.trim() === '' || email.trim() === '' || password.trim() === '' || password.trim().length < 7) {
                    res.status(422).json({message: 'Invalid input.'});
                    client.close();
                    return;
                }
                const user = await users.insertOne({
                    username,
                    email,
                    password: await hashPassword(password),
                    created_at: new Date().toISOString()
                });
                res.status(201).json({message: 'User created'});
                }catch(err){
                    res.status(500).json({message: 'Error'});
                }
            break;
        default:
            return res.status(405).end();
    }
}
