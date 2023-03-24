import axios from "axios";

const url = "http://localhost:8778/registration/employee";

export const obj ={
    getData : ()=>{
        const res = axios.get(url);
        return res;
    }
}