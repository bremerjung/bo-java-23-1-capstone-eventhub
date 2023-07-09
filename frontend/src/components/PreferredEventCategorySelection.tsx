import React, {useEffect, useState} from 'react';
import {User} from "../model/User";
import './PreferredEventCategorySelection.css';
import {Button, Form} from "react-bootstrap";

type Props = {
    user: User | undefined,
    categories: string[],
    updateUserPreferredCategories: (categories: string[]) => void
}

function PreferredEventCategorySelection(props: Props) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
            setSelectedCategories(props.user?.preferredCategories ?? [])
            console.log("test")
        }, []
    )

    const isCategorySelected = (category: string) => {
        return selectedCategories.includes(category);
    };

    const handleCategoryChange = (category: string) => {
        if (isCategorySelected(category)) {
            setSelectedCategories(selectedCategories.filter((currentCategory) => currentCategory !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleConfirmSelection = () => {
        props.updateUserPreferredCategories(selectedCategories);
    };

    return (
        <div className="container">
            <h6>Logged in user: {props.user?.username}</h6>
            <h1>Event category selection</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Select your preferred event categories:</Form.Label>
                    {props.categories.map((category) => (
                        <div className="categoryContainer" key={category}>
                            <Form.Check
                                type="checkbox"
                                id={category}
                                label={category}
                                checked={isCategorySelected(category)}
                                onChange={() => handleCategoryChange(category)}
                                className="customCheckbox"
                            />
                        </div>
                    ))}
                </Form.Group>
                <Button className="button" onClick={handleConfirmSelection}>Confirm</Button>
            </Form>
        </div>
    );
}

export default PreferredEventCategorySelection;