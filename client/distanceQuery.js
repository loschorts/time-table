export const distanceQuery = (params, cb) => {
    return new Promise((res, rej) => {
        new google.maps.DistanceMatrixService().getDistanceMatrix(params, (...args) => {
            res(...args);
        });
    })
}
export const processDistanceResponse = (response, status) => {
    const { destinationAddresses, originAddresses, rows } = response;
    rows.forEach(({ elements }, o) => {
        elements.forEach(({ distance, duration, status }, d) => {
            console.dir({
                origin: originAddresses[o],
                destination: destinationAddresses[d],
                distance, duration, status
            })
        })
    })
}
