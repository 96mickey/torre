import { faDoorOpen, faMapMarkerAlt, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './job-card.css';

export const JobCard = (props) => {
    const location = props.job.locations && props.job.locations.length > 0
         ? props.job.locations.join() : undefined ;
    const compensation = compensationCalculator(props.job.compensation);
    const {name, logo} = getOrgInfo(props.job.organizations);
    return (
    <div className="job-card">
        <img src={logo || './images/company.png'} alt={name} />
        <div className="job-bio">
        <div className="job-name">
            {name}
            {location ? <span title={location} className="job-location text-with-logo">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                {location}
            </span> : ""}
            <hr />
        </div>
        <div className="job-headline">
            <span className="logo">
                <FontAwesomeIcon icon={faDoorOpen} />
            </span>
            {props.job.objective}
        </div>
        <div className="job-headline">
            <span className="logo">
                <FontAwesomeIcon icon={faMoneyBillAlt} />
            </span>
            {compensation}
        </div>
        </div>
    </div>
    )
}

const compensationCalculator = (compensation) => {
    let ctc = "";
    if(compensation?.data?.code === "range") {
        ctc += `${compensation.data.minAmount} - ${compensation.data.maxAmount} `;
        ctc += `${compensation.data.currency} / ${compensation.data.periodicity}`;
        return ctc;
    } else {
        return "-";
    }
}

const getOrgInfo = (orgData) => {
    let name = "-";
    let logo = "-";
    if(!orgData || orgData.length <= 0) {
        return {name, logo}
    } else {
        return {
            name: orgData[0].name,
            logo: orgData[0].picture
        }
    }
}
