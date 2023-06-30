import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {
    faEllipsisH,
    faFutbol,
    faGraduationCap,
    faLaugh,
    faMask,
    faMusic,
    faPalette
} from '@fortawesome/free-solid-svg-icons';

type Props = {
    category: string;
};

function getCategoryIcon(category: string): IconDefinition | null {
    switch (category) {
        case 'MUSIC':
            return faMusic;
        case 'ARTS':
            return faPalette;
        case 'THEATRE':
            return faMask;
        case 'COMEDY':
            return faLaugh;
        case 'SPORTS':
            return faFutbol;
        case 'EDUCATION':
            return faGraduationCap;
        case 'OTHER':
            return faEllipsisH;
        default:
            return null;
    }
}

function CategoryIcon(props: Props) {
    const icon = getCategoryIcon(props.category);

    if (icon) {
        return <FontAwesomeIcon icon={icon}/>;
    }

    return null;
}

export default CategoryIcon;