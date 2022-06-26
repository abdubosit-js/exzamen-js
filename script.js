const apiglobal = 'https://disease.sh/v3/covid-19/all'
const apiurl = 'https://disease.sh/v3/covid-19/countries'

async function fetchCovidGlobal(){
    try{
        const res = await fetch(apiglobal)
        const result = await res.json()
        renderGlobal(result);
    }catch(err){
        console.log(err);
    }
}

fetchCovidGlobal()

function renderGlobal(data){
    const container = document.querySelector('.container-1')
    const fragment = document.createDocumentFragment()
    
    const global = document.createElement('div')
    global.classList.add('global-flex')
    global.insertAdjacentHTML("beforeend",`
        <div class="total-casess">
            <div class="total">
                <p>Total Cases</p>
                <img src="rasimlar/Vector (13).svg" alt="">
            </div>
            <h1>${commafy(data.cases)}</h1>
            <p>last updated: ${data.updated}</p>
        </div>
        <div class="Total-Vaccinations">
            <div class="total">
                <p>Total Vaccinations</p>
                <img src="rasimlar/Subtract (2).svg" alt="">
            </div>
            <h1>${commafy(data.tests)}</h1>
            <p>last updated: ${data.updated}</p>
        </div>
        <div class="New-Cases">
            <div class="total">
                <p class="p-1">New Cases</p>
                <img src="rasimlar/Vector (14).svg" alt="">
            </div>
            <h1 class="h1-1">${commafy(data.todayCases)}</h1>
            <p class="p-2">last updated: ${data.updated}</p>
        </div>
        <div class="New-Cases">
            <div class="total">
                <p class="p-1">Active Cases</p>
                <img src="rasimlar/Vector (15).svg" alt="">
            </div>
            <h1 class="h1-1"> ${commafy(data.active)}</h1>
            <p class="p-2">last updated: ${data.updated}</p>
        </div>
    `)
    fragment.append(global)
    container.appendChild(fragment)
}
async function fetchCovid() {
    try{
        const resolv = await fetch(apiurl)
        const result = await resolv.json()
        renderCovid(result)
    }catch(err){
        console.log(err);
    }
}
fetchCovid()



function renderCovid(data) {
    console.log(data);
    const container = document.querySelector('.container-2')
    const fragment = document.createDocumentFragment()
    data.forEach(obj => {
        const div = document.createElement('div')
        div.classList.add('box')
        div.insertAdjacentHTML('afterbegin', `
        <div class="total-cnt">
            <p class="p-n">${obj.country}</p>
            <div class="header-flex">
                <div class="flag">
                    <img class="bay" src="${obj.countryInfo.flag}" alt="">
                </div>
                <div class="covid-total">
                    <b class="p-1">Total Cases</b>
                    <div class="covid-flex">
                        <img src="rasimlar/Vector (16).svg" alt="">
                        <h1 class="h4-1">${commafy(obj.cases)}</h1>
                    </div>
                </div>
            </div>
            <div class="footer-flex">
                <div class="Total-Vaccination">
                    <div class="st-cnt">
                        <img src="rasimlar/Subtract (3).svg" alt="">
                        <div class="title">
                            <p class="p-3">Total Vaccinations</p>
                            <h4 class="h4-2">${commafy(obj.tests)}</h4>
                        </div>
                    </div>
                    <div class="st-cnt">
                        <img src="rasimlar/Vector (14).svg" alt="">
                        <div class="title">
                            <p class="p-3">New Cases</p>
                            <h4 class="h4-2">${commafy(obj.todayCases)}</h4>
                        </div>
                    </div>
                </div>
                <div class="Total-Vaccination">
                    <div class="st-cnt">
                        <img src="rasimlar/Vector (15).svg" alt="">
                        <div class="title">
                            <p class="p-3">active cases</p>
                            <h4 class="h4-2">${commafy(obj.active)}</h4>
                        </div>
                    </div>
                    <div class="st-cnt">
                        <img src="rasimlar/Vector (17).svg" alt="">
                        <div class="title">
                            <p class="p-3">Total Deaths</p>
                            <h4 class="h4-2">${commafy(obj.todayDeaths)}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <p class="p-f">last updated: ${obj.updated}</p>
        </div>
        `)
        fragment.append(div)
    });
    container.appendChild(fragment)
}

function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}
