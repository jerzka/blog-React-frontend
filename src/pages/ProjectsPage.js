import ProjectsList from '../components/ProjectsList'
import projects from './project-content'

const ProjectsPage = () => {
    return (
        <>
        <h1>Projects List</h1>
        <ProjectsList projects={projects} />
        </>
    )
}

export default ProjectsPage; 