# DREAMERS

DREAMERS is a social dream and goals journal that allows dreamers to connect based on dreams they had the night before or goals they want to create in the future. Our goal was to create a very feature-rich, intuitive experience for our users to share and collaborate in a new way.

A live link to the site hosted on Heroku is here: [DREAMERS](https://the-dreamers-app.herokuapp.com/#/)

<p align="center" width="107">
  <img src="https://campsound-dev.s3-us-west-1.amazonaws.com/dreamers+images/Screen+Shot+2021-01-03+at+10.06.39+PM.png" alt="splash page" />
</p>

## Instructions
To run this application, after cloning the repository, run `npm install` in both the root and `frontend` directories. Next, run  `npm run dev` in the root directory to run the backend and frontend servers concurrently. The application should load in the browser automatically and ff it doesn't, navigate to `localhost:3000` in your web browser.


## Technologies
### Frontend
The frontend of our application is a mobile-first, fully responsive to all viewports.
- React.js library.
- SASS to compile and import our CSS.

### Backend
- Node.js for server management and npm for module-management
- MongoDB for data storage
- Validator for text validations
- Mongoose for DB querying
- Express for routing
- jwt and Passport-jwt for authentication token generation and management
- bCrypt for password salting

### Frontend
One of the exciting features of the DREAMERS app is the search functionality. In a single search bar, a user can search through dreams, goals, users, and tags. Each search item opens the correct item, whether it be a modal, or a tag thread. In addition to the main search feature, there is also a tag search feature. When building a new dream or goal, a user can wade through existing tags to connect their dreams with other users. This functionality is also tied into a create tag feature, so if a user does not find a tag that is to their liking, they can make a new one!

```js
let search;

if (Object.values(searchResults).length > 0 && !this.props.isModalOpen) {

    search = <div className="search-results-outer-container" >
        { Object.values( searchResults.dreams ).map(( result, idx ) => {
            return <SearchItem 
                      key = { idx } 
                      dream = { result } 
                      type = { "dream" } 
                      text = { result.text } 
                      clearComments = { clearComments } 
                      fetchCommentsByDream = { fetchCommentsByDream } 
                      openModal = { openModal } 
                      modalInfo = { modalInfo } 
                      clearSearch = { clearSearc h} 
                    />
        })}

        { Object.values( searchResults.tags ).map(( result, idx ) => {
            return <SearchItem 
                      key = { idx } 
                      dream = { result } 
                      type = { "tag" } 
                      text = { result.name } 
                    />
        })}
        
        {Object.values( searchResults.users ).map(( result, idx ) => {
            return <SearchItem 
                      key = { idx } 
                      dream = { result } 
                      type = { "users" } 
                      text ={ result.username } 
                    />
        })}
    </div>
}
```

<p align="center">
  <img src="https://campsound-dev.s3-us-west-1.amazonaws.com/dreamers+images/Search+Screenshot.png" alt="search feature" />
</p>

The CRUD features of DREAMERS (dreams, tags, comments) are done through modals. Modals give the site a clean and modern look. Below, the new dream feature is pictured. We decided to tie the new dream and edit dream modals together, conditionally rendering both of them depending on the modalInfo slice of state; if there is information in that slice, the modal knows there is a dream that needs to be edited and if not, it is a new dream.

<p align="center">
  <img src="https://campsound-dev.s3-us-west-1.amazonaws.com/dreamers+images/Modal+Screenshot.png" alt="modal" />
</p>

### Backend 
When we first thought about the search process, we had a pretty clear idea of making it simple, returning data that was sorted by type and recency. During the actual programming of search, we ran into the issue of managing multiple concurrent backend queries. We previously had chained together queries via promise callbacks but we realized that we would lose the original search request values (search params, user info provided by jwt). We played around with `await` but eventually landed on `Promise.all(queries)`, which was way cleaner and pretty scalable to include any future additions, like relevancy. We also used the $regex mongodb operator to perform partial searches.

```js
  const queries = []
  
  queries.push( Tag.find({ 
    name: { 
      $regex: new RegExp( req.params.searchParam ) } 
  })
    .sort({ lastUsed: -1 })
    .exec()
  )
​
  queries.push( User.find({ 
    username: { 
      $regex: new RegExp( req.params.searchParam ) } 
  })
    .exec()
  )
​
  queries.push( Dream.find({ 
    text: { 
      $regex: new RegExp( req.params.searchParam ) } 
  })
    .sort({ date: -1 })
    .exec()
  )
  
  Promise.all(queries).then(results => res.json(results));
```

The original plan for a simple function had simple, clean, and scalable implementation. We definitely have a greater appreciation for mongo, mongoose, and their flexibility and a better understanding of how Promises work.

Implementing the follow system required a bit of engineering for efficiency. The two main decision to be made were how to store new follows and how to access a user's followed and following user lists. To resolve the first problem, we recognized that a new collection would be unnecessary if we embedded followers into the User models. We made this decision because:
1. embedding would reduce the number of queries and joins to feed the frontend the right information to enable the follow functionality.
2. each follower would only require a userId for our current needs (eventually, we will also need a username and maybe a user profile url) and any current/future implementations would be relatively small with regard to data and structurally simple
3. any routes made would already have user information preloaded into state, whether local or redux, further reducing the need for more queries.
We split follows into followers + following to reduce the number of queries and to better suit other backend needs for this information (like a future feature of a feed of dreams filtered by followers and/or following). The creation and deletion process was simply to insert the current user's id into the followed user's followers array and vice versa but with the followed array:

```javascript
router.post('/follow/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const queries = []
​
    var queryParams1 = { _id: req.params.userId },
        update1 = { $addToSet: { followers: req.user.id }},
        options = { new: true }
    queries.push(User.findOneAndUpdate(queryParams1, update1, options).exec())
​
    var queryParams2 = { _id: req.user.id },
        update2 = { $addToSet: { followed: req.params.userId }}
    queries.push(User.findOneAndUpdate(queryParams2, update2, options).exec())
​
    Promise.all(queries).then(results => res.json(results));
  }
)
```


To-dos and future features:
- An index route to return Dreams from only followed and/or follower users
- AWS S3 image hosting for profile/cover pictures
- Privacy levels for users and dreams to restrict dream visibility
- Consolidated search by relevancy
