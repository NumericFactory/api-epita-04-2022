import { Request, Response } from "express";
import * as admin from 'firebase-admin'


class UserController {
    bcrypt:any =  require('bcrypt');
    jwt:any =  require('jsonwebtoken');

    // create
    create =  async (req: Request, res: Response) => {
       try {
           const { displayName, password, email, role } = req.body
           if (!displayName || !password || !email || !role) {
               return res.status(400).send({ message: 'Missing fields' })
           }
           const { uid } = await admin.auth().createUser({
               displayName,
               password,
               email
           })
           await admin.auth().setCustomUserClaims(uid, { role })
           return res.status(201).send({ uid })
       } catch (err:any) {
           return this.handleError(res, err)
       }
    }
    
    all = async (req: Request, res: Response) => {
        try {
            const listUsers = await admin.auth().listUsers()
            const users = listUsers.users.map(this.mapUser)
            return res.status(200).send({ users })
        } catch (err:any)  {
            return this.handleError(res, err)
        }
    }
    
    mapUser = (user: admin.auth.UserRecord) => {
        //console.log(user)
        const customClaims = (user.customClaims || { role: '' }) as { role?: string }
        const role = customClaims.role ? customClaims.role : ''
        return {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || '',
            role,
            lastSignInTime: user.metadata.lastSignInTime,
            creationTime: user.metadata.creationTime
        }
    }
    
    get = async (req: Request, res: Response) => {
       try {
           const { id } = req.params
           const user = await admin.auth().getUser(id)
           return res.status(200).send({ user: this.mapUser(user) })
       } catch (err:any) {
           return this.handleError(res, err)
       }
    }
    
    patch =  async (req: Request, res: Response) => {
       try {
           const { id } = req.params
           const { displayName, password, email, role } = req.body
    
           if (!id || !displayName || !password || !email || !role) {
               return res.status(400).send({ message: 'Missing fields' })
           }
           await admin.auth().updateUser(id, { displayName, password, email })
           await admin.auth().setCustomUserClaims(id, { role })
           const user = await admin.auth().getUser(id)
           return res.status(204).send({ user: this.mapUser(user) })
       } catch (err:any) {
           return this.handleError(res, err)
       }
    }
    
    remove = async (req: Request, res: Response) => {
       try {
           const { id } = req.params
           await admin.auth().deleteUser(id)
           return res.status(204).send({})
       } catch (err:any) {
           return this.handleError(res, err)
       }
    }

    //login = async(req:Request, res:Response) => {
        
        // const {email, password} = req.body;
        // UserRepository.findByEmail(email)
        // .then((user) => {
        //   if (!user) {
        //     return res.status(404).json({ error:'utilisateur non trouvé'})
        //   }
         
        //   else {  
        //     this.bcrypt.compare(password, user['password']) ;    
        //     res.status(404).json({ 
        //           id: user.id, 
        //           user: user.data(), 
        //     })    
        //   } 
        // }).catch(err => {res.status(500).json(err)})
    //}
    
    handleError = (res: Response, err: any) => {
       return res.status(500).send({ message: `${err.code} - ${err.message}` });
    }
}

export default new UserController()