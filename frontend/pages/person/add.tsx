import { NextPage } from "next";
import { useCallback, useState } from "react";

const PersonAdd : NextPage = () => {

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const resp = await fetch("/api/persons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lastName: e.target.elements.lastName.value,
        firstName: e.target.elements.firstName.value,
        photoUrl: e.target.elements.photoUrl.value,
        type: e.target.elements.type.value,
      }),
    });
    const data = await resp.json();
    console.log(data);
    setSubmitted(true);
  }, []);

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-1">
        <label className="my-auto">First Name</label>
        <input type="text" name="firstName" className="flex-1 text-black" />
        <label className="my-auto">Last Name</label>
        <input type="text" name="lastName" className="flex-1 text-black" />
        <label className="my-auto">Photo URL</label>
        <input type="url" name="photoUrl" className="flex-1 text-black" />
        <label className="my-auto">Type</label>
        <select name="type" className="text-black">
          <option value="ACTEUR">Acteur</option>
          <option value="DOUBLEUR">Doubleur</option>
          <option value="REALLISATEUR">Réalisateur</option>
        </select>
        <input type="submit" className="flex-1 border-2 cursor-pointer" />
      </form>
      {submitted && (
        <div>
          <h1>Succesfully submited</h1>
        </div>
      )}
    </div>
  );
};

export default PersonAdd;