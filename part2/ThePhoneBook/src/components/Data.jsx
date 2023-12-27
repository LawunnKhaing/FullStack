const Data = ({}) => {
return (
    <div>
        <h1>My Phonebook App</h1>
        <ul>
        {persons.map(person => (
            <li key={person.id}>{person.name} - {person.number}</li>
        ))}
        </ul>
    </div>
    );
};


export default Data;