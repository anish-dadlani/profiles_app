import React, { Component } from "react";
import { data } from '../data/profiles';
const users = data;
class UserCards extends Component {
    state = {
        data: [],
        per: 6,
        isActive: '',
        filterValue: '',
        sortValue: '',
    };

    handleToggle = () => {
        this.setState({ isActive: !this.state.isActive });
    };

    handleFilter = (e) => {
        this.setState({ filterValue: e.target.value }, () => {
            const { filterValue, data } = this.state;
            let temp;
            temp = data.filter(search => search.office === filterValue);
            this.setState({
                data: [...data, ...temp],
                scrolling: false,
            });
        });
    }

    handleSort = (e) => {
        this.setState({ sortValue: e.target.value }, () => {
            const { sortValue, data } = this.state;
            let temp;
            if (sortValue === "name") {
                temp = data.sort((a, b) => a.name.first > b.name.first ? 1 : -1);
            } else if (sortValue === "office") {
                temp = data.sort((a, b) => a.office > b.office ? 1 : -1);
            }
            this.setState({
                data: [...data, ...temp],
                scrolling: false,
            });
        });
    }

    uppercase = word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    loadData = () => {
        const { data } = this.state;
        this.setState({
            data: [...data, ...users.results],
            scrolling: false,
        });
    };

    loadMore = () => {
        this.setState(
            prevState => ({
                per: prevState.per + 6,
                scrolling: true
            }),
        );
    };

    componentDidMount() {
        this.loadData();
    }

    render() {
        const isActive = this.state.isActive;
        return (
            <div className="clearfix">
                <div className="row mb-3">
                    <div className="col-lg-4">
                        <div className="form-group row">
                            <label className="col-sm-4">Sorting</label>
                            <div className="col-sm-8">
                                <select className="form-control" id="sort" name="sort"
                                    value={this.state.sortValue}
                                    onChange={this.handleSort}>
                                    <option value=''>Select</option>
                                    <option value='name'>Name</option>
                                    <option value='office'>Office</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="form-group row">
                            <label className="col-sm-4">Filter</label>
                            <div className="col-sm-8">
                                <input type="text" id="search" name="search" className="form-control" placeholder="Filter by name or office"
                                    value={this.state.filterValue}
                                    onChange={this.handleFilter}
                                />
                                {/* <select className="form-control" id="filter" name="filter"
                                    value={this.state.filterValue}
                                    onChange={this.handleFilter}>
                                    <option value=''>Select</option>
                                    <option value='name'>Name</option>
                                    <option value='office'>Office</option>
                                </select> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 text-right">
                        <button className="theme-btn" data-toggle="tooltip" title="Grid" onClick={this.handleToggle}><i class="fas fa-th-large"></i></button>
                    </div>
                </div>
                <div className="row">
                    {this.state.data.slice(0, this.state.per).map(data => (
                        <div className={isActive ? "col-lg-6 col-md-6 mb-4 animated fadeIn grid " : "col-md-4 mb-4 col-lg-4 animated fadeIn grid"} key={data.id}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="avatar">
                                        <img
                                            src={data.picture.large}
                                            className="card-img-top"
                                            alt="" />
                                    </div>
                                    <h5 className="card-title"> {
                                        this.uppercase(data.name.first)
                                        + " " +
                                        this.uppercase(data.name.last)
                                    }</h5>
                                    <span className="icons-span">
                                        <a href="https://www.linkedin.com" className=""><i className="fab fa-linkedin-in"></i></a>
                                        <a href="https://www.github.com" className=""><i className="fab fa-github"></i></a>
                                        <a href="https://www.twitter.com" className=""><i className="fab fa-twitter"></i></a>
                                    </span>
                                    <p className="card-text"> {this.uppercase(data.office)} </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="btn btn-light btn-block w-50 mx-auto"
                    onClick={e => { this.loadMore(); }} >
                    Load More
                </button>
            </div>
        );
    }
}

export default UserCards;