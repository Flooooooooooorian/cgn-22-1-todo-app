import axios from "axios";
import {useEffect, useState} from "react";
import {Todo} from "../model/Todo";

export default function useTodos(){
    const [allTodos, setAllTodos] = useState<Todo[]>([])

    const path:string = "/api/todo"

    useEffect(() => {
        axios.get(path)
            .then(response => response.data)
            .then(body => setAllTodos(body))
            .catch(console.error)
    },[])

    return allTodos
}