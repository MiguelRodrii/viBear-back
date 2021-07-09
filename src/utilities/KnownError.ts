import {GQLError} from "../../deps.ts";

export class KnownError extends GQLError {
    constructor(body:{technical: string, nontechnical: string}) {
        super({type: "known", body: body})
    }
}