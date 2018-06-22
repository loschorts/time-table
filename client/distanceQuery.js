export const distanceQuery = (params, cb) => {
    new google.maps.DistanceMatrixService().getDistanceMatrix(params, cb);
}
