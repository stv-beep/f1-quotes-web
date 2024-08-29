import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import mockQuotes from '../data/mockQuotes.json'
import mockPeople from '../data/mockPeople.json'

function HomePage() {

    const RapidAPI_KEY = import.meta.env.VITE_RAPID_API_KEY

    const APIurl = 'https://f1-drivers-quotes.p.rapidapi.com/';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': RapidAPI_KEY,
            'x-rapidapi-host': 'f1-drivers-quotes.p.rapidapi.com'
        }
    };

    const [data, setData] = useState(null);
    const [people, setPeople] = useState(null);


    /* topic quotes */
    useEffect(() => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            setData(mockQuotes)
        } else {
            fetch(APIurl+'quotes', options)
                .then(response => response.json())
                .then(json => setData(json))
                .catch(error => console.error(error));
        }
    }, []);


    /* list of drivers */
    useEffect(() => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            setPeople(mockPeople)
        } else {
            fetch(APIurl+'authors', options)
                .then(response => response.json())
                .then(json => setPeople(json))
                .catch(error => console.error(error));
        }
    }, []);

    return (
        <div className="authorsSection">
            <section className="box py-6">
                
                <div className="w-3/4 p-5 rounded-lg backdrop-blur-md bg-gray-800/40">
                    <h2 className="text-white text-5xl mb-3 font-extrabold">Some topic quotes</h2>

                    {data ? 
                    
                        <div className="">
                            {
                                data.map(quote => (
                                    <div key={quote.id} className="my-5">
                                        <p className="text-white text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-300 to-yellow-400">
                                            <span className="text-yellow-400 text-3xl">"</span>
                                            {quote.quote}
                                            <span className="text-yellow-400 text-3xl">"</span>
                                        </p>

                                        <p className="text-white text-xl">- {quote.author}</p>
                                        
                                    </div>
                                ))
                            }
                        </div>

                    : 'Loading...'}

                </div>

            </section>

            <section className="py-6">
                
                <div className="w-3/4 p-5 rounded-lg backdrop-blur-md bg-gray-800/40 ">
                    <h2 className="text-white text-5xl mb-6 font-extrabold">Drivers</h2>

                    {people ?
                        
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                            {
                                people.map(person => (
                                    <Link key={person.id} to={`/person/${person.id}`} className="block overflow-hidden authorLink">
                                        <img src={person.img} alt={person.name} className="w-[999px] h-[100%] object-cover" />
                                        <div className="detail ">
                                            <h3 className="text-white text-2xl font-extrabold my-4 text-center">{person.name}</h3>
                                        </div>
                                        
                                    </Link>
                                ))
                            }
                        </div>


                        : 'Loading...'
                    
                    }

                </div>

            </section>

        </div>
    )

}

export default HomePage;