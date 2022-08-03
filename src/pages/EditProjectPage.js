import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  //  <== IMPORT 


function EditProjectPage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const { projectId } = useParams(); //  // Get the URL parameter `:projectId` 
    const navigate = useNavigate();

    const storedToken = localStorage.getItem("authToken");

    // This effect will run after the initial render and each time
    // the project id coming from URL parameter `projectId` changes
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`)
            .then((response) => {
                /* 
                  We update the state with the project data coming from the response.
                  This way we set inputs to show the actual title and description of the project
                */
                const oneProject = response.data;
                setTitle(oneProject.title);
                setDescription(oneProject.description);
            })
            .catch((error) => console.log(error));

    }, [projectId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Create an object representing the body of the PUT request
        const requestBody = { title, description };

        // Make a PUT request to update the project
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/projects/${projectId}`, 
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                // Once the request is resolved successfully and the project
                // is updated we navigate back to the details page
                navigate(`/projects/${projectId}`)
            });
    };


    return (
        <div className="EditProjectPage">
            <h3>Edit the Project</h3>

            <form onSubmit={handleFormSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">Update Project</button>
            </form>
        </div>
    );
}

export default EditProjectPage;
