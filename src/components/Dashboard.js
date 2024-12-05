import React, { useEffect, useState } from 'react';
import { getAllProblems,checkSolutionStatus } from '../api';
import Header from './Header';
import { Link } from 'react-router-dom';
import backgroundImage from '../bg2.jpg';
import { FaSearch, FaStar, FaRegStar, FaCheck, FaTimes, FaTags,FaSync } from 'react-icons/fa';
import { IoAddCircleOutline } from "react-icons/io5";
import WelcomeSection from './WelcomeSection';

const Dashboard = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showTagFilter, setShowTagFilter] = useState(false);
  const [tagSearchQuery, setTagSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showStarred, setShowStarred] = useState(false); // Track "Starred" filter state
  const problemsPerPage = 15;

  const predefinedTags = ['Array', 'Dynamic Programming', 'Graph', 'Sorting', 'HashMap', 'Heap', 'Greedy'];
  
  const handleRefresh = () => {
    setSearchQuery('');
    setSelectedDifficulty('');
    setShowStarred(false);
  
  };

  const loadStarredProblems = () => {
    try {
      const starredProblems = JSON.parse(localStorage.getItem('starredProblems')) || {};
      return starredProblems;
    } catch (error) {
      console.error('Error loading starred problems:', error);
      return {};
    }
  };

  // Save starred problems to localStorage
  const saveStarredProblems = (starredProblems) => {
    try {
      localStorage.setItem('starredProblems', JSON.stringify(starredProblems));
    } catch (error) {
      console.error('Error saving starred problems:', error);
    }
  };





  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data = await getAllProblems();
        const starredProblems = loadStarredProblems();
        
        const problemsWithStatus = await Promise.all(data.map(async (problem, index) => {
          const id = problem.id || `problem-${index}`;
          const isSolved = await checkSolutionStatus(id);
          
          return {
            ...problem,
            id,
            solved: isSolved,
            starred: !!starredProblems[id]
          };
        }));
        setProblems(problemsWithStatus);
      } catch (error) {
        console.error('Error fetching problems:', error);
        setProblems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleDifficultyFilter = (e) => {
    setSelectedDifficulty(e.target.value);
    setCurrentPage(1);
  };

  const toggleTagFilter = () => {
    setShowTagFilter(!showTagFilter);
  };

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredTags = predefinedTags.filter(tag =>
    tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
  );

  const toggleStarredFilter = () => {
    setShowStarred(!showStarred);
    setCurrentPage(1);
  };
  const toggleStar = (problemId, e) => {
    e.stopPropagation();
    
    setProblems(prevProblems => {
      const newProblems = prevProblems.map(problem => {
        if (problem.id === problemId) {
          return { ...problem, starred: !problem.starred };
        }
        return problem;
      });
      
      // Update localStorage with all starred problems
      const starredProblems = {};
      newProblems.forEach(problem => {
        if (problem.starred) {
          starredProblems[problem.id] = true;
        }
      });
      
      saveStarredProblems(starredProblems);
      return newProblems;
    });
  };

  const filteredProblems = problems.filter(problem => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery) ||
      problem.difficulty.toLowerCase().includes(searchQuery);
    const matchesDifficulty =
      selectedDifficulty === '' ||
      problem.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesTags =
      selectedTags.length === 0 ||
      (problem.tags && selectedTags.every((tag) => problem.tags.includes(tag)));
    const matchesStarred = !showStarred || problem.starred;

    return matchesSearch && matchesDifficulty && matchesTags && matchesStarred;
  });

  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem);
  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getDifficultyColor = (difficulty) => {
    const lowerDifficulty = difficulty.toLowerCase();
    switch (lowerDifficulty) {
      case 'easy':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'hard':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  if (loading) {
    return <div className="text-white">Loading problems...</div>;
  }

  return (
    <>
      <Header />
      <div 
        className="min-h-screen text-white p-8 z-9"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >

      {/* <div className="bg-gray-900 min-h-screen text-white p-8"> */}
      <WelcomeSection/>
      <div className="flex justify-center mb-5">
  
       <Link to="/design-question">
         <button className="relative group bg-gradient-to-r from-[#007bff] via-[#00d4ff] to-gray-800 text-white rounded-xl shadow-md p-4 text-xl font-semibold overflow-hidden">
          <div className="absolute inset-0 w-0 bg-gradient-to-r from-[#55a2f4] via-[#3394a8] to-cyan-400 transition-all duration-500 ease-out group-hover:w-full" />
    <span className="flex items-center gap-2 relative z-10">
             <IoAddCircleOutline className="w-6 h-6" />
             Design a Question
           </span>
         </button>
       </Link>
     </div>


        {/* Search Bar and Filter */}
        <div className="mb-6 flex gap-4 items-center relative mt-8">
        
        <div className="relative inline-block">
      <div className="relative group overflow-hidden rounded-3xl ml-20">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-indigo-500 to-indigo-600" />
        
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 w-0 bg-gradient-to-r from-indigo-900 via-purple-600 to-indigo-700 transition-all duration-500 ease-out group-hover:w-full" />
        
        {/* Select element */}
        <select
          value={selectedDifficulty}
          onChange={handleDifficultyFilter}
          className="relative z-10 appearance-none bg-transparent text-white p-3 pr-8 w-full cursor-pointer focus:outline-none"
        >
          <option value="" className="bg-indigo-800">All Difficulties</option>
          <option value="easy" className="bg-indigo-800">Easy</option>
          <option value="medium" className="bg-indigo-800">Medium</option>
          <option value="hard" className="bg-indigo-800">Hard</option>
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
    

          <button
  onClick={toggleTagFilter}
  className="relative group overflow-hidden text-white p-3 rounded-3xl flex items-center gap-2 bg-gradient-to-r from-purple-600 via-indigo-700 to-indigo-900"
>
  <div className="absolute inset-0 w-0 bg-gradient-to-r from-indigo-900 via-purple-600 to-indigo-700 transition-all duration-500 ease-out group-hover:w-full" />
  <span className="flex items-center gap-2 relative z-10">
    <FaTags />
    Filter by Tags
  </span>
</button>


          <div className="flex items-center bg-gray-800 p-3 rounded-3xl w-2/4 ml-2">
            <FaSearch className="text-white mr-3" />
            <input
              type="text"
              placeholder="Search for problems..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full bg-transparent text-white focus:outline-none"
            />
          </div>
          <button
        onClick={toggleStarredFilter}
        className={`relative group overflow-hidden text-white p-3 rounded-3xl flex items-center gap-2 ${
          showStarred ? 'bg-gradient-to-r from-purple-600 via-indigo-700 to-indigo-900' : 'bg-gradient-to-r from-purple-600 via-indigo-700 to-indigo-900'
        }`}
      >
        <div className="absolute inset-0 w-0 bg-gradient-to-r from-indigo-900 via-purple-600 to-indigo-700 transition-all duration-500 ease-out group-hover:w-full" />
        <span className="flex items-center gap-2 relative z-10">
          <FaStar className="w-4 h-4" />
          Show Starred
        </span>
      </button>
         
          
          <button
        onClick={handleRefresh}
        className="relative group overflow-hidden text-white p-3 rounded-3xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-700 to-indigo-900" />
        <div className="absolute inset-0 w-0 bg-gradient-to-r from-indigo-900 via-purple-600 to-indigo-700 transition-all duration-500 ease-out group-hover:w-full" />
        <span className="flex items-center relative z-10">
          <FaSync className="w-4 h-4" />
        </span>
      </button>

          {/* Tag Filter Popup */}
          {showTagFilter && (
            <div className="absolute top-[108%] left-[12%] bg-indigo-400 p-4 rounded-lg shadow-lg w-96">
              <div className="flex items-center bg-white p-2 rounded-md mb-4">
                <FaSearch className="text-black mr-2" />
                <input
                  type="text"
                  placeholder="Search tags..."
                  value={tagSearchQuery}
                  onChange={(e) => setTagSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-black focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {filteredTags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 rounded-full ${
                      selectedTags.includes(tag) ? 'bg-gray-800' : 'bg-indigo-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <button
                onClick={toggleTagFilter}
                className="bg-indigo-600 px-4 py-2 rounded-lg mt-4 w-full"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Problems Table */}
        <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-md p-6">
          <table className="min-w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase bg-gray-700">
              <tr>
              <th className="px-6 py-3">Star</th>
                <th className="px-6 py-3">Problem</th>
                <th className="px-6 py-3">Solution</th>
                <th className="px-6 py-3">Resources</th>
                <th className="px-6 py-3">Difficulty</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentProblems.length > 0 ? (
                currentProblems.map((problem, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-800">
                     <td className="px-6 py-4">
                      <span
                        className="cursor-pointer text-yellow-500"
                        onClick={(e) => toggleStar(problem.id,e)}
                      >
                        {problem.starred ? <FaStar /> : <FaRegStar />}
                      </span>
                    </td>
                   
                   
                    <td className="px-6 py-4">
                      <Link
                        to={`/problem/${problem.id}`}
                        state={{ problem }}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        {problem.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
              {problem.solutions?.youtube?.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {problem.solutions.youtube.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 hover:text-red-600 flex items-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      Solution 
                    </a>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">No videos</span>
              )}
            </td>
            <td className="px-6 py-4">
              {problem.solutions?.resources?.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {problem.solutions.resources.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Resource 
                    </a>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">No resources</span>
              )}
            </td>
                    <td className={`px-6 py-4 font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </td>
                  
                    <td className="px-6 py-4">
                      {problem.solved ? (
                        <span className="text-green-500 flex items-center">
                          <FaCheck className="mr-1" /> Solved
                        </span>
                      ) : (
                        <span className="text-red-500 flex items-center">
                          <FaTimes className="mr-1" /> Unsolved
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">No problems found.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {filteredProblems.length > problemsPerPage && (
            <div className="flex justify-center mt-4 gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-600"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(number => Math.abs(currentPage - number) <= 2 || number === 1 || number === totalPages)
                .map((number, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === number ? 'bg-indigo-600' : 'bg-indigo-500 hover:bg-indigo-600'
                    }`}
                  >
                    {number}
                  </button>
                ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
