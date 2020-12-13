import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUserTag } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import './people-card.css';

export const PeopleCard = (props) => {
    return (
    <div className="person-card">
        <img src={props.person.picture || './images/human.jpg'} alt="logo" />
        <div className="person-bio">
            <div className="person-name">
                {props.person.name}
                <hr />
            </div>
            <div className="person-headline text-with-logo">
                <span className="logo">
                    <FontAwesomeIcon icon={faUserTag} />
                </span>
                {props.person.professionalHeadline || "-"}
            </div>
            <div className="person-location text-with-logo">
                <span className="logo">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                </span>
                {props.person.locationName || "-"}
            </div>
        </div>
    </div>
    )
}
