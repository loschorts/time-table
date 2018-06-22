import { distanceQuery, processDistanceResponse } from './distanceQuery';
import { addLocation, getLocations } from './locations';

export default () => {

    addLocation("1611 2nd Ave, Oakland, CA");
    addLocation("Pacifica State Beach");
    addLocation("Disneyland");

    const origins = getLocations();
    const destinations = getLocations();

    const params = {
      origins,
      destinations,
      travelMode: 'DRIVING',
    };

    distanceQuery(params)
    	.then(processDistanceResponse)
    	.then(res => console.log(res))
}
