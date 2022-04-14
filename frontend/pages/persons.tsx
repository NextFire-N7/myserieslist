import type { NextPage, GetServerSideProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { Person } from "../utils/types";

// server-side
export const getServerSideProps: GetServerSideProps = async (context) => {
  const resp = await fetch("http://localhost:3000/api/persons");
  const data = await resp.json();
  return { props: data };
};

// Consumes the result of getServerSideProps
const Persons: NextPage<{ message: string; persons: Person[] }> = ({
  message,
  persons,
}) => {
  // store the api response
  const [data, setData] = useState<{ message: string; persons: Person[] }>();
  // trick to force the component to fetch data from the api again after a submit
  const [didChange, setDidChange] = useState(false);

  // client-side
  // is called each time the didChange dependancy changes
  useEffect(() => {
    fetch("/api/persons")
      .then((resp) => resp.json())
      .then((data) => setData(data));
  }, [didChange]);

  // calls the api to add a new person, and change didChange
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const resp = await fetch("/api/persons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lastName: e.target.elements.lastName.value,
          firstName: e.target.elements.firstName.value,
        }),
      });
      const data = await resp.json();
      console.log(data);
      setDidChange(!didChange);
    },
    [didChange]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="lastName" placeholder="Last Name" />
        <input type="text" name="firstName" placeholder="First Name" />
        <input type="submit" value="Add" />
      </form>

      <div className="flex space-x-10">
        <div>
          <h1 className="underline">GET /api/persons (server-side):</h1>
          <p>message: {message}</p>
          <p>persons:</p>
          <ul>
            {persons.map((person) => (
              <li key={person.id}>
                {person.lastName} {person.firstName}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className="underline">GET /api/persons (client-side):</h1>
          {data && (
            <>
              <p>message: {data.message}</p>
              <p>persons:</p>
              <ul>
                {data.persons.map((person) => (
                  <li key={person.id}>
                    {person.lastName} {person.firstName}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Persons;
