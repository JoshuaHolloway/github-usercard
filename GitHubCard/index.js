const { default: Axios } = require("axios");

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
    */
    (function _axios_() {
     // Axios.get('https://api.github.com/users/a')
     Axios.get('https://swapi.dev/api/people/1')
     .then(data => {
      //  console.log('axios data received: ', data.data);
      })
      .catch(err => {
        debugger;
      });
    });
    
    function _fetch_(username) {
      fetch(`https://api.github.com/users/${username}`)
      // fetch('https://swapi.dev/api/people/1')
      .then(partOfTheResponse => {
        // fetch is sooo eager to give sth quick,
        // it resolves some data before the body is in
        return partOfTheResponse.json() // this operation ALSO returns a promise
      })
      .then(jsonStuff => {
        // console.log('fetch json-data received: ', jsonStuff);
        
        // STEP 4: Pass the data received from Github into your function,
        //         and append the returned markup to the DOM as a child of .cards
        compMaker(jsonStuff);
      })
      .catch(err => {
        debugger;
      });
    };

    /*
      STEP 5: Now that you have your own card getting added to the DOM, either
        follow this link in your browser https://api.github.com/users/<Your github name>/followers,
        manually find some other users' github handles, or use the list found at the
        bottom of the page. Get at least 5 different Github usernames and add them as
        Individual strings to the friendsArray below.
    
        Using that array, iterate over it, requesting data for each user, creating a new card for each
        user, and adding that card to the DOM.
    */
    
    const followersArray = [
      'dionne-stratton',
      'joshuaholloway',
      'leachtucker',
      'oliviaChen2020',
      'rhea-manuel',
      'simonesquad',
      'sleepylazarus',
      'sophiethedeveloper',
    ];

    const cards = document.querySelector('.cards');
    followersArray.forEach((elem) => {
      _fetch_(elem);
      // cards.appendChild(document.createElement('p'));    
    });
    console.log(cards);

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

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

function compMaker(obj) {
  const ce = x => document.createElement(x);
  const qs = x => document.querySelector(x);
  const pr = x => console.log(x);
  const ac = (x, _class_) => x.classList.add(_class_);

    // <div class="card">
    //   <img src={image url of user} />
    //   <div class="card-info">
    //     <h3 class="name">{users name}</h3>
    //     <p class="username">{users user name}</p>
    //     <p>Location: {users location}</p>
    //     <p>Profile:
    //       <a href={address to users github page}>{address to users github page}</a>
    //     </p>
    //     <p>Followers: {users followers count}</p>
    //     <p>Following: {users following count}</p>
    //     <p>Bio: {users bio}</p>
    //   </div>
    // </div>
    const div_card = ce('div');
    ac(div_card, 'card');
    
    const img = ce('img');
    img.setAttribute('src', obj.avatar_url);
    
    //   <div class="card-info">
    const div_card_info = ce('div');
    ac(div_card_info, 'card-info');
    
    //     <h3 class="name">{users name}</h3>
    const h3_name = ce('h3');
    ac(h3_name, 'name');
    h3_name.textContent = obj.name;   

    //     <p class="username">{users user name}</p>
    const p_username = ce('p');
    ac(p_username, 'username');
    p_username.textContent = obj.login;

    //     <p>Location: {users location}</p>
    const p_location = ce('p');
    p_location.textContent = `Location: ${obj.location}`;

    //     <p>Profile:
    const p_profile = ce('p');
    p_profile.textContent = 'Profile: ';

    //       <a href={address to users github page}>{address to users github page}</a>
    const a_tag = ce('a');
    a_tag.setAttribute('href', obj.html_url);
    a_tag.textContent = obj.html_url;
    //     </p>

    //     <p>Followers: {users followers count}</p>
    const p_followers = ce('p');
    p_followers.textContent = `Followers: ${obj.followers}`;

      //     <p>Following: {users following count}</p>
    const p_following = ce('p');
    p_following.textContent = `Following: ${obj.following}`;

    //     <p>Bio: {users bio}</p>
    const p_bio = ce('p');
    p_bio.textContent = `Bio: ${obj.bio}`;

    // <div class="card">
    //   <img src={image url of user} />
    //   <div class="card-info">
    //     <h3 class="name">{users name}</h3>
    //     <p class="username">{users user name}</p>
    //     <p>Location: {users location}</p>
    //     <p>Profile:
    //       <a href={address to users github page}>{address to users github page}</a>
    //     </p>
    //     <p>Followers: {users followers count}</p>
    //     <p>Following: {users following count}</p>
    //     <p>Bio: {users bio}</p>
    //   </div>
    // </div>  
    
    div_card_info.appendChild(h3_name);
    div_card_info.appendChild(p_username);
    div_card_info.appendChild(p_location);
    p_profile.    appendChild(a_tag);
    div_card_info.appendChild(p_profile);
    div_card_info.appendChild(p_followers);
    div_card_info.appendChild(p_following);
    div_card_info.appendChild(p_bio);   
    div_card.     appendChild(img);
    div_card.     appendChild(div_card_info);
    

    const expand_button = document.createElement('div');
    expand_button.style.width = '100px';
    expand_button.style.height = '100px';
    expand_button.style.backgroundColor = 'red';
    
        expand_button.style.transition = '0.8s ease';
        div_card.style.transition = '0.8s ease';

    div_card.appendChild(expand_button);

    let bool = false;
    expand_button.addEventListener('click', () => {

      if (bool === false) {
        expand_button.style.height = '500px';
        div_card.style.height = '600px';
      } else {
        expand_button.style.height = '100px';
        div_card.style.height = '200px';
      }
      bool = !bool;


    });

    const cards = qs('.cards');
    //pr(div_card);
    cards.appendChild(div_card);
};