import React from 'react';
import { PeopleCard } from './people-card';
import './people-list.css';

export const PeopleList = React.memo((props) => {
    return (
    <div className="people-list">
        {peopleMap(props.people)}
    </div>
    );
})

const peopleMap = (people) => {
    return people.map((person, index) => {
        return (<PeopleCard key={person.subjectId} person={person} />);
    });
}
