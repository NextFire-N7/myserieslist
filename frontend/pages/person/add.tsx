import { NextPage } from "next";
import { useCallback } from "react";

const PersonAdd : NextPage = () => {

  const handleSubmit = useCallback(async (e) => {

  }, []);

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-1">
        <label className="my-auto">First Name</label>
        <input type="text" name="prenom" className="flex-1 text-black" />
        <label className="my-auto">Last Name</label>
        <input type="text" name="nom" className="flex-1 text-black" />
        <label className="my-auto">Photo URL</label>
        <input type="url" name="coverUrl" className="flex-1 text-black" />
        <label className="my-auto">Type</label>
        <select name="type" className="text-black">
          <option value="ACTEUR">Acteur</option>
          <option value="DOUBLEUR">Doubleur</option>
          <option value="REALLISATEUR">Réalisateur</option>
        </select>
        <input type="submit" className="flex-1 border-2 cursor-pointer" />
      </form>
      
    </div>
  );
};

export default PersonAdd;