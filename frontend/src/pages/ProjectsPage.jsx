import { useState } from 'react';
import { useGetProjectsQuery } from '../features/projects/projectsApiSlice';
import ProjectKanbanBoard from '../features/projects/ProjectKanbanBoard';
import ProjectList from '../features/projects/ProjectList';
import { FaThList, FaTh } from 'react-icons/fa';

const ProjectsPage = () => {
    const { data: projects, isLoading, isError, error } = useGetProjectsQuery();
    const [view, setView] = useState('kanban'); // 'kanban' or 'list'

    if (isLoading) return <p>Loading projects...</p>;
    if (isError) return <p>Error: {error.data?.message || 'Could not fetch projects'}</p>;

    return (
        <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setView('list')} className={`p-2 rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        <FaThList />
                    </button>
                    <button onClick={() => setView('kanban')} className={`p-2 rounded ${view === 'kanban' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        <FaTh />
                    </button>
                    {/* Add New Project Button here */}
                </div>
            </div>

            {view === 'kanban' ? (
                <ProjectKanbanBoard projects={projects} />
            ) : (
                <ProjectList projects={projects} />
            )}
        </div>
    );
};

export default ProjectsPage;