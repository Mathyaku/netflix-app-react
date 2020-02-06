import React, { useState, useEffect } from 'react';

import api from '../services/Api';

const statuses = {
    watched: 'Watched',
    watching: 'Watching',
    toWatch: 'To watch',
}

function EditSeries({history, match}) {

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

      api.loadSeriesById(match.params.id).then(res => {
          setStatus(res.data.status);
          setGenre(res.data.genre);
          setComments(res.data.comments);
          setName(res.data.name);
          setImageUrl(res.data.imageUrl);
      })
    }, []);

    function updateSeries(event) {
        event.preventDefault();

        const series = {
            name,
            imageUrl,
            genre,
            status,
            comments,
            id: match.params.id
        }

        api.updateSeries(series).then(
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
                    {
                        Object.keys(statuses)
                        .map(key => <option value={key} key={key}> {statuses[key]} </option>)
                    }    
                </select><br/>
                Genre:
                <select value={genre} onChange={ (event) => setGenre(event.target.value)} className="form-control">
                    {
                        genres.map(key => <option value={key} key={key}> {key} </option>)
                    }    
                </select><br/>
                Comments: <textarea value={comments} onChange={ (event) => setComments(event.target.value)} type="text" className="form-control"></textarea><br/>
                <button type="button" onClick={ (event) => updateSeries(event)} > Save </button>
            </form>
        </section>

  );
}

export default EditSeries;
