import React, {useState, useEffect} from "react";
import axios from "axios";
import Data from "./components/Data";
import dataService from "./services/data";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({name: '', number: ''});
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    dataService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    dataService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewPerson({name: '', number: ''});
    });
  };

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value});
  };

  const handleNumberChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value});
  };

  // const updatePerson = (id) => {
  //   const personToUpdate = persons.find((person) => person.id === id);
  //   if (!personToUpdate) return;

  //   dataService.update(id, newPerson).then((returnedPerson) => {
  //     setPersons(
  //       persons.map((person) =>
  //         person.id === id ? returnedPerson : person
  //       )
  //     );
  //   });
  // };

  const DeletePerson = (id, name) => {
    const confirmation = window.confirm(`Delete ${name}?`);
    if (confirmation) {
      dataService
        .remove(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)));
    }
  };
  
  return (
    <div>
      <h1>My Phonebook</h1>
      <div>
        Filter shown with:{" "}
        <input
          value={searchName}
          onChange={handleSearchNameChange}
          placeholder="Search name"
        />
      </div>
      <br />
      <form onSubmit={addPerson}>
        <div>
          Name:
          <input
            value={newPerson.name}
            onChange={handleNameChange}
            placeholder="Enter name"
          />
          </div>
        <div>
          Number:{" "}
          <input
            value={newPerson.number}
            onChange={handleNumberChange}
            placeholder="Enter number"
          />
        </div>
        <br />
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}{" "}
            {/* <button onClick={() => updatePerson(person.id)}>Update</button>{" "} */}
            <button onClick={() => DeletePerson(person.id, person.name)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

