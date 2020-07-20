import { Login } from '../models/login.model';

export class LoginUser {
    static readonly type = '[User] Login';
    constructor(public Payload:Login){
    }
}