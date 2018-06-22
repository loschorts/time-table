const _key = "locations";

localStorage.locations = 1;
if (!localStorage[_key]) write({});

if (typeof read() !== 'object') {
    console.warn("localStorage.locations type is unexpected -- resetting");
    write({});
}

function write(data) { localStorage[_key] = JSON.stringify(data); }
function read() { return JSON.parse(localStorage[_key]); }

export const getLocations = () => Object.keys(read());

export const addLocation = (loc) => {
    const tempLocs = read();
    tempLocs[loc] = true;
    write(tempLocs);
};

export const removeLocation = (loc) => {
    const tempLocs = read();
    delete tempLocs[loc];
    write(tempLocs);
}

export const clearLocations = () => {
    write({});
}
