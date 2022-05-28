import type { Commentaire } from "../../utils/types";
import CommentaireCard from "./CommentaireCard";

export default function CommmentaireGrid({ commentaires }: { commentaires: Commentaire[] }) {
    
  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
      {commentaires.map((commentaire) => (
        <CommentaireCard commentaire={commentaire} key={commentaire.id} />
      ))}
    </div>
  );
}
