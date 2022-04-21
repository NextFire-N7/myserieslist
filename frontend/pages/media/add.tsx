import type { NextPage } from "next";
import { useCallback, useState } from "react";
import MediaCard from "../../components/media/MediaCard";
import type { Media } from "../../utils/types";

const MediaAdd: NextPage = () => {
  const [lastSubmitted, setLastSubmitted] = useState<Media | null>(null);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const resp = await fetch("/api/medias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom: e.target.elements.nom.value,
        type: e.target.elements.type.value,
        coverUrl: e.target.elements.coverUrl.value,
      }),
    });
    const data = await resp.json();
    console.log(data);
    setLastSubmitted(data);
  }, []);

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-1">
        <label className="my-auto">Name</label>
        <input type="text" name="nom" className="flex-1" />
        <label className="my-auto">Type</label>
        <select name="type">
          <option value="COLLECTION">Collection</option>
          <option value="MOVIE">Movie</option>
          <option value="TV">TV</option>
          <option value="ANIME">Anime</option>
          <option value="EPISODE">Episode</option>
        </select>
        <label className="my-auto">Cover URL</label>
        <input type="url" name="coverUrl" className="flex-1" />
        <input type="submit" className="flex-1 border-2 cursor-pointer" />
      </form>

      {lastSubmitted && (
        <div>
          <h1>Sucessfully submitted:</h1>
          <MediaCard media={lastSubmitted} />
        </div>
      )}
    </div>
  );
};

export default MediaAdd;
