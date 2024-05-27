class ServerResponse {
    static hasErrored(response) {
        return response.status !== 200 && response.status !== 201;
    }

    static handleIfErrored(response) {
        if (ServerResponse.hasErrored(response)) throw new Error(response.message);
    }
}

export default ServerResponse;
