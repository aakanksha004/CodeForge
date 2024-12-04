import React from 'react';
import { Link } from 'react-router-dom';

const ProblemCard = ({ problem }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold">{problem.title}</h2>
      <p>{problem.description.substring(0, 100)}...</p>
      <Link to={`/problem/${problem.id}`} className="text-blue-500">Read more</Link>
    </div>
  );
};

export default ProblemCard;

