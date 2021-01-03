// import React from 'react';
// import { Link } from 'react-router-dom';

// class GoalItem extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             tags: this.props.tags,
//             showMenu: false,
//         }
//         this.handleOpenModal = this.handleOpenModal.bind(this);
//         this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
//     }

//     toggleEdit() {
//         this.setState({ showEditForm: !this.state.showEditForm })
//     }

//     toggleMenu() {
//         this.setState({ showMenu: !this.state.showMenu })
//     }

//     closeMenu() {
//         this.setState({ showMenu: false })
//     }

//     handleOpenModal(e) {
//         this.props.clearComments();
//         this.props.fetchCommentsByDream(this.props.dream._id);
//         this.props.openModal('commentGoal');
//         this.props.modalInfo(this.props.dream);
//     }

//     handleOpenEditModal(e) {
//         this.props.openModal('newDream');
//         this.props.modalInfo(this.props.dream);
//     }

//     render() {
//         let { dream, currentUser } = this.props;
//         let tags;

//         if (this.state.tags){
//             tags = 
//                 this.state.tags.map((tag, idx) => {
//                     if (tag != null){
//                         return (
//                             <Link to={`/tags/${tag}`} key={idx} style={{ textDecoration: 'none' }} >

//                                 <div className="new-dream-tags-item-container" onClick={e => e.stopPropagation()} >
//                                     <div className="new-dream-tags-item-circle" ></div>
//                                     <p className="new-dream-tags-item" >{tag}</p>
//                                 </div>
//                             </Link>
//                         )
//                     }
                    
//                 })
//         } else {
//             tags = null
//         }

//         let followIcon;
//         let editIcon;
//         let deleteIcon;
//         let flagIcon;
//         let menuOptions;
//         let optionsIcon;

//         if (dream.username === currentUser.username) {
//             editIcon = <div
//                 className="icon"
//                 onClick={this.handleOpenEditModal}
//             >
//                 <i className="fas fa-pencil-alt"></i>
//             </div>
//             deleteIcon = <div
//                 className='icon'
//                 onClick={() => this.deleteComment()}
//             >
//                 <i className="fas fa-trash-alt"></i>
//             </div>
//         } else {
//             //!if (!comment.author.followers.includes(currentUser))
//             followIcon = <div className="icon">
//                 <i className="fas fa-user-plus"></i>
//             </div>
//             flagIcon = <div className="icon">
//                 <i className="fas fa-flag"></i>
//             </div>
//         }

//         if (this.state.showMenu) {
//             optionsIcon = <p onClick={() => this.toggleMenu()}>✕</p>
//             menuOptions = <div className='available-options'>
//                 {editIcon}
//                 {deleteIcon}
//                 {followIcon}
//                 {/* maybe links to a contact form with their username?*/}
//                 {flagIcon}
//             </div>
//         } else {
//             optionsIcon = <i
//                 className="fas fa-ellipsis-h"
//                 onClick={() => this.toggleMenu()}>
//             </i>
//         }


//         return (
//             <div className="feed-goals-wrapper" >
//                 <div className="comment-options" onClick={()=>this.toggleMenu()} >
//                     {optionsIcon}
//                     {menuOptions}
//                 </div>
//                 <div className="feed-goals" onClick={this.handleOpenModal} >
//                     {/* <Link to={`/dreams/${dream._id}`} style={{ textDecoration: 'none' }} > */}
//                         <div className="new-dream-tags-container" >
//                             <div className="new-dream-tags" >
//                                 {tags}
//                             </div>
//                         </div>
//                         <p className="feed-goals-info" >
//                             <Link to={`/users/${dream.userId}`} className="feed-goals-info-link" style={{ textDecoration: 'none' }}>
//                                 {dream.username}
//                             </Link>
//                         </p>
//                         <p className="feed-goals-info" >{dream.text}</p>
//                     {/* </Link> */}
//                     <div className="feed-goals-footer" >
//                         <p className="feed-goals-footer-info" >3 <span className="feed-goals-footer-comments" >comments</span></p>
//                         <p className="feed-goals-footer-info" >3 <span className="feed-goals-footer-likes" >likes</span></p>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }


// export default GoalItem;