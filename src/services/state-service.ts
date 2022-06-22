import {Service, StatefulService} from "react-service-locator";
import {StateType} from "../enums/state-type";

export interface IStateServiceState {
    isBusy: boolean;
    currentState: StateType;
}

@Service()
export class StateService extends StatefulService<IStateServiceState> {

    static readonly initialState: IStateServiceState = {
        isBusy: false,
        currentState: StateType.SHORT_FORM,
    };

    private currentState: IStateServiceState = {
        isBusy: false,
        currentState: this.state.currentState,
    };

    constructor() {
        super(StateService.initialState);
    }

    public getCurrentStatus(): StateType {
        return this.currentState.currentState;
    }

    public setCurrentStatus(status:StateType):void{
        this.currentState.currentState = status;
        this.setState(this.currentState);
    }


}