document.addEventListener("click",(e)=>{
    if(e.target.matches(".search-pkm")){
        fetchPokemon();
    }
})

const d = document,
      $pkmNameInput = d.getElementById("pokeName"),
      $pkmName = d.getElementById("pkm-name"),
      $pkmType = d.getElementById("pkm-type"),
      $pkmStats = d.getElementById("pkm-stats"),
      $pkmMovements = d.getElementById("pkm-movements"),
      $pkmImg = document.getElementById("pokeImg");

const fetchPokemon = ()=>{
    refreshInfo();

    let pokeName = $pkmNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res)=>{
        if(res.status!=200){
            $pkmImg.src = "sorry_pokeball.png";
        }
        else{
            return res.json();
        }
    }).then((data)=>{
        if (data) {
            let pkmImg = data.sprites.front_default,
                pkmName = data.species.name,
                pkmTypes = data.types,
                pkmStats = data.stats,
                pkmMovements = data.moves;
            insertPkmImg($pkmImg,pkmImg);
            insertPkmName($pkmName,pkmName);
            
            insertMultiplePkmInfo($pkmType,pkmTypes,"types");
            insertMultiplePkmInfo($pkmStats,pkmStats,"stats");
            insertMultiplePkmInfo($pkmMovements,pkmMovements,"movements");
        }
    })
}

const insertPkmImg = (pokeImg,url) =>{
    pokeImg.src = url;
}

const insertPkmName = (pokeName,name) =>{
    pokeName.textContent = name;
}

const insertMultiplePkmInfo = (pokeType,Types,infoToInsert) =>{
    const $fragment = d.createDocumentFragment(),
          $list = d.createElement("ul");
    Types.forEach(Type => {
        const item = d.createElement("li");
        if(infoToInsert === "types"){
            item.textContent = Type.type.name;
        }
        else if(infoToInsert === "stats"){
            item.textContent = `${Type.stat.name} ${Type.base_stat}`;
        }
        else if(infoToInsert === "movements"){
            item.textContent = `${Type.move.name}`;
        }
        $fragment.appendChild(item);
        

    });
    pokeType.appendChild($fragment);
}

const refreshInfo = ()=>{
    $pkmType.innerHTML = "";
    $pkmStats.innerHTML = "";
    $pkmMovements.innerHTML = "";
}