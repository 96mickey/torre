import React from 'react';
import {SearchTypes} from '../../helper';
import { Tabs, Tab } from '../';
import './home.css';
import { Jobs, People } from '../../components';

export const Home = React.memo((props) => {
  return (
    <div className="home-wrapper">
        <p className="home-page-heading">Explore to find awesome Talent/Opportunities</p>
        <Tabs>
            <Tab label={SearchTypes.PEOPLE}>
              <People />
            </Tab>
            <Tab label={SearchTypes.JOBS}>
              <Jobs />
            </Tab>
        </Tabs>
    </div>
  )
})
