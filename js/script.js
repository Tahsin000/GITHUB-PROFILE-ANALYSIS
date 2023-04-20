
const errorNotice = document.getElementById('errorNotice');
const handleSearch = (event)=>{
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

    const div = document.createElement('div');
    div.classList.add("card", "lg:card-side", "bg-base-300", "shadow-xl");
    div.innerHTML = `
    <figure><img src=${profile.avatar_url} alt="Album"/></figure>
    <div class="card-body">
      <h2 class="card-title">${profile.name}</h2>
      <p>${profile.bio}</p>
      <p>🗺️<span>${profile.location}</span></p>
      <p>📅<span>${profile.created_at}</span></p>
      <div class="card-actions justify-end">
        <a href=${profile.url} class="btn btn-primary">Visite now</a>
      </div>
    </div>
    `
    ProfileInfo.appendChild(div);
}