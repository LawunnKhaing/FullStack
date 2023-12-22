const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  );
};

const Content = ({ parts, exercises }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <p key={index}>
          {part} {exercises[index]}
        </p>
      ))}
    </div>
  );
};

const Total = ({ exercises }) => {
  return (
    <div>
      <p>Number of exercises {exercises}</p>
    </div>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[part1, part2, part3]}
        exercises={[exercises1, exercises2, exercises3]}
      />
      <Total exercises={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;

