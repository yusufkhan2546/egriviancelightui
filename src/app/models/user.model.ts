import { Role } from '../helpers/role.enum';

export class User {
    _id?:string = '';
    address: String = '';
    dob:Date = null;
    gender:String = '';
    city: String = '';
    email: string = '';
    firstName: string = '';
    lastName: String = '';
    password: string = '';
    phone: String = '';
    pincode: String = '';
    role:Role;
    state: String = '';
    smtpServer:String='smtp-mail.outlook.com' ;
    smtpUsername:String='example@outlook.com' ;
    smtpPassword:String ='pwd' ;
    smtpPort:Number= 587 ;
    tlsssl:Boolean =false; 
    token?:String = '';
}