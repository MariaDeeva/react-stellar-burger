import React, {useMemo} from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-element.module.css';


    export default function BurgerElement({ elements }) {
        const renderElements = useMemo(() => {
            return elements.flatMap(({ _id, name, price, image, count }) => {
                const items = Array(count).fill().map((_, index) => (
                    <div key={`${_id}_${index}`} className={styles.elements}>
                        <DragIcon type='primary' />
                        <ConstructorElement text={name} price={price} thumbnail={image} />
                    </div>
                ));
                return items;
            });
        }, [elements]);
    
        return <>{renderElements}</>;
    }