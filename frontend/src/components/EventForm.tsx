import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {EventModel} from "../model/EventModel";
import {User} from "../model/User";

type Props = {
    user: User | undefined,
    event: EventModel | undefined,
    isFormVisible: boolean,
    onSave: (event: EventModel) => void,
    onClose: () => void;
}

function EventForm(props: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [source, setSource] = useState("");

    useEffect(() => {
        if (props.event) {
            const {title, description, startDate, startTime, location, category, source} = props.event;
            setTitle(title || '');
            setDescription(description || '');
            setStartDate(startDate || '');
            setStartTime(startTime || '');
            setLocation(location || '');
            setCategory(category || '');
            setSource(source || '');
        } else {
            setTitle('');
            setDescription('');
            setStartDate('');
            setStartTime('');
            setLocation('');
            setCategory('');
            setSource('');
        }
    }, [props.event]);

    function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
        console.log("Submit button clicked");

        e.preventDefault();

        const event: EventModel = {
            id: "",
            title: title,
            description: description,
            start: new Date(startDate + "T" + startTime + ":00"),
            startDate: startDate,
            startTime: startTime,
            end: new Date(startDate + "T" + startTime + ":00"),
            location: location,
            category: category,
            creator: props.user?.username || "",
            status: "NEW",
            source: source,
            imageUrl: ""
        };

        props.onSave(event);
        props.onClose();
    }

    function onChangeHandlerTitle(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value)
    }

    function onChangeHandlerDescription(e: ChangeEvent<HTMLTextAreaElement>) {
        setDescription(e.target.value)
    }

    function onChangeHandlerStartDate(e: ChangeEvent<HTMLInputElement>) {
        setStartDate(e.target.value)
    }

    function onChangeHandlerStartTime(e: ChangeEvent<HTMLInputElement>) {
        setStartTime(e.target.value)
    }

    function onChangeHandlerLocation(e: ChangeEvent<HTMLInputElement>) {
        setLocation(e.target.value)
    }

    function onChangeHandlerCategory(e: ChangeEvent<HTMLSelectElement>) {
        setCategory(e.target.value)
    }

    function onChangeHandlerSource(e: ChangeEvent<HTMLInputElement>) {
        setSource(e.target.value)
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{props.event ? 'Edit Event' : 'Add Event'}</h3>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <label htmlFor="title">Title </label>
                        <input type="text" id="title" name="title" value={title} onChange={onChangeHandlerTitle}
                               required/>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={description}
                                  onChange={onChangeHandlerDescription} rows={4} cols={50} required>
                    </textarea>
                    </div>
                    <div>
                        <label htmlFor="startDate">Date </label>
                        <input type="date" id="startDate" name="startDate" value={startDate}
                               onChange={onChangeHandlerStartDate} required/>
                    </div>
                    <div>
                        <label htmlFor="startTime">Time </label>
                        <input type="time" id="startTime" name="startTime" value={startTime}
                               onChange={onChangeHandlerStartTime} required/>
                    </div>
                    <div>
                        <label htmlFor="location">Location </label>
                        <input type="text" id="location" name="location" value={location}
                               onChange={onChangeHandlerLocation} required/>
                    </div>
                    <div>
                        <label htmlFor="category">Category </label>
                        <select id="category" name="category" value={category} onChange={onChangeHandlerCategory}
                                required>
                            <option value="OTHER">Other</option>
                            <option value="MUSIC">Music</option>
                            <option value="ARTS">Arts</option>
                            <option value="THEATRE">Theatre</option>
                            <option value="COMEDY">Comedy</option>
                            <option value="SPORTS">Sports</option>
                            <option value="EDUCATION">Education</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="source">Source </label>
                        <input type="url" value={source} onChange={onChangeHandlerSource} required/>
                    </div>
                    <div>
                        <button type="submit">{props.event ? 'Save' : 'Add'}</button>
                        <button type="button" onClick={props.onClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EventForm;