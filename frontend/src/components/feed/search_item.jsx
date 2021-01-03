import React from 'react';

class SearchItem extends React.Component {
    render() {
        let icon;

        if (this.props.type === 'dream') {
            icon = <i class="fas fa-cloud"></i>
        } else if (this.props.type === 'tag') {
            icon = <i class="fas fa-tag"></i>
        } else if (this.props.type === 'user') {
            icon = <i class="fas fa-user"></i>
        }
        return (
            <div>
                {icon}
                text
            </div>
        )
    }
}

export default SearchItem;