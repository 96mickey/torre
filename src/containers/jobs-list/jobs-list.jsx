import React from 'react';
import { JobCard } from './job-card';
import './jobs-list.css';

export const JobsList = React.memo((props) => {
    return (
    <div className="people-list">
        {jobsMap(props.jobs)}
    </div>
    );
})

const jobsMap = (jobs) => {
    return jobs.map(job => {
        return (<JobCard key={job.id} job={job} />);
    });
}
