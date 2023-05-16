import {Link} from 'react-router-dom'

const ProjectsList = ({projects}) => {
    return(
      <>
      {projects.map(project =>(
        <Link key={project.name} className="link-list-item" to={`/projects/${project.name}`}>
          <h3>{project.title}</h3>
        </Link>  
      ))}
      </>
    )
}

export default ProjectsList;