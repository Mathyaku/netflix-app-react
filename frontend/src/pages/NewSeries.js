import React, { useState, useEffect } from 'react';

import api from '../services/Api';

const statuses = {
    watched: 'Watched',
    watching: 'Watching',
    toWatch: 'To watch',
}

function NewSeries({history}) {

    const [genres, setGenres] = useState([]);

    const [status, setStatus] = useState('');
    const [genre, setGenre] = useState('');
    const [comments, setComments] = useState('');
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect( () => {
      api.loadGenres().then( (res) => {
        setGenres(res.data);
      });
    }, []);

    function saveSeries(event) {
        event.preventDefault();

        const newSeries = {
            name,
            imageUrl,
            genre,
            status,
            comments,
        }

        api.saveSeries(newSeries).then(
            res => {
                history.push(`/series/${genre}`)
            }
        )
    }

  	return (
		<section className="intro-section"> 
            <h1> New serie </h1> 
            <form>
                Name: <input value={name} onChange={ (event) => setName(event.target.value)} type="text" className="form-control"></input><br/>
                Image Url: <input value={imageUrl} onChange={ (event) => setImageUrl(event.target.value)} type="text" className="form-control"></input><br/>
                Status: 
                <select value={status} onChange={ (event) => setStatus(event.target.value)} className="form-control">
                    <option value={''} disabled> Select the serie status</option>
                    {
                        Object.keys(statuses)
                        .map(key => <option value={key} key={key}> {statuses[key]} </option>)
                    }    
                </select><br/>
                Genre:
                <select value={genre} onChange={ (event) => setGenre(event.target.value)} className="form-control">
                    <option value={''} disabled> Select the serie genre</option>
                    {
                        genres.map(key => <option value={key} key={key}> {key} </option>)
                    }    
                </select><br/>
                Comments: <textarea value={comments} onChange={ (event) => setComments(event.target.value)} type="text" className="form-control"></textarea><br/>
                <button type="button" onClick={ (event) => saveSeries(event)} > Save </button>
            </form>
        </section>

  );
}

export default NewSeries;
