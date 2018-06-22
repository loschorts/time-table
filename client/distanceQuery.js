export const distanceQuery = (params) => {
    return new Promise((res, rej) => {
        new google.maps.DistanceMatrixService()
        .getDistanceMatrix(params, res)
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

    console.dir({ result });
    return result;
}
