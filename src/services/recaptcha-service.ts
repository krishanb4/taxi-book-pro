import {Service, StatefulService} from "react-service-locator";

export interface IRecaptchaServiceState {
    isBusy: boolean;
    token:string|null;
}

@Service()
export class RecaptchaService extends StatefulService<IRecaptchaServiceState> {

    static readonly initialState: IRecaptchaServiceState = {
        isBusy: false,
        token:null,
    };

    private currentState: IRecaptchaServiceState = {
        isBusy: false,
        token:null,
    };

    constructor() {
        super(RecaptchaService.initialState);
    }

    public getToken(): string | null {
        return this.currentState.token;
    }

    public setToken(value: string | null) {
        this.currentState.token = value;
        this.setState(this.currentState);
    }

    public isTokenExpired(){
        return this.currentState.token === null;
    }


}