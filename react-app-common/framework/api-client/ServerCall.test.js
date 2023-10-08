import ServerCall from "./ServerCall";

it('noCallOrWait', function () {
    expect(ServerCall.noCallOrWait(ServerCall.createInitial())).toBe(true);
    expect(ServerCall.noCallOrWait(ServerCall.createInitial(), ServerCall.createInitial())).toBe(true);

    let serverCall1 = ServerCall.createInitial();
    expect(ServerCall.noCallOrWait(ServerCall.responseReceived(serverCall1, []))).toBe(false);
});
