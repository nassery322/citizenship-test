import "./TestItem.css";

const TestItem = (props) => {
  return (
    <section className="test-item">
      <div className="test-image">
        <img src={props.image} alt="Test image" />
      </div>
        <header>{props.title}</header>
        <div className="test-description">{props.description}</div>
        <button className="start-test-btn">Start Test</button>
      
    </section>
  );
};

export default TestItem;
