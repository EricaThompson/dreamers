import React from 'react';
import { Link } from 'react-router-dom';

class SearchItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpenModal = this.handleOpenModal.bind(this);
    }

    handleOpenModal(e) {
        this.props.clearComments();
        this.props.clearSearch();
        this.props.fetchCommentsByDream(this.props.dream._id);
        this.props.openModal('commentDream');
        this.props.modalInfo(this.props.dream);
    }

    render() {
        // console.log('search-item-props', this.props)

        let icon;
        let refer;

        if (this.props.type === 'dream') {
            icon = <i class="fas fa-cloud search-icon"></i>
            refer = ""
        } else if (this.props.type === 'tag') {
            icon = <i class="fas fa-tag search-icon"></i>
            refer = `/tags/${this.props.dream.name}`
        } else if (this.props.type === 'users') {
            icon = <i class="fas fa-user search-icon"></i>
            refer = `/users/${this.props.dream._id}`
        }

        let item;

        if (this.props.type === 'dream') {
            item = <div onClick={this.handleOpenModal} >
                <div className="search-results-inner-container" >
                    {icon}
                    {this.props.text}
                </div>
            </div>
        } else {
            item = <Link to={refer} style={{ textDecoration: 'none' }} >
                <div className="search-results-inner-container" >
                    {icon}
                    {this.props.text}
                </div>
            </Link>
        }

        return (
            <div>
                {item}
            </div>
        )
    }
}

export default SearchItem;