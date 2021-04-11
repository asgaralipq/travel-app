import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { createLogEntry } from '../api';
import '../index.css'

const LogEntryForm = ({ location, onClose }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {

        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await createLogEntry(data);
            console.log(created);
            onClose();
        } catch (error) {
            console.log(error);
            setError(error.message);
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">

            { error ? <h3 className="error"> {error} </h3> : null}

            <label htmlFor="title">Title</label>
            <input name="title" ref={register} required />

            <label htmlFor="comments">Comments</label>
            <textarea name="comments" rows={3} ref={register} />

            <label htmlFor="description">Description</label>
            <textarea name="description" rows={3} ref={register} />

            <label htmlFor="image">Image</label>
            <input name="image" ref={register} />

            <label htmlFor="visitDate">Visit Date</label>
            <input name="visitDate" type="date" ref={register} required />

            <label htmlFor="tags">Commute Type:</label>
            <select className="commute" name="tags" ref={register} >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="College">College</option>
                <option value="Hospital">Hospital</option>
                <option value="Food">Food</option>
                <option value="Monument">Monument</option>
                <option value="Miscellaneous">Miscellaneous</option>
            </select>

            <br></br>

            <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>

        </form>
    );
};

export default LogEntryForm;