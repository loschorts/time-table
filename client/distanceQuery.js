let ready = false;
let pending = [];

window.onGoogleMapsClientLoaded = () => {
    ready = true;
    pending.forEach((query) => { query(); });
    pending = [];
};

export const distanceQuery = (params) => {
    console.dir({params})
    return new Promise((resolve, reject) => {
        const query = () => {
            resolve(new Promise((res, rej) => {
                new google.maps.DistanceMatrixService()
                .getDistanceMatrix(params, (response)=>{ res({ response, params }) });
            }));
        };

        if (ready) {
            query();
        } else {
            pending.push(query);
        }
    });
};

export const processDistanceResponse = ({ response, params }) => {
    const result = {};
    const { destinationAddresses, originAddresses, rows } = response;
    rows.forEach(({ elements }, o) => {
        elements.forEach(({ distance, duration, status }, d) => {
            const paramOrigin = params.origins[o];
            const paramDestination = params.destinations[d];

            const origin = originAddresses[o];
            const destination = destinationAddresses[d];

            result[paramOrigin] = result[paramOrigin] || {};
            result[paramOrigin][paramDestination] = { paramOrigin, paramDestination, origin, destination, distance, duration, status };
        })
    });

    return result;
}
