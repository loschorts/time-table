import { distanceQuery, processDistanceResponse } from './distanceQuery';

export default () => {
    var origins = ['Oakland, CA'];
    var destinations = ['Pacifica, CA'];

    const params = {
      origins,
      destinations,
      travelMode: 'DRIVING',
    };

    distanceQuery(params)
    	.then(processDistanceResponse)
    	.then(res => console.log(res))

}
