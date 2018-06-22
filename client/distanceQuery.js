let ready = false;
let pending = [];

window.onGoogleMapsClientLoaded = () => {
    ready = true;
    pending.forEach((query) => { query(); });
    pending = [];
};

export const distanceQuery = (params) => {
    return new Promise((resolve, reject) => {
        const query = () => {
            resolve(new Promise((res, rej) => {
                new google.maps.DistanceMatrixService()
                .getDistanceMatrix(params, res)
            }));
        }

        if (ready) {
            query();
        } else {
            pending.push(query);
        }
    });
};

export const processDistanceResponse = (response) => {
    const result = {};

    const { destinationAddresses, originAddresses, rows } = response;
    rows.forEach(({ elements }, o) => {
        elements.forEach(({ distance, duration, status }, d) => {
            const origin = originAddresses[o];
            const destination = destinationAddresses[d];
            result[origin] = result[origin] || {};
            result[origin][destination] = { origin, destination, distance, duration, status };
        })
    });

    return result;
}
