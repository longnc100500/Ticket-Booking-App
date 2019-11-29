const rootURL='https://api.themoviedb.org/3/movie/now_playing?api_key=b5d5cdc41bceae3132ead55454bde93c&language=en-US&page=1';
exports.search=function()
{
  return fetch(rootURL)
  .then((res)=>res.json())
  .then((json)=>{
    return json.Search;
  });
}
const filmURL='https://api.themoviedb.org/3/movie/501170?api_key=b5d5cdc41bceae3132ead55454bde93c&language=en-US';
exports.view=function(id){
  let detailsURL=`https://api.themoviedb.org/3/movie/${id}?api_key=b5d5cdc41bceae3132ead55454bde93c&language=en-US`;
  return fetch(detailsURL)
  .then((res)=>res.json())

}
