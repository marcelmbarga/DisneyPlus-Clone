/* eslint-disable default-case */
import styled from "styled-components";

import React from 'react'
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import db from "./firebase";
import { setmovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";

const Home = (props) => {

    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    let recommends = [];
    let newDisneys = [];
    let originals = [];
    let trending = [];

// Another way to fecth data from firestore
//     const fetchMovies=async()=>{
//     const response=db.collection('movies');
//     const data=await response.get();
//     console.log(data.docs)
//     data.docs.forEach(item=>{
//         console.log('test',item.data());
//     //  setBlogs([...blogs,item.data()])
//     })
//   }
//It's important to add () after data for the fetch procedure to work

    useEffect( () => {
        // fetchMovies()
        db.collection('movies').onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                // eslint-disable-next-line default-case
                switch (doc.data().type) {
                  case "recommend":
                    recommends = [...recommends, { idm: doc.id, ...doc.data() }];
                    break;
                  case "new":
                    newDisneys = [...newDisneys, { idm: doc.id, ...doc.data() }];
                    break;
                  case "original":
                    originals = [...originals, { idm: doc.id, ...doc.data() }];
                    break;
                  case "trending":
                    trending = [...trending, { idm: doc.id, ...doc.data() }];
                    break;
                }
            })
            // console.log('originals',originals)
            // console.log("trending", trending);
             dispatch(
               setmovies({
                 recommend: recommends,
                 newDisney: newDisneys,
                 original: originals,
                 trending: trending,
               })
             );
        })


    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userName])

    return (
      <Container>
        <ImgSlider />
        <Viewers />
        <Recommends />
        <NewDisney />
        <Originals />
        <Trending />
      </Container>

    );
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover no-repeat fixed;
    content: '';
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home
