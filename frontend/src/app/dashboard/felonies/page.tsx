'use client';

import React, { useState } from 'react';

interface Crime {
  name: string;
  category: string;
  description: string;
}

const CrimeManagement = () => {
  const [crimeName, setCrimeName] = useState('');
  const [crimeCategory, setCrimeCategory] = useState('');
  const [crimeDescription, setCrimeDescription] = useState('');
  const [crimes, setCrimes] = useState<Crime[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCrime: Crime = {
      name: crimeName,
      category: crimeCategory,
      description: crimeDescription,
    };
    if (editIndex !== null) {
      const updatedCrimes = [...crimes];
      updatedCrimes[editIndex] = newCrime;
      setCrimes(updatedCrimes);
      setEditIndex(null);
    } else {
      setCrimes([...crimes, newCrime]);
    }
    setCrimeName('');
    setCrimeCategory('');
    setCrimeDescription('');
  };

  const handleDelete = (index: number) => {
    const updatedCrimes = [...crimes];
    updatedCrimes.splice(index, 1);
    setCrimes(updatedCrimes);
  };

  const handleEdit = (index: number) => {
    const crime = crimes[index];
    setCrimeName(crime.name);
    setCrimeCategory(crime.category);
    setCrimeDescription(crime.description);
    setEditIndex(index);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Delito"
          className="bg-slate-700 rounded-md p-2 mb-2 block placeholder-color"
          value={crimeName}
          onChange={(e) => setCrimeName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cargos"
          className="bg-slate-700 rounded-md p-2 mb-2 block placeholder-color"
          value={crimeCategory}
          onChange={(e) => setCrimeCategory(e.target.value)}
        />
        <textarea
          placeholder="Descripcion"
          className="bg-slate-700 rounded-md p-2 mb-2 block placeholder-color"
          value={crimeDescription}
          onChange={(e) => setCrimeDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {crimes.map((crime, index) => (
          <li key={index}>
            <strong>Delito:</strong> {crime.name} <br />
            <strong>Cargos:</strong> {crime.category} <br />
            <strong>Descripcion:</strong> {crime.description} <br /><br />
            <button onClick={() => handleDelete(index)}>Eliminar</button>
            <button onClick={() => handleEdit(index)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Page() {
  return (
    <div>
      <h1>Gestor de delitos</h1>
      <CrimeManagement />
    </div>
  );
}
