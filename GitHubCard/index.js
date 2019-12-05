/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
           /* Step 2: Inspect and study the data coming back, this is YOUR 
           github info! You will need to understand the structure of this 
           data in order to use it to build your component function 
           
           Skip to Step 3.
           */

/* Step 4: Pass the data received from Github into your function, 
create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
follow this link in your browser https://api.github.com/users/<Your github name>/followers 
, manually find some other users' github handles, or use the list found 
at the bottom of the page. Get at least 5 different Github usernames and add them as
Individual strings to the friendsArray below.
 
Using that array, iterate over it, requesting data for each user, creating a new card for each
user, and adding that card to the DOM.
*/

// 
let followersArray = []

/* Step 3: Create a function that accepts a single object as its only argument,
Using DOM methods and properties, create a component that will return the following DOM element:
 
<div class="card">
<img src={image url of user} />
<div class="card-info">
<h3 class="name">{users name}</h3>
<p class="username">{users user name}</p>
<p>Location: {users location}</p>
<p>Profile:  
<a href={address to users github page}>{address to users github page}</a>
</p>
<p>Followers: {users followers count}</p>
<p>Following: {users following count}</p>
<p>Bio: {users bio}</p>
</div>
</div>

*/
function userCard(data) {

  console.log(data)
  // Creating Elements
  const newCard = document.createElement('div'),
    newImage = document.createElement('img'),
    newInfo = document.createElement('div'),
    newName = document.createElement('h3'),
    newUserName = document.createElement('p'),
    location = document.createElement('p'),
    profile = document.createElement('p'),
    profileLink = document.createElement('a'),
    followers = document.createElement('p'),
    following = document.createElement('p'),
    bio = document.createElement('p');


  // Assigning Classes 
  newCard.classList.add('card');
  newInfo.classList.add('card-info');
  newName.classList.add('name');
  newUserName.classList.add('username');


  // Appending Elements
  newCard.appendChild(newImage);
  newCard.appendChild(newInfo);
  newInfo.appendChild(newName);
  newInfo.appendChild(newUserName);
  newInfo.appendChild(location);
  newInfo.appendChild(profile);
  profile.appendChild(profileLink);
  newInfo.appendChild(followers);
  newInfo.appendChild(following);
  newInfo.appendChild(bio);

  // Assign content
  newImage.setAttribute('src', data.avatar_url);
  profileLink.setAttribute('href', data.html_url);
  profileLink.textContent = `${data.name}'s GitHub page`;
  newName.textContent = `${data.name}`;
  newUserName.textContent = `${data.login}`;
  location.textContent = `${data.location}`;
  followers.textContent = `Followers: ${data.followers}`;
  following.textContent = `Following: ${data.following}`;
  bio.textContent = `${data.bio}`;


  console.log(newCard)

  // return newCard
  document.querySelector('.cards').appendChild(newCard)

}


axios.get('https://api.github.com/users/WindTalker22')
  .then(response => {
    userCard(response.data)
  })
  .catch(err => {
    console.log("Error:", err);
  })

axios.get('https://api.github.com/users/WindTalker22/followers')
  .then(response => {

    response.data.forEach(item => {
      axios.get(item.url)
        .then(response => {
          userCard(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    })
  })
  .catch(err => {
    console.log("Error:", err);
  })
