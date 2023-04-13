import React, {useState} from "react";

function ActivityForm (): JSX.Element {

    interface Form {
        activity: string,
        target: number,
        completed: number
    }

    const INITIAL_STATE = {
        activity: "",
        target: 0,
        completed: 0
    }

    const [formData, setFormData] = useState<Form>(INITIAL_STATE)

    const handleChange = (e: React.FormEvent) => {
        const {name, value} = e.target
        setFormData((formData) => ({
            ...formData, [name]: value,
        }))

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // setInput("")
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="activity">Activity Name</label>
            <input type ="text" name="activity" value={formData.activity} onChange={handleChange}></input>
            <button type ="submit">Add New Activity</button>
        </form>
    )
}

export default ActivityForm;