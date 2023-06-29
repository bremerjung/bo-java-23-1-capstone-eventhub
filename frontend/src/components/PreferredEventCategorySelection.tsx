import React, {useState} from 'react';
import {User} from "../model/User";
import './PreferredEventCategorySelection.css';
import getStoredUser from "./utils/getStoredUser";

type Props = {
    user: User | undefined,
    categories: string[],
    updateUserPreferredCategories: (categories: string[]) => void
}

function PreferredEventCategorySelection(props: Props) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(getStoredUser()?.preferredCategories ?? []);

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
        <div>
            <h1>Event category selection</h1>
            <h2>Logged in user: {props.user?.username}</h2>
            <fieldset>
                <legend>Select the event categories you are interested in:</legend>
                {props.categories.map((category: string) => {
                    return (
                        <div className="categoryContainer" key={category}>
                            <label htmlFor={category}><input type="checkbox" id={category} name={category}
                                                             checked={isCategorySelected(category)}
                                                             onChange={() => handleCategoryChange(category)}/> {category}
                            </label>
                        </div>
                    )
                })}
            </fieldset>
            <button onClick={handleConfirmSelection}>Confirm</button>
        </div>
    );
}

export default PreferredEventCategorySelection;