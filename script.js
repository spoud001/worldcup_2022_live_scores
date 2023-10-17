async function Live_Scores( filterFunction,  params) {
    let url = new URL("https://api-football-v1.p.rapidapi.com/v3/fixtures");
    let searchParams = new URLSearchParams();
    searchParams.set( "league", "1" );
    searchParams.set('live', 'all')
    url.search = searchParams;
    const myHeaders = new Headers();
    const  results = new Array();
    myHeaders.append('X-RapidAPI-Key', 'fb8638417dmsh22b5d018a2876b4p181befjsnf7559d2a013c');
    myHeaders.append('X-RapidAPI-Host', "api-football-v1.p.rapidapi.com");
    const response = await fetch( url.toString(), {
            method: 'GET',
            headers: myHeaders,
    }).then( (response) => { 
            if ( response.ok ) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
          })
      .then((json) => {
        let rs = filterFunction( params, json );
        results.push(...rs);
     });
    return results;
  }
  
  async function Prev_Scores( filterFunction,  params) {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    let url = new URL("https://api-football-v1.p.rapidapi.com/v3/fixtures");
    let searchParams = new URLSearchParams();
    searchParams.set('league', '1')
    searchParams.set('season', '2022')
    searchParams.set('from' , '2022-11-20')
    searchParams.set('to', `${currentDate}`)
    url.search = searchParams;
    const myHeaders = new Headers();
    const results = new Array();
    myHeaders.append('X-RapidAPI-Key', 'fb8638417dmsh22b5d018a2876b4p181befjsnf7559d2a013c');
    myHeaders.append('X-RapidAPI-Host', "api-football-v1.p.rapidapi.com");
    const response = await fetch( url.toString(), {
            method: 'GET',
            headers: myHeaders,
    }).then( (response) => { 
            if ( response.ok ) {
                 return response.json();
            } else {
                throw Error(response.statusText);
            }
          })
      .then((json) => {
        let rs = filterFunction( params, json );
        results.push(...rs);
     });
    return results;
  }
  async function fixture_stats( filterFunction,  params , id) {
    let url = new URL("https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics");
    let searchParams = new URLSearchParams();
    searchParams.set('fixture', `${id}`)
    url.search = searchParams;
    const myHeaders = new Headers();
    const  results = new Array();
    myHeaders.append('X-RapidAPI-Key', 'fb8638417dmsh22b5d018a2876b4p181befjsnf7559d2a013c');
    myHeaders.append('X-RapidAPI-Host', "api-football-v1.p.rapidapi.com");
    const response = await fetch( url.toString(), {
            method: 'GET',
            headers: myHeaders,
    }).then( (response) => { 
            if ( response.ok ) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
          })
      .then((json) => {
        let rs = filterFunction( params, json );
        results.push(...rs);
     });
    return results;
  }
  export{ Live_Scores, Prev_Scores, fixture_stats}