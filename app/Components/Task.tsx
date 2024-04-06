'use client';
import { ITask } from "@/types/tasks";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
    takkkk: ITask;
}

const Task: React.FC<TaskProps> = ({ takkkk}) => {
    const router = useRouter();
    const[modalEditOpen,setModalEditOpen] = useState<boolean>(false);
    const[modalDeleteOpen,setModalDeleteOpen] = useState<boolean>(false);
    const[taskToEdit,setTaskToEdit] = useState<string>(takkkk.text);

    const handleEditingTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: takkkk.id,
            text: taskToEdit,
        }
        )
        setTaskToEdit(taskToEdit);
        setModalEditOpen(false);
        router.refresh();
    }

    const handlDeleteTodo = async (id: string) => {
        await deleteTodo(takkkk.id);
        setModalDeleteOpen(false);
        router.refresh();
    }

    return (
        <tr key={takkkk.id}>
        <td className="w-full">{takkkk.text}</td>
        <td className="flex gap-5">
        <FiEdit onClick={()=>setModalEditOpen(true)} cursor='pointer' className="text-blue-500" size={25} />
        <Modal ModalOpen={modalEditOpen} setModalOpen={setModalEditOpen}>
            <form onSubmit={handleEditingTodo}>
                <h3 className="font-bold text-lg text-center"> Edit existing Task</h3>
                <div className="action flex mt-4">
                    <textarea value={taskToEdit} onChange={e => setTaskToEdit(e.target.value)} className="textarea textarea-bordered mr-10 h-5 relative ml-10 w-full" placeholder="New Task"></textarea>
                    <button className="btn bg-slate-900 text-gray-300"  type="submit"> Submit</button>
                </div>
            </form>
        </Modal>
        <FiTrash2 onClick={()=>setModalDeleteOpen(true)} cursor='pointer' className="text-red-500" size={25}/>
        <Modal ModalOpen={modalDeleteOpen} setModalOpen={setModalDeleteOpen}>
                <h3 className="font-bold text-lg text-center"> Are you sure you want to delete?</h3>
                <div className="action flex mt-4">
                    <button onClick={()=> handlDeleteTodo(takkkk.id)} className="btn bg-red-900 text-gray-300"  type="submit"> Delete</button>
                </div>
        </Modal>
        </td>
        </tr>
    );
};

export default Task;