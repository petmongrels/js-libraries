const ServerCallStatus = Object.freeze({
    WAITING: Symbol("waiting"),
    SUCCESS: Symbol("success"),
    FAILURE: Symbol("failure"),
    NO_CALL_MADE: Symbol("no_call_made"),
    NOT_NEEDED: Symbol("not_needed")
});

export default ServerCallStatus;
