import React from 'react';
import InfiniteScroll from "react-infinite-scroller";
import { PostData } from '../../api';
import { InputSearch, PeopleList } from '../../containers';
import { debounce } from '../../helper';
import './people.css';

const PEOPLE_LIST_URL = '/people/_search/';

export class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            searchKeyword: "",
            people: [],
            offset: 0,
            size: 10,
            hasMore: true
        }
    }

    prepareDataToFetchPeopleList(resetState) {
        if(this.state.loading) {
            return;
        }
        if(resetState === true) { 
            this.setState({
                people: [],
                offset: 0,
                hasMore: true
            }, this.setPeopleList);
        } else {
            this.setPeopleList();
        }
    }

    setPeopleList() {
        this.setState({loading: true});
        const {offset, size, searchKeyword} = this.state;
        const params = new URLSearchParams({
            offset,
            size
        });
        const peopleListUrlWithQuery = `${PEOPLE_LIST_URL}?${params.toString()}`;
        const payload = searchKeyword ? {
            name: {
                term: searchKeyword
            }
        } : null;

        PostData(peopleListUrlWithQuery, payload)
        .then(result => {
            const stateToUpdate = {};
            stateToUpdate.people = [...this.state.people, ...result.results];
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
        this.prepareDataToFetchPeopleList(true)
    }, 300);

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        this.searchPeople(this);
    };     

    render() {
        const {searchKeyword, people, hasMore, loading} = this.state;
        return (
        <div>
            <InputSearch 
                handleChange={this.handleChange} 
                value={searchKeyword} 
            />
            <InfiniteScroll
                loadMore={this.prepareDataToFetchPeopleList.bind(this)}
                hasMore={hasMore}
                loader={<div className="loader" key={0}> Loading... </div>}
            >
                {people.length === 0 && hasMore === false && !loading ? 
                    (
                        <div className="people-list">
                            No data matched with this keyword, Please try again!
                        </div>
                    ) : 
                    <PeopleList people={people} />
                }
            </InfiniteScroll>
        </div>
        )
    }
}