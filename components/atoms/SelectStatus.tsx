import { TaskFormData } from './SelectProject';

import { SelectProjectProps as SelectStatusProps } from './SelectProject';

function SelectStatus({ formData, setFormData }: SelectStatusProps) {
   return (
      <div className="relative w-full mt-3 h-12 py-4 px-3 border border-indigo-600 hover:border-indigo-300 focus-within:border-black rounded-lg">
         <label
            htmlFor="status"
            className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-md font-semibold text-indigo-900 px-1 bg-indigo-50"
         >
            Status
         </label>

         <select
            value={formData.status}
            onChange={(e) =>
               setFormData((prev: TaskFormData) => ({
                  ...prev,
                  status: e.target.value
               }))
            }
            id="status"
            className="w-full outline-none bg-transparent text-gray-600 placeholder-gray-400 font-semibold"
         >
            <option value="">Escolha o status atual da tarefa</option>
            <option value="proximasAcoes">Próximas ações</option>
            <option value="emProgresso">Em progresso</option>
            <option value="pausada">Pausada</option>
            <option value="aguardando">Aguardando</option>
            <option value="planejada">Planejada</option>
            <option value="concluida">Concluída</option>
         </select>
      </div>
   );
}
export default SelectStatus;
