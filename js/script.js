
const errorNotice = document.getElementById('errorNotice');

const handleKeypressEnter = (event)=>{
    if(event.keyCode === 13){
        console.log('text is Done')
        handleSearch();
    }
}

const handleSearch = ()=>{
    const search = document.getElementById('search').value;   
    pathName = pathNameFind(search);
    console.log(pathName);
    (pathName === '404') ? errorNotice.classList.remove('hidden') : dataFetch(pathName);
}
const pathNameFind = (search)=>{
    chack = search.includes("/")
    let pathName = search;
    if (chack){
        const pathNameCheker = search.split("/");
        pathName = pathNameCheker[pathNameCheker.length-1];
        if (pathNameCheker.length !== 4) pathName = '404'
    }
    return pathName;
}

const dataFetch = (pathName) =>{
    errorNotice.classList.add('hidden');
    const url = `https://api.github.com/users/${pathName}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayProfile(data));
}



const displayProfile = (profile)=>{
    const ProfileInfo = document.getElementById('ProfileInfo');
    ProfileInfo.innerHTML ='';
    ProfileInfo.classList.remove("hidden");
    ProfileInfo.classList.add("h-[auto]", "flex", "flex-col" , "items-center");
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="grid md:grid-cols-2 gap-3 items-end p-5 my-[10rem] ">
        <div data-aos="fade-up" data-aos-duration="500" class="flex flex-col justify-center items-center">
            <div class="bg-white w-full card rounded-[1rem] bg-gray-300 flex flex-col justify-center items-center">
                <div class="text-[#000000] relative top-[-6rem] flex flex-col justify-center items-center p-5">
                    <img class=" drop-shadow-xl w-[13rem] rounded-full" src=${profile.avatar_url} alt="">
                    <p class="md:text-lg text-2lg font-light text-center mt-5">${profile.login}</p>
                    <p class="md:text-2xl text-xl font-bold text-center mt-3">${profile.name?profile.name:profile.login} </p>
                    <p class="md:text-md text-md text-center mt-1">${profile.bio=== "null" ? profile.bio: "bio is empty" }</p>
                    <div class="grid grid-cols-2 gap-4 mt-2">
                        <p class="flex flex-wrap gap-2">
                            <img src="./icons/followers.svg" alt=""> 
                            ${profile.followers} followers
                        </p>
                        <p class="flex flex-wrap gap-2">
                            <img src="./icons/followers.svg" alt=""> 
                            ${profile.following} followers
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-2 mt-4 justify-center text-center">
                        <img src="./icons/location.svg" alt="">
                        <span class="text-lg">${profile.location ? profile.location : "Location is empty"}</span>
                    </div>

                    <div class="flex justify-center">
                        <div class="md:flex flex-wrap gap-5 mt-4">
                            <p class="flex flex-wrap gap-2 justify-center">
                                <img src="./icons/new-account.svg" alt=""> Create:&#9
                                <span class="font-semibold">${dataFormatter(profile.created_at)} </span> 
                            </p>
                            <p class="flex flex-wrap gap-2 justify-center">
                                <img src="./icons/update.svg" alt="">Update:&#9
                                <span class="font-semibold">${dataFormatter(profile.updated_at)}</span> 
                            </p>
                        </div>
                    </div>

                    <a href=${profile.html_url} target="_blank" class="btn btn-primary mt-5">Follow</a>


                </div>
            </div>
        </div>
        
        <div data-aos="fade-up" data-aos-duration="500" class="md:h-full max-md:w-full bg-white rounded-[1rem] md:row-span-2">
            <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.login}&langs_count=8" class=" w-full rounded-[1rem]" >
            <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.login}&layout=compact" class=" w-full " >
           
        </div>

        <div data-aos="fade-up" data-aos-duration="500" class="md:h-full w-full bg-white rounded-[1rem] ">
            <img src="https://github-readme-stats.vercel.app/api?username=${profile.login}&show_icons=true" class=" w-full " >
        </div>

        <div data-aos="fade-up" data-aos-duration="500" class="max-md:h-full w-full bg-white rounded-[1rem] md:col-span-2 flex justify-center">
            <img src="https://github-readme-streak-stats.herokuapp.com/?user=${profile.login}&hide_border=true" >
        </div>

        <div data-aos="fade-up" data-aos-duration="500" class="max-md:h-full w-full bg-white rounded-[1rem] md:col-span-2 flex justify-center">
            
            <span class="flex justify-center block w-full"> 
                <img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${profile. login}" class="w-full rounded-[1rem]" >
            </span>
            
            <span class="block w-full"> 
                <img src="https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=${profile.login}" class="block w-full " >
            </span>
        </div>

        <div class="flex flex-wrap gap-3 md:col-span-2">
            <div className="">
                <h3 class=" text-center text-3xl font-light my-[1rem] text-[#fff]">${profile.followers?"Followers":""}</h3>
                <div className="" id='followerId'></div>
            </div>

            <div className="">
                <h3 class="text-center text-3xl font-light my-[1rem] text-[#fff]">${profile.following?"Following":""}</h3>
                <div className="" id='following_id'></div>
            </div>
        </div>
       
    </div>
    `

    ProfileInfo.appendChild(div);
    followerDataFetch(profile.followers_url);
    followingDataFetch(`https://api.github.com/users/${profile.login}/following`)
}


const followingDataFetch = (info) =>{
    fetch(info)
    .then(res=> res.json())
    .then(following => displayFollowing(following))
} 

const displayFollowing = (followings)=>{

    const followingId = document.getElementById('following_id');
    const followingsCreate = document.createElement('div');
    followingsCreate.classList.add("grid", "gap-2");

    console.log(followings)

    followings.map(following=> {
        const followingCreate = document.createElement('div');
        followingCreate.classList.add("bg-white", "w-full", "rounded-[1rem]", "flex", "justify-between", "items-center", "p-4", "my-1");
        followingCreate.setAttribute("data-aos", "fade-up");
        followingCreate.setAttribute("data-aos-duration", "300");
        followingCreate.innerHTML =  `
        <div class="md:flex items-center justify-between" >
            <img class="rounded-full w-[5rem]" src=${following.avatar_url} alt=""/>
            <div class="ml-5">
                <h2> <span class="text-[1.25rem] font-bold text-[#21262d]">${following.name || following.login} &#9;</span><span class="text-[#545d6a] text-[0.5]">${following.login}</span> </h2>
                <div class="flex flex-wrap gap-2 mt-2">
                    <img src="./icons/location.svg" alt=""/>
                    <span class="text-[0.85] font-light text-[#545d6a]">${following.id}</span>
                </div>
            </div>
        </div>
        <a href=${following.html_url} target="_blank" class="btn btn-primary" >Follow</a>
        `
        followingsCreate.appendChild(followingCreate);
    });

    followingId.appendChild(followingsCreate);
    // https://api.github.com/users/Tahsin000/following
}

// ========================================

const followerDataFetch = (info) =>{
    fetch(info)
    .then(res=> res.json())
    .then(followers => displayFollower(followers))
} 

const displayFollower = (followers)=>{
    const followersId = document.getElementById('followerId');
    const followersCreate = document.createElement('div');
    followersCreate.classList.add("grid", "gap-2");

    followers.map(follower=> {
        const followerCreate = document.createElement('div');
        followerCreate.classList.add("bg-white", "w-full", "rounded-[1rem]", "flex", "justify-between", "items-center", "p-4", "my-1");
        followerCreate.setAttribute("data-aos", "fade-up");
        followerCreate.setAttribute("data-aos-duration", "300");
        followerCreate.innerHTML =  `
        <div class="md:flex items-center justify-between" >
            <img class="rounded-full w-[5rem]" src=${follower.avatar_url} alt=""/>
            <div class="ml-5">
                <h2> <span class="text-[1.25rem] font-bold text-[#21262d]">${follower.name || follower.login} &#9;</span><span class="text-[#545d6a] text-[0.5]">${follower.login}</span> </h2>
                <div class="flex flex-wrap gap-2 mt-2">
                    <img src="./icons/location.svg" alt=""/>
                    <span class="text-[0.85] font-light text-[#545d6a]">${follower.id}</span>
                </div>
            </div>
        </div>
        <a href=${follower.html_url} target="_blank" class="btn btn-primary" >Follow</a>
        `
        followersCreate.appendChild(followerCreate);
    });

    followersId.appendChild(followersCreate);
}

const followersLocationFatchData = (Locationinfo)=>{
    fetch(Locationinfo)
    .then(res => res.json())
    .then(data => console.log(data));
}

const dataFormatter = (dateData) =>{
    const dateStr = dateData;
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    // console.log(formattedDate); // Output: "19 Jan 2020"
    return formattedDate;
}