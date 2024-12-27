import Bcrypt from "bcryptjs";

export function EncryptPass (pass:string, cicles:number = 13) : string {
    return Bcrypt.hashSync(pass, cicles);
}

export function VerifyPass (pass:string, hash:string) : boolean {
    return Bcrypt.compareSync(pass,hash);
}