import React, {useState, useEffect} from "react";
import axios from "axios";
import Data from "./components/Data";
import dataService from "./services/data";
import { set } from "mongoose";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({name: '', number: ''});
  const [searchName, setSearchName] = useState("");
  const [notification, setNotification] = useState(null);

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
  
    const personExists = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );
  
    if (personExists) {
      const confirmation = window.confirm(
        `${newPerson.name} is already added to the phonebook. Replace the old number with the new one?`
      );
      if (confirmation) {
        dataService
          .update(personExists.id, { ...personExists, number: newPerson.number })
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personExists.id ? person : updatedPerson
              )
            );
            setNewPerson({ name: '', number: '' });
          });
      }
    } else {
      dataService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewPerson({ name: '', number: '' });
      });
    }
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

  const DeletePerson = (id, name) => {
    const confirmation = window.confirm(`Delete ${name}?`);
    if (confirmation) {
      dataService
        .remove(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)));
    }
  };
  
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      {notification && <div className="notification">{notification}</div>}
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
          <button type="submit" onClick={() => showNotification(`Added ${newPerson.name}`)}>
            Add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} - {person.number}{" "}
          <button onClick={() => DeletePerson(person.id, person.name)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
