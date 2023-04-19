import { createSlice } from '@reduxjs/toolkit';

export const visSlice=createSlice({
    name:'vis',
    initialState:{
        loading:false,
        fetchFailed:false,
        wordCloud:null,
        top15:null,
        rpm:null,
        bigrams:null,
        bigramsWithStopwords:null,
        top15WordsWithStopwords:null
    },
    reducers:{
        fetchStarted:(state)=>{
            state.loading=true;
            state.fetchFailed=false;
        },
        fetchFailed:(state)=>{
            state.loading=false;
            state.fetchFailed=true;
            state.wordCloud=null;
            state.top15=null;
            state.rpm=null;
            state.bigrams=null;
            state.bigramsWithStopwords=null;
            state.top15WordsWithStopwords=null
        },
        fetchSuccess:(state,action)=>{
            state.loading=false;
            state.fetchFailed=false;
            state.wordCloud=transformWordCloud(action.payload.wordCloud);
            state.top15=action.payload.top15;
            state.rpm=action.payload.rpm;
            state.top15WordsWithStopwords=action.payload.top15WordsWithStopwords;
            state.bigrams=action.payload.bigrams;
            state.bigramsWithStopwords=action.payload.bigramsWithStopwords;
        }
    }
})
const transformWordCloud=(wordCloud)=>{
    const newCloud=Object.keys(wordCloud).map((word)=>{
        return {
            value:word,
            count:wordCloud[word]
        }
    }).sort((a,b)=>b.count-a.count).slice(0,150);
    return newCloud;
}
export const {fetchStarted,fetchFailed,fetchSuccess}=visSlice.actions

export default visSlice.reducer;