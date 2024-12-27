import jwt from 'jsonwebtoken';

export function CreateJwtToken<T extends object> ( payload:T ) : string {
    let seed = String(process.env.JWT_SECRET);
    return jwt.sign(payload, seed);
}


export function CheckJwtToken<T extends object> ( userToken:string ) : T | null {
    let seed = String(process.env.JWT_SECRET);
    try {
        return jwt.verify(userToken,seed) as T;
    } catch (error) {
        return null;
    }
}