import React, { useEffect, useState } from "react";

import { Link } from 'react-router-dom';

import api from '../services/Api';

const statuses = {
    watched: 'Watched',
    watching: 'Watching',
    toWatch: 'To watch',
}

function Series(props) {

    const [series, setSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        loadData();
    }, []);

    function loadData() {
        setIsLoading(true);
        api.loadSeriesByGenre(props.match.params.genre).then( (res) => {
            setSeries(res.data);
            setIsLoading(false);
        });
    }

    function deleteSerie(event, id) {
        event.preventDefault();
        api.deleteSeries(id).then( () => loadData());
    }

    function renderSerie(serie) {
        return(
            <div key={serie.id} className="item col-xs-4 col-lg-4">
                <div className="thumbnail">
                    <img
                        className="group list-group-image"
                        width="400"
                        height="250"
                        style= {{maxHeight: '250px', minHeight: '250px', margin: '8px'}}
                        src={serie.imageUrl}
                        alt=""
                    />
                    <div className="caption">
                        <h4 className="group inner list-group-item-heading">
                            { serie.name }
                        </h4>
                        <div className="row" style={ {display: 'block'} }>
                            <div className="col-xs-12">
                                <p className="lead">{ serie.genre } / { statuses[serie.status] } </p>
                            </div>
                            <div className="col-xs-12">
                                <Link to={`/series/edit/${serie.id}`}  href=" " style={ {marginRight: '15px'} }>
                                    <button type="button">
                                        Edit
                                    </button>
                                </Link>
                                <a onClick={ (event) => deleteSerie(event, serie.id) } href=" ">
                                    <button type="button">
                                        Delete
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="intro-section">
        <h1>Series - {props.match.params.genre}</h1>

        {
            isLoading &&
            <p> Wait, loading...</p>
        }

        {
            !isLoading && series.length === 0 && 
            <div className="alert alert-info"> There are no series registered. </div>
        }

        <div id="series" className="row list-group">
            { !isLoading && series.map( (serie) => renderSerie(serie) ) }
        </div>
        </section>
    );
}

export default Series;
