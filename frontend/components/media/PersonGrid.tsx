import type { Person } from "../../utils/types";

export default function PersonGrid({ persons }: { persons: Person[] }) {
  return (
    <div className="flex overflow-y-scroll gap-4">
      {persons.map((p) => (
        <PersonItem person={p} key={p.id} />
      ))}
    </div>
  );
}

function PersonItem({ person }: { person: Person }) {
  return (
    <div className="min-w-fit">
      <img
        src={person.photoUrl}
        alt={person.lastName}
        className="h-40 w-40 object-cover rounded-full"
      />
      <div className="text-center my-2">
        <h2 className="text-blue-500">
          {person.firstName} {person.lastName}
        </h2>
        <h3>{person.type}</h3>
      </div>
    </div>
  );
}
