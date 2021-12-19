import jwt from 'jwt-decode';

export async function decode(token: string): Promise<any | null> {
    try {
        const decoded: any = await jwt(token);
      console.log(decoded);
        return {
            exp: decoded.exp,
            // @ts-ignore
            username: decoded.sub
        };
    } catch (e) {
        return null;
    }
}
