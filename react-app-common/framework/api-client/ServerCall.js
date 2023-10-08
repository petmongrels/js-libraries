import _ from "lodash";
import ServerCallStatus from "./ServerCallStatus.js";

const DEFAULT_CALL_NAME = 'default';

class ServerCall {
    constructor(callStatus, response, lastCallName = DEFAULT_CALL_NAME) {
        this.callStatus = callStatus;
        this.response = response;
    }

    static null(data) {
        return new ServerCall(ServerCallStatus.NOT_NEEDED, this._getNullResponse(data));
    }

    static createInitial(data) {
        return new ServerCall(ServerCallStatus.NO_CALL_MADE, this._getNullResponse(data));
    }

    static responseReceived(serverCall, response) {
        return new ServerCall(this._getCallStatus(response, serverCall), response);
    }

    static serverCallMade(serverCall) {
        return new ServerCall(ServerCallStatus.WAITING, serverCall.response);
    }

    static getData(serverCall) {
        if (_.isNil(serverCall.response)) return null;
        return serverCall.response.data;
    }

    static isSuccessful(serverCall) {
        return serverCall.callStatus === ServerCallStatus.SUCCESS;
    }

    static isCallComplete(serverCall) {
        return (serverCall.callStatus === ServerCallStatus.FAILURE ||
            serverCall.callStatus === ServerCallStatus.SUCCESS);
    }

    static isNotSuccessful(serverCall) {
        return this.isCallComplete(serverCall) && !this.isSuccessful(serverCall);
    }

    static getErrorMessage(serverCall, translator) {
        if (!serverCall || !serverCall.response)
            return null;

        const response = serverCall.response;
        if (response.status >= 400)
            return translator ? translator('unexpected-error-message') : "Unknown server error. Please report the error.";

        if (response.status !== 200 && response.status !== -1)
            return translator ? translator('unknown-error') : "Unknown Error";

        if (response.message)
            return response.message;

        if (response.error)
            return response.error.message;

        return null;
    }

    static isForbidden(serverCall) {
        return this.statusEquals(serverCall, 403);
    }

    static statusEquals(serverCall, code) {
        return serverCall.response.status === code;
    }

    static isAuthorised(serverCall) {
        return this.statusEquals(serverCall, 401);
    }

    static errorOrWait(serverCall) {
        return this.waiting(serverCall)
            || serverCall.callStatus === ServerCallStatus.FAILURE;
    }

    static errored(serverCall) {
        return serverCall.callStatus === ServerCallStatus.FAILURE;
    }

    static noCallOrWait() {
        return _.reduce(arguments,
            (b, serverCall) => (this.waiting(serverCall) || serverCall.callStatus === ServerCallStatus.NO_CALL_MADE) || b, false
        );
    }
    
    static waiting(serverCall) {
        return serverCall.callStatus === ServerCallStatus.WAITING;
    }

    static _getCallStatus(response, serverCall) {
        if (_.isNil(response)) return serverCall.callStatus;
        if (response.ok)
            return ServerCallStatus.SUCCESS;

        return ServerCallStatus.FAILURE;
    }

    static _getNullResponse(data) {
        return {ok: null, status: -1, data: data};
    }

    static isWasNotNeeded(serverCall) {
        return serverCall.callStatus === ServerCallStatus.NOT_NEEDED;
    }
}

export default ServerCall;
