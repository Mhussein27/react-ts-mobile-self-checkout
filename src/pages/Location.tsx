import Geolocation from '../components/Geolocation/Geolocation';


export function Location() {
    return (
        <article className="p-8 bg-slate-800 min-h-screen text-slate-200 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold my-4">We need to know your location first </h1>
            <h2 className="text-xl font-bold my-3 mt-4">to continue, turn on device location</h2>
            <Geolocation />
        </article>
    );
}

export default Location;