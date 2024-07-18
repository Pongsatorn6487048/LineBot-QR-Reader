import { Injectable } from '@nestjs/common';
import { liff } from '@line/liff'

@Injectable()
export class TestService {

    getLiffId(): string {
        return process.env.LINE_LIFF_ID;
    }

    getProfile() {
        try {
            liff.init({ liffId: this.getLiffId()})
            const profile = liff.getProfile()
            console.log(profile)
            return profile;
        }catch (err){
            console.log('ERROR loginservice.getProfile: ',err)
        }
        
    }
}