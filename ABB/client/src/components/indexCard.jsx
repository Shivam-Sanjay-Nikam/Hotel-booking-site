export default function IndexCard({place}) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md ">
            {place.photos?.[0] && (
                <img className="w-full h-48 object-cover" src={place.photos?.[0]} alt="" />
            )}
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{place.title}</h2>
                <h3 className="text-sm text-gray-500 mb-2">{place.address}</h3>
                <div className="font-semibold text-pink-500">${place.price} per night</div>
            </div>
        </div>
    )
}