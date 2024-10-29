import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  // der state 'value' wird definiert
  // initialisierung prüft zuerst, ob bereits ein Wert mit dem 'key' im localStorage existiert
  // wenn storedValue vorhanden, dann umwandelung mit JSON.parse in javascript-objekt
  const [value, setValue] = useState(function() {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // state wird immer in loacalStorage gespeichert, sobald sich 'value' oder 'key' ändert
  // stae wird mit JSON.stringify in einen string konvertiert
  useEffect(
    function() {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  // value und setValue funktion wird zurück gegeben,
  // sodass state ähnlich wie useState verwendet werden kann
  return [value, setValue];
}
