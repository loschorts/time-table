let ready = false;
let pending = [];

export const distanceQuery = (params) => {
    return new Promise((resolve, reject) => {
        const onResolve = () => {
            resolve(new Promise((res, rej) => {
                new google.maps.DistanceMatrixService()
                .getDistanceMatrix(params, res)
            }));
        }

        if (ready) {
            onResolve();
        } else {
            pending.push(onResolve);
        }
    });
};

export const clientIsReady = () => {
    ready = true;
    pending.forEach((query) => { query(); });
    pending = [];
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
