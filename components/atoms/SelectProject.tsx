import Project from '../../entities/Project';
import useProjectFetch from '../../hooks/useProjectFetch';

export interface TaskFormData {
   startDate: Date;
   dueDate: Date;
   title: string;
   description: string;
   status: string;
   project: string;
}

export interface SelectProjectProps {
   formData: TaskFormData;
   setFormData: React.Dispatch<React.SetStateAction<TaskFormData>>;
}

function SelectProject({ formData, setFormData }: SelectProjectProps) {
   const projectsCache = useProjectFetch();
   return (
      <div className="relative w-full mt-3 h-12 py-4 px-3 border border-indigo-600 hover:border-indigo-300 focus-within:border-black rounded-lg">
         <label
            htmlFor="status"
            className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-md font-semibold text-indigo-900 px-1 bg-indigo-50"
         >
            Projeto
         </label>
         <select
            name="project"
            id="project"
            value={formData.project}
            onChange={(e) =>
               setFormData((prev: TaskFormData) => ({
                  ...prev,
                  project: e.target.value
               }))
            }
            className="w-full outline-none bg-transparent text-gray-600 placeholder-gray-400 font-semibold"
         >
            <option value="Não pertence a nenhum projeto">
               Essa tarefa pertence a algum projeto?
            </option>
            {/* TODO fazer o sistema puxar todos os nomes de projetos e listar aqui para escolher */}
            <option value="Não pertence a nenhum projeto">
               Não pertence a nenhum projeto
            </option>

            {projectsCache.projects.map((project: Project) => (
               <option key={project.id} value={project.id}>
                  {project.title}
               </option>
            ))}
         </select>
      </div>
   );
}
export default SelectProject;
