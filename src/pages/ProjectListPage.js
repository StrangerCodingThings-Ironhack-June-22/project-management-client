import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddProject from "../components/AddProject";


function ProjectListPage() {
    const [projects, setProjects] = useState([]);

    const getAllProjects = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/projects`)
            .then((response) => setProjects(response.data))
            .catch((error) => console.log(error));
    };

    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
        getAllProjects();
    }, []);


    return (
        <div className="ProjectListPage">

            <AddProject refreshProjects={getAllProjects} />
            <hr />

            {projects.map((project) => {
                return (
                    <div className="ProjectCard card" key={project._id} >
                        <Link to={`/projects/${project._id}`}>
                            <h3>{project.title}</h3>
                        </Link>
                    </div>
                );
            })}

        </div>
    );
}

export default ProjectListPage;
