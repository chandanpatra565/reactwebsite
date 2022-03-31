
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import MovieComponent from './component/MovieComponent';
import MovieInfoComponent from './component/movieinfocomponent';
export const API_KEY = "688ef296";


const Contanir = styled.div`
    display : flex;
    flex-direction : column;
    background-color:#1c212e;
    height:100%;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const AppName=styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
`;
const MovieImg=styled.img`
    width: 48px;
    height: 48px;
    margin: 15px;
`;
const SeacrBox=styled.div`
    display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 50px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SeacrIcon =styled.img`
  width: 32px;
  height: 32px;
`;
const SearchInput = styled.input`
  color:black;
  font-size:16px;
  font-weight:bold;
  border:none;
  outline:none;
  margin-left:15px;
`;
const MovieListContainer = styled.div`
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  padding:30px;
  gap:24px;
  justify-content: space-evenly;
  ${'' /* height:671px; */}
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 200px;
  opacity: 50%;

`;

function App() {

  const [searchQuery,updateSearchQuery] = useState();

  const [movieList, updateMovieList] = useState();

  const [selectedMovieID, onMovieSelectID] = useState();

  const [timeoutId, updateTimeoutId]=useState();


  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };
  const onTextChange = (event) =>{
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout( ()=> fetchData(event.target.value),500);
    updateTimeoutId(timeout);
  };
  return (
    <Contanir>
      <Header>
        
        <AppName>
          <MovieImg src='/amuzi.png'></MovieImg>
            Amuzi Movie App
            
        </AppName>
        <SeacrBox>
            <SeacrIcon src='/search.png'></SeacrIcon>
            <SearchInput 
                  placeholder='Search Movie Name'
                  value={searchQuery}
                  onChange={onTextChange}
                   >
            </SearchInput>
        </SeacrBox>
      </Header>
      {
        movieList && selectedMovieID && <MovieInfoComponent selectedMovie={selectedMovieID} onMovieSelect={onMovieSelectID}></MovieInfoComponent>
      }
      <MovieListContainer>
        {movieList?.length? (
          movieList.map((movie,index) => (
            <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelectID}/>
          ))
        ) : (
          <Placeholder src="/amuzi.png" />
        )}
      </MovieListContainer>
    </Contanir>
  );
}

export default App;
