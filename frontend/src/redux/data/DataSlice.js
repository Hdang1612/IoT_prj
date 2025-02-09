import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "react-router-dom";
const dataSlice = createSlice ({
    name:'data',
    initialState :{
        sensorData:[],
        actionLogs:[],
        status:'',
    },
    reducers : {

    }
})

export default dataSlice.reducer