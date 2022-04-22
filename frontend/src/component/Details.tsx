import {useParams} from "react-router-dom";
import useTodo from "../hook/useTodo";
import {Todo} from "../model/Todo";

export default function Details(){

    const params = useParams()
    const id = params.id as string

    const todo:Todo|undefined = useTodo(id)

    return <>Details {id} {todo && todo.description}</>
}
