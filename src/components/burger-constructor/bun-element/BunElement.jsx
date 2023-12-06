
function BunElement({ type, position }) {
    const ingredientBun = useSelector(state => state.constructorReducer);
    const { bun } = ingredientBun;
  
    const bunName = bun.name ? `${bun.name} ${position}` : 'Выберите булку';
  
    return (
      <div className="elements">
        <ConstructorElement
          type={type}
          isLocked={true}
          text={bunName}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      </div>
    );
  }
  
  BunElement.propTypes = {
    type: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
  };
  
  export default BunElement;