import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Loading from "../components/Loading";

function PersonQuotesPage() {

    const RapidAPI_KEY = import.meta.env.VITE_RAPID_API_KEY

    const APIurl = 'https://f1-drivers-quotes.p.rapidapi.com/';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': RapidAPI_KEY,
            'x-rapidapi-host': 'f1-drivers-quotes.p.rapidapi.com'
        }
    };

    const {id} = useParams()

    const [person, setPerson] = useState(null);
    const [quotes, setQuotes] = useState(null);


    /* person quotes */
    useEffect(() => {
        fetch(APIurl+`quotes/${id}`, options)
            .then(response => response.json())
            .then(json => setQuotes(json))
            .catch(error => console.error(error));
    }, [id]);
   

    /* person data */
    useEffect(() => {
        fetch(APIurl + `authors/${id}`, options)
            .then(response => response.json())
            .then(json => setPerson(json))
            .catch(error => console.error(error));
    }, [id]);


    return (
        <div className="bg-grad">
            <section className="py-6">
                
                <div className="max-[767px]:w-11/12 md:w-3/4 p-5 rounded-lg backdrop-blur-md bg-gray-800/60">

                    {person ?
                        <div className="person-info text-center mb-6">
                            {
                                person.map(author => (
                                    <div key={author.id}>
                                        <img src={author.img} alt={author.name} className="mx-auto rounded-lg w-32 h-32 object-cover" />
                                        <h1 className="text-white text-5xl mb-3 font-extrabold">Quotes from <span className="text-[#5bffe1]">{author.name}</span></h1>
                                    </div>
                                ))
                            }
                        </div>
                        
                    : <Loading/>}

                    {quotes ? 
                    
                        <div className="">
                            {
                                quotes.map(quote => (
                                    <div key={quote.id} className="my-5">
                                        <p className="text-white max-[767px]:text-xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-300 to-yellow-400">
                                            <span className="text-yellow-400 text-3xl">"</span>
                                            {quote.quote}
                                            <span className="text-yellow-400 text-3xl">"</span>
                                        </p>
                                        
                                    </div>
                                ))
                            }
                        </div>

                    : <Loading/>}

                </div>

            </section>

        </div>
    )
}


export default PersonQuotesPage