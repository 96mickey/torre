import { faLongArrowAltLeft, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GetData } from '../../api';
import './person.css';

/**
 * using a proxy to add 'Access-Control-Allow-Origin' in the header 
 * this will let browser accept the response
 *  */ 
const BIO_BASE_URL = "https://cors-anywhere.herokuapp.com/https://torre.bio/api/bios/";

export const Person = (props) => {
    const [loading, setLoading] = useState(true);

    // person related info
    const [person, setPerson] = useState();
    const [error, setError] = useState(false);
    const { id } = useParams();

    // fetching the person info
    useEffect(() => {
        GetData(BIO_BASE_URL + id)
        .then(result => {
            setPerson(result.person);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setError(true);
          });
    }, [setPerson, setLoading, setError, id])

    if(error) return <div className="container">Error</div>
    else if(loading) return <div className="container">Loading...</div>
    else return (
        <div>
            <Link className="go-back-to-home-button" to="/">
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
                Home
            </Link>
            {
                person ? 
                (
                <div className="container">
                    <div className="avatar-flip">
                        <img src={person.picture || './images/human.jpg'} alt="logo" height="150" width="150" />
                    </div>
                    <h2>{person.name}</h2>
                    <h4>
                    {
                        person.location && person.location.name &&
                        (<div className="text-with-logo">
                            <span className="logo">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </span>
                            {person.location.name}
                        </div>) 
                    }
                    </h4>
                    <p>
                        <strong>{person.professionalHeadline}</strong>
                    </p>
                    <p>
                        {person.summaryOfBio && <span>{person.summaryOfBio}</span>}
                    </p>
                </div>) :
                <div className="container">No Such user found!</div>
            }
        </div>
    )
}
