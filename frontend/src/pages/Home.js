import React, { useState, useEffect } from 'react';

import api from '../services/Api';

import { Link } from 'react-router-dom';

function Home({ history }) {

    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect( () => {
      setIsLoading(true);
      api.loadGenres().then( (res) => {
        setGenres(res.data);
        setIsLoading(false);
      });
    }, []);
  
    function renderGenreLink(genre) {
      return (
          <span key={genre} >
              &nbsp;
              <Link to={`/series/${genre}`} > {genre} </Link>
          </span>
      )
    }


    return (
        <div>
            <section id="intro" className="intro-section">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12">
                        <h1><img alt="logo" src="images/logo.png" /></h1>
                        <p>Save your series progress and never forget which series you have watched.</p>
                    </div>
                    </div>
                </div>
            </section>

            <section>
                { isLoading && 
                    <span> Wait, loading...</span>          
                }

                { !isLoading && 
                    <div className="series-genres"> 
                    Watch series from genres:
                    { genres.map(genre => renderGenreLink(genre)) }
                    </div>          
                }
            </section>
        </div>
    );
}

export default Home;