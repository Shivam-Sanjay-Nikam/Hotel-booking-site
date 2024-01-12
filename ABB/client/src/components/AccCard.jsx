

export default function AccCard({ places }) {
  return (
    <div>
      <div>
        {places.length > 0 &&
          places.map((place) => (
            <div key={place._id}>
                <div className="m-7 ">
              <div className="inline-flex p-4 gap-5 bg-gray-200 rounded-lg overflow-hidden shadow-md ">

                  <img className="w-32 h-32 object-cover" src={place.photos[0]} alt="" />

                <div >
                  <h2 className="text-xl font-bold mb-2">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
