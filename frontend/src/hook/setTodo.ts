import axios from "axios";
import {useEffect, useState} from "react";
import {Todo} from "../model/Todo";



export default function useTodos(todo:Todo){

    const path:string = "/api/todo"

    useEffect(() => {
        axios.post(path, todo)
            .then(response => response.data)
            .then(body => console.log("Todo " + body + "sent."))
            .catch(console.error)
    },[])

    return todo
}