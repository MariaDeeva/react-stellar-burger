import styles from './other-element.module.css';
import { useDispatch } from 'react-redux';
import { useRef, useCallback } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { REORDER_CONSTRUCTOR, DELETE_CONSTRUCTOR } from '../../../services/actions/burgerConstructor';

function OtherElement({ ingredient, index }) {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const id = ingredient._id;

    const moveIngredient = useCallback((dragIndex, hoverIndex) => {
        dispatch({
            type: REORDER_CONSTRUCTOR,
            dragIndex,
            hoverIndex
        });
    }, [dispatch]);

    const [{ handId }, drop] = useDrop({
        accept: 'IngredientCard',
        collect(monitor) {
            return {
                handId: monitor.getHandlerId()
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'IngredientCard',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    });
    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    const handleDeleteItem = useCallback(() => {
        dispatch({
            type: DELETE_CONSTRUCTOR,
            payload: ingredient.key
        });
    }, [dispatch, ingredient.key]);
    return (
        <li className={`${styles.overlay} mb-4`} ref={ref} style={{ opacity }}>
            <div className={styles.points}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={handleDeleteItem}
            />
        </li>
    );
};


export default OtherElement;
