"use client";
import { addTodo } from "@/api";
import Modal from "./Modal";
import { FormEventHandler, use, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
    const router = useRouter();
    const[ModalOpen,setModalOpen] = useState(false);
    const[newTaskName,setNewTaskName] = useState<string>("");

    const handleAddingNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
            e.preventDefault();
            await addTodo({
                id: uuidv4(),
                text: newTaskName,
            }
            )
            setNewTaskName("");
            setModalOpen(false);
            router.refresh();
    }
    return (
    <div>
        <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full"> Add New Task</button>
        <Modal ModalOpen={ModalOpen} setModalOpen={setModalOpen}>
            <form onSubmit={handleAddingNewTodo}>
                <h3 className="font-bold text-lg"> Add a new task</h3>
                <div className="action flex mt-4">
                    <textarea value={newTaskName} onChange={e => setNewTaskName(e.target.value)} className="textarea textarea-bordered mr-10    h-5 relative ml-10" placeholder="New Task"></textarea>
                    <button className="btn bg-slate-900 text-gray-300"  type="submit"> Submit</button>
                </div>
            </form>
        </Modal>
         
    </div>);
};

export default AddTask;