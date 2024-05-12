import { State } from "./state.model";
export interface Exchange {
    idExch: number;
    dateExch: Date;
    state: State;
}