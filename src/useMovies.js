import { useEffect, useState } from "react";

const KEY = "1acc6a47";

// useMovies-Hook ermöglicht einfache Handhabung asynchroner Datenabfragen und stellt sicher,
// dass API-Anfragen nur dann ausgeführt werden, wenn die query min. 3 zeichen lang ist.
// Außerdem wird dafür gesorgt, Anfragen sauber abgebrochen werden, wenn sich nicht mehr benötigt werden.

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function() {
      // callback?.();

      // abort-controller-objekt wird erstellt, um anfrage abzubrechen
      // falls sich die komponente vor abschluss der Anfrage unmountet oder
      // die query sich ändert
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            // der signal-parameter ermöglicht, dass abfrage bei bedarf
            // abgebrochen werden kann
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies!");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found!");

          setMovies(data.Search);
          setError("");
          //
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        console.log("short");
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
      // cleanup-funktion, abort() des controllers wird aufgerufen,
      // wenn query sich ändert oder komponente unmountet wird
      return function() {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
