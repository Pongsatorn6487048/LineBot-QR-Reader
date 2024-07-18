import { Injectable } from '@nestjs/common';
import { liff } from '@line/liff'

@Injectable()
export class LineLoginService {

    getLiffId(): string {
        return process.env.LINE_LIFF_ID;
    }

    async getProfile() {
        try {
            const profile = await liff.getProfile()
            console.log(profile)
            return profile;
        }catch (err){
            console.log('ERROR loginservice.getProfile: ',err)
            return null;
        }
        
    }
}