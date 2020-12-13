import React from 'react';
import InfiniteScroll from "react-infinite-scroller";
import { PostData } from '../../api';
import { InputSearch } from '../../containers';
import { JobsList } from '../../containers/jobs-list/jobs-list';
import { debounce } from '../../helper';
import './jobs.css';

const JOBS_LIST_URL = '/opportunities/_search/';

export class Jobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            searchKeyword: "",
            jobs: [],
            offset: 0,
            size: 10,
            hasMore: true
        }
    }

    prepareDataToFetchJobsList(resetState) {
        if(this.state.loading) {
            return;
        }
        if(resetState === true) { 
            this.setState({
                jobs: [],
                offset: 0,
                hasMore: true
            }, this.setJobList);
        } else {
            this.setJobList();
        }
    }

    setJobList() {
        this.setState({loading: true});
        const {offset, size, searchKeyword} = this.state;
        const params = new URLSearchParams({
            offset,
            size
        });
        const jobsListUrlWithQuery = `${JOBS_LIST_URL}?${params.toString()}`;
        const payload = searchKeyword ? {
            organization: {
                term: searchKeyword
            }
        } : null;

        PostData(jobsListUrlWithQuery, payload)
        .then(result => {
            console.log(result.results)
            const stateToUpdate = {};
            stateToUpdate.jobs = [...this.state.jobs, ...result.results];
            if(result.results < 10) {
                stateToUpdate.hasMore = false;
            } else {
                stateToUpdate.offset = this.state.offset + this.state.size;
            }
            this.setState(stateToUpdate, () => {
                this.setState({loading: false});
            });
        })
        .catch(error => {
            console.error("Error! Please try again.", error);
            this.setState({loading: false});
        });
    }

    searchPeople = debounce(() => {
        this.prepareDataToFetchJobsList(true)
    }, 300);

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        this.searchPeople(this);
    };     

    render() {
        const {searchKeyword, jobs, hasMore, loading} = this.state;
        return (
        <div>
            <InputSearch 
                handleChange={this.handleChange} 
                value={searchKeyword} 
            />
            <InfiniteScroll
                loadMore={this.prepareDataToFetchJobsList.bind(this)}
                hasMore={hasMore}
                loader={<div className="loader" key={0}> Loading... </div>}
            >
                {jobs.length === 0 && hasMore === false && !loading ? 
                    (
                        <div key='No more data found' className="people-list">
                            No data matched with this keyword, Please try again!
                        </div>
                    ) : 
                    <JobsList jobs={jobs} />
                }
            </InfiniteScroll>
        </div>
        )
    }
}