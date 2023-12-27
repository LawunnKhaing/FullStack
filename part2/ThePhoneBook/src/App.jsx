import React, {useState, useEffect} from "react";
import axios from "axios";
import Data from "./components/Data";
import dataService from "./services/data";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({name: '', number: ''});

  useEffect(() => {
    dataService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    dataService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewPerson({name: '', number: ''});
    });
  };

  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value});
  };

  const handleNumberChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value});
  };

  const updatePerson = (id) => {
    const personToUpdate = persons.find((person) => person.id === id);
    if (!personToUpdate) return;

    dataService.update(id, newPerson).then((returnedPerson) => {
      setPersons(
        persons.map((person) =>
          person.id === id ? returnedPerson : person
        )
      );
    });
  };

  return (
    <div>
      <h1>My Phonebook</h1>
      <form onSubmit={addPerson}>
        <div>
          Name:{" "}
          <input
            value={newPerson.name}
            onChange={handleNameChange}
            placeholder="Enter name"
          />
          Number:{" "}
          <input
            value={newPerson.number}
            onChange={handleNumberChange}
            placeholder="Enter number"
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}{" "}
            <button onClick={() => updatePerson(person.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

