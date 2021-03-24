import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import { createLogEntry } from '../api';

const LogEntryForm = ({location, onClose}) =>{

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit} = useForm();

  const onSubmit = async (data) =>{

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
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">

            { error ? <h3 className="error"> {error} </h3> : null }

            <label htmlFor="title">Title</label>
            <input name="title" ref={register} required/>

            <label htmlFor="comments">Comments</label>
            <textarea name="comments" rows={3} ref={register}/>

            <label htmlFor="description">Description</label>
            <textarea name="description" rows={3} ref={register}/>

            <label htmlFor="image">Image</label>
            <input name="image" ref={register}/>

            <label htmlFor="visitDate">Visit Date</label>
            <input name="visitDate" type="date" ref={register} required/>

            <label htmlFor="tags">Commute Type:</label>
            <select name="tags" ref={register} >
                <option value="home">home</option>
                <option value="office">office</option>
                <option value="college">college</option>
                <option value="hospital">hospital</option>
                <option value="caffe">caffe</option>
                <option value="hotel">hotel</option>
                <option value="monument">monument</option>
                <option value="miscellaneousk ">miscellaneous</option>
            </select>
            
            <br></br>

            <button disabled={loading}>{ loading ? 'Loading...' : 'Create Entry'}</button>
            
        </form>
    );
};

export default LogEntryForm;