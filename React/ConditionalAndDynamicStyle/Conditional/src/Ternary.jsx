function MissedGoal() {
    return <h3>MISSED!</h3>;
  }
  // This is example of Ternary opertor
  function MadeGoal() {
    return <h3>Goal!</h3>;
  }
  function Goal(props) {
    const isGoal = props.isGoal;
    return (
      <>
        { isGoal ? <MadeGoal/> : <MissedGoal/> }
      </>
    );
  }

  export default Goal