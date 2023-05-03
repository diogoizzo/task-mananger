import Input from '../atoms/Input';
import SelectProject from '../atoms/SelectProject';
import SelectStatus from '../atoms/SelectStatus';

function TaskForm({
   formData,
   setFormData,
   modalContent,
   createTask,
   updateTask,
   cancelHandler
}: any) {
   return (
      <form className="mt-10">
         <Input
            value={formData.title}
            onChange={(e) =>
               setFormData((prev: FormData) => ({
                  ...prev,
                  title: e.target.value
               }))
            }
            titulo="Nome"
            placeholder="Insira o nome da tarefa"
         />

         <div className="flex w-full justify-between flex-wrap ">
            <div className="w-1/2 mt-3 pr-1">
               <Input
                  value={formData.startDate}
                  onChange={(e) =>
                     setFormData((prev: FormData) => ({
                        ...prev,
                        startDate: e.target.value
                     }))
                  }
                  titulo="Data de início"
                  type="date"
                  placeholder="Data de início da tarefa"
               />
            </div>
            <div className="w-1/2 mt-3 pl-1">
               <Input
                  value={formData.dueDate}
                  onChange={(e) =>
                     setFormData((prev: FormData) => ({
                        ...prev,
                        dueDate: e.target.value
                     }))
                  }
                  titulo="Prazo final"
                  type="date"
               />
            </div>
            <div className="w-full mt-3">
               <SelectStatus formData={formData} setFormData={setFormData} />
            </div>
            <div className="w-full mt-3">
               <SelectProject setFormData={setFormData} formData={formData} />
            </div>
            <div className="relative w-full text-center mt-6 h-28 ">
               <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-md font-semibold text-indigo-900 px-1 bg-indigo-50">
                  Descrição
               </span>
               <textarea
                  value={formData.description}
                  onChange={(e) =>
                     setFormData((prev: FormData) => ({
                        ...prev,
                        description: e.target.value
                     }))
                  }
                  className="border bg-indigo-50 w-full h-full outline-none border-indigo-600 hover:border-indigo-300 focus-within:border-black rounded-lg p-3 text-justify text-gray-600 placeholder-gray-600 font-semibold"
                  name="descricao"
                  id="descricao"
                  placeholder="Insira a descrição da nova tarefa"
               ></textarea>
            </div>
         </div>
         <div className=" w-full flex justify-center space-x-5 mt-10">
            <button
               type="button"
               onClick={modalContent ? updateTask : createTask}
               className="inline-flex justify-center border-indigo-200 rounded-md border  bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
               Salvar
            </button>
            <button
               type="button"
               className="inline-flex justify-center rounded-md border border-indigo-200 bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
               onClick={cancelHandler}
            >
               Cancelar
            </button>
         </div>
      </form>
   );
}
export default TaskForm;
