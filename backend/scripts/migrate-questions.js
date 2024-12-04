// scripts/migrate-questions.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Problem = require('../models/Problem');

dotenv.config();

const questions = 
    [
        {
          "title": "Two Sum",
          "description": "Given an array of integers, return the indices of the two numbers such that they add up to a specific target.",
          "input": "An array of integers and a target integer.",
          "output": "Indices of the two numbers that add up to the target.",
          "testCases": [
            {
              "input": "[2, 7, 11, 15], 9",
              "expectedOutput": "[0, 1]"
            },
            {
              "input": "[3, 2, 4], 6",
              "expectedOutput": "[1, 2]"
            },
            {
              "input": "[5, 3, 7, 8], 10",
              "expectedOutput": "[2, 3]"
            }
          ],
          "constraints": "Each input would have exactly one solution. You may not use the same element twice.",
          "tags": ["Array", "Hash Table"],
          "difficulty": "Easy",
          "solutions": {
            "youtube": [
              "https://youtube.com/watch?v=KLlXCFG5TnA",
             
            ],
            "resources": [
              "https://leetcode.com/articles/two-sum",
              "https://medium.com/@havbgbg68/leetcode-1-two-sum-python-solution-95b6c67f1c11"
            ]
          }
        },
        {
          "title": "Reverse Linked List",
          "description": "Reverse a singly linked list.",
          "input": "A singly linked list.",
          "output": "The reversed singly linked list.",
          "testCases": [
            {
              "input": "[1, 2, 3, 4, 5]",
              "expectedOutput": "[5, 4, 3, 2, 1]"
            }
          ],
          "constraints": "The list is guaranteed to have at least one element.",
          "tags": ["Linked List"],
          "difficulty": "Easy",
          "solutions": {
            "youtube": [
              "https://youtube.com/watch?v=G0_I-ZF0S38",

            ],
            "resources": [
              "https://leetcode.com/articles/reverse-linked-list",
              "https://www.geeksforgeeks.org/reverse-a-linked-list"
            ]
          }
        },
        {
          "title": "Find the Missing Number",
          "description": "Given an array of n-1 integers, where each integer is between 1 and n, find the missing number.",
          "input": "An array of n-1 integers.",
          "output": "The missing number.",
          "testCases": [
            {
              "input": "[1, 2, 4, 5, 6]",
              "expectedOutput": "3"
            }
          ],
          "constraints": "The integers in the array are unique and the missing number is within the range.",
          "tags": ["Array", "Mathematics"],
          "difficulty": "Easy",
          "solutions": {
            "youtube": [
              "https://youtube.com/watch?v=WnPLSRLSANE",

            ],
            "resources": [
              "https://www.geeksforgeeks.org/find-missing-number-array",
              "https://medium.com/@programming/finding-missing-numbers-in-an-array-48e3dca18195"
            ]
          }
        },
        {
          "title": "Palindrome String",
          "description": "Check whether a string is a palindrome.",
          "input": "A string.",
          "output": "True if the string is a palindrome, false otherwise.",
          "testCases": [
            {
              "input": "'madam'",
              "expectedOutput": "True"
            },
            {
                "input": "'codeforge'",
                "expectedOutput": "False"
              },
              {
                "input": "'hannah'",
                "expectedOutput": "True"
              },

          ],
          "constraints": "The string will only contain alphanumeric characters.",
          "tags": ["String", "Two Pointers"],
          "difficulty": "Easy",
          "solutions": {
            "youtube": [
              "https://youtube.com/watch?v=0sWShKIJoo4",

            ],
            "resources": [
              "https://www.geeksforgeeks.org/python-program-check-string-palindrome",
              "https://medium.com/techie-delight/top-coding-problems-on-palindromes-4ea7bb3214be"
            ]
          }
        },
        {
          "title": "Binary Search",
          "description": "Implement binary search on a sorted array.",
          "input": "A sorted array and a target value.",
          "output": "The index of the target value or -1 if not found.",
          "testCases": [
            {
              "input": "[1, 2, 3, 4, 5], 3",
              "expectedOutput": "2"
            }
          ],
          "constraints": "The input array is sorted in ascending order.",
          "tags": ["Array", "Binary Search"],
          "difficulty": "Easy",
          "solutions": {
            "youtube": [
              "https://youtube.com/watch?v=s4DPM8ct1pI",

            ],
            "resources": [
              "https://www.geeksforgeeks.org/binary-search",
              "https://leetcode.com/articles/binary-search"
            ]
          }
        },
        {
          "title": "Max Subarray Sum",
          "description": "Find the contiguous subarray within an array that has the largest sum.",
          "input": "An array of integers.",
          "output": "The largest sum of a contiguous subarray.",
          "testCases": [
            {
              "input": "[1, -2, 3, 4, -1, 2, 1, -5, 4]",
              "expectedOutput": "6"
            }
          ],
          "constraints": "The array has at least one element.",
          "tags": ["Array", "Dynamic Programming"],
          "difficulty": "Medium",
          "solutions": {
            "youtube": [
              "https://youtube.com/watch?v=5WZl3MMT0Eg",
            
            ],
            "resources": [
              "https://leetcode.com/articles/maximum-subarray",
              "https://www.geeksforgeeks.org/largest-sum-contiguous-subarray"
            ]
          }
        },
        {
          "title": "Merge Two Sorted Lists",
          "description": "Merge two sorted linked lists into one sorted linked list.",
          "input": "Two sorted linked lists.",
          "output": "A sorted linked list.",
          "testCases": [
            {
              "input": "[1, 2, 4], [1, 3, 4]",
              "expectedOutput": "[1, 1, 2, 3, 4, 4]"
            }
          ],
          "constraints": "The input lists are sorted in non-decreasing order.",
          "tags": ["Linked List", "Merge"],
          "difficulty": "Medium",
          "solutions": {
            "youtube": [
              "https://youtube.com/watch?v=XIdigk956u0",

            ],
            "resources": [
              "https://leetcode.com/articles/merge-two-sorted-lists",
              "https://www.geeksforgeeks.org/merge-two-sorted-linked-lists"
            ]
          }
        },
        {
          "title": "Valid Parentheses",
          "description": "Check if a given string containing parentheses is valid.",
          "input": "A string containing parentheses.",
          "output": "True if the string is valid, false otherwise.",
          "testCases": [
            {
              "input": "'()[]{}'",
              "expectedOutput": "True"
            }
          ],
          "constraints": "The string only contains characters '(', ')', '[', ']', '{', '}'.",
          "tags": ["Stack", "String"],
          "difficulty": "Easy",
          "solutions": {
            "youtube": [
              "https://youtube.com/watch?v=WTzjTskDFMg",
            
            ],
            "resources": [
              "https://leetcode.com/articles/valid-parentheses",
              "https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression"
            ]
          }
        },
        {
          "title": "Fibonacci Sequence",
          "description": "Generate the nth Fibonacci number.",
          "input": "An integer n.",
          "output": "The nth Fibonacci number.",
          "testCases": [
            {
              "input": "5",
              "expectedOutput": "5"
            }
          ],
          "constraints": "The input integer n is between 0 and 30.",
          "tags": ["Recursion", "Dynamic Programming"],
          "difficulty": "Easy",
          "solutions": {
            "youtube": [
              "https://youtube.com/watch?v=P8Xa2BitN3I",

            ],
            "resources": [
              "https://www.geeksforgeeks.org/program-for-nth-fibonacci-number",
              "https://medium.com/developers-writing/fibonacci-sequence-algorithm-in-javascript-b253dc7e320e"
            ]
          }
        },
        {
          "title": "Spiral Matrix",
          "description": "Given an m x n matrix, return all elements of the matrix in spiral order.",
          "input": "A 2D matrix of integers.",
          "output": "A list of integers in spiral order.",
          "testCases": [
            {
              "input": "[[1,2,3],[4,5,6],[7,8,9]]",
              "expectedOutput": "[1, 2, 3, 6, 9, 8, 7, 4, 5]"
            }
          ],
          "constraints": "m and n are between 1 and 10^4.",
          "tags": ["Matrix", "Array"],
          "difficulty": "Medium",
          "solutions": {
            "youtube": [
              "https://youtube.com/watch?v=1ZGJzvkcLsA",
             
            ],
            "resources": [
              "https://leetcode.com/articles/spiral-matrix",
              "https://www.geeksforgeeks.org/print-a-given-matrix-in-spiral-form"
            ]
          }
        },





        
            {
              "title": "Find Peak Element",
              "description": "A peak element is an element that is strictly greater than its neighbors. Find the index of any one peak element.",
              "input": "An array of integers.",
              "output": "Index of a peak element.",
              "testCases": [
                {
                  "input": "[1, 2, 3, 1]",
                  "expectedOutput": "2"
                },
                {
                  "input": "[1, 2, 1, 3, 5, 6, 4]",
                  "expectedOutput": "5"
                },
                {
                  "input": "[5, 4, 3, 2, 1]",
                  "expectedOutput": "0"
                }
              ],
              "constraints": "The array is non-empty, and a peak element always exists.",
              "tags": ["Array", "Binary Search"],
              "difficulty": "Medium",
              "solutions": {
                "youtube": [
                  "https://youtube.com/watch?v=5Dqjswb4JGg",
                  
                ],
                "resources": [
                  "https://leetcode.com/articles/find-peak-element",
                  "https://www.geeksforgeeks.org/find-a-peak-in-a-given-array"
                ]
              }
            },
            {
              "title": "Merge Intervals",
              "description": "Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals.",
              "input": "An array of intervals.",
              "output": "The merged intervals.",
              "testCases": [
                {
                  "input": "[[1,3],[2,6],[8,10],[15,18]]",
                  "expectedOutput": "[[1,6],[8,10],[15,18]]"
                },
                {
                  "input": "[[1,4],[4,5]]",
                  "expectedOutput": "[[1,5]]"
                },
                {
                  "input": "[[6,8],[1,9],[2,4],[4,7]]",
                  "expectedOutput": "[[1,9]]"
                }
              ],
              "constraints": "Intervals are represented as [start, end] where start <= end.",
              "tags": ["Array", "Sorting"],
              "difficulty": "Medium",
              "solutions": {
                "youtube": [
                  "https://youtube.com/watch?v=qKczfGUrFY4",
                 
                ],
                "resources": [
                  "https://leetcode.com/articles/merge-intervals",
                  "https://www.geeksforgeeks.org/merging-intervals"
                ]
              }
            },
            {
              "title": "Subsets",
              "description": "Given an integer array nums of unique elements, return all possible subsets (the power set).",
              "input": "An array of integers.",
              "output": "All subsets of the array.",
              "testCases": [
                {
                  "input": "[1,2,3]",
                  "expectedOutput": "[[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]"
                },
                {
                  "input": "[0]",
                  "expectedOutput": "[[],[0]]"
                },
                {
                  "input": "[1,2]",
                  "expectedOutput": "[[],[1],[2],[1,2]]"
                }
              ],
              "constraints": "The array contains unique integers.",
              "tags": ["Array", "Backtracking"],
              "difficulty": "Medium",
              "solutions": {
                "youtube": [
                  "https://youtube.com/watch?v=REOH22Xwdkk",
                 
                ],
                "resources": [
                  "https://leetcode.com/articles/subsets",
                  "https://www.geeksforgeeks.org/subsets-of-a-given-set"
                ]
              }
            },
            {
              "title": "Word Break",
              "description": "Given a string s and a dictionary of strings wordDict, determine if s can be segmented into a space-separated sequence of dictionary words.",
              "input": "A string and a word dictionary.",
              "output": "True if the string can be segmented, false otherwise.",
              "testCases": [
                {
                  "input": "'leetcode', ['leet', 'code']",
                  "expectedOutput": "True"
                },
                {
                  "input": "'applepenapple', ['apple', 'pen']",
                  "expectedOutput": "True"
                },
                {
                  "input": "'catsandog', ['cats', 'dog', 'sand', 'and', 'cat']",
                  "expectedOutput": "False"
                }
              ],
              "constraints": "All dictionary words are distinct.",
              "tags": ["Dynamic Programming", "String"],
              "difficulty": "Medium",
              "solutions": {
                "youtube": [
                  "https://youtube.com/watch?v=ptlwluzeC1I",
                 
                ],
                "resources": [
                  "https://leetcode.com/articles/word-break",
                  "https://www.geeksforgeeks.org/word-break-problem-dp-32"
                ]
              }
            },
            {
              "title": "Kth Largest Element",
              "description": "Find the kth largest element in an unsorted array.",
              "input": "An array of integers and an integer k.",
              "output": "The kth largest element.",
              "testCases": [
                {
                  "input": "[3,2,1,5,6,4], 2",
                  "expectedOutput": "5"
                },
                {
                  "input": "[3,2,3,1,2,4,5,5,6], 4",
                  "expectedOutput": "4"
                },
                {
                  "input": "[7,10,4,3,20,15, 3]",
                  "expectedOutput": "10"
                }
              ],
              "constraints": "1 <= k <= array length.",
              "tags": ["Array", "Heap", "Quick Select"],
              "difficulty": "Medium",
              "solutions": {
                "youtube": [
                  "https://youtube.com/watch?v=FrWq2rznPLQ",
                  
                ],
                "resources": [
                  "https://leetcode.com/articles/kth-largest-element-in-an-array",
                  "https://www.geeksforgeeks.org/kth-smallestlargest-element-unsorted-array"
                ]
              }
            },





            
                {
                  "title": "Rotate Array",
                  "description": "Given an array, rotate the array to the right by k steps, where k is non-negative.",
                  "input": "An array of integers and an integer k.",
                  "output": "The rotated array.",
                  "testCases": [
                    {
                      "input": "[1,2,3,4,5,6,7,3]",
                      "expectedOutput": "[5,6,7,1,2,3,4]"
                    },
                    {
                      "input": "[-1,-100,3,99], 2",
                      "expectedOutput": "[3,99,-1,-100]"
                    }
                  ],
                  "constraints": "1 <= k <= array length.",
                  "tags": ["Array", "Two Pointers"],
                  "difficulty": "Medium",
                  "solutions": {
                    "youtube": ["https://youtube.com/watch?v=BHr381Guz3Y"],
                    "resources": ["https://leetcode.com/articles/rotate-array"]
                  }
                },
                {
                  "title": "Climbing Stairs",
                  "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?",
                  "input": "An integer n.",
                  "output": "The number of distinct ways to climb the staircase.",
                  "testCases": [
                    {
                      "input": "2",
                      "expectedOutput": "2"
                    },
                    {
                      "input": "3",
                      "expectedOutput": "3"
                    }
                  ],
                  "constraints": "1 <= n <= 45.",
                  "tags": ["Dynamic Programming"],
                  "difficulty": "Easy",
                  "solutions": {
                    "youtube": ["https://youtube.com/watch?v=Y0lT9Fck7qI"],
                    "resources": ["https://leetcode.com/articles/climbing-stairs"]
                  }
                },
                {
                  "title": "3Sum",
                  "description": "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
                  "input": "An array of integers.",
                  "output": "All unique triplets that sum to zero.",
                  "testCases": [
                    {
                      "input": "[-1,0,1,2,-1,-4]",
                      "expectedOutput": "[[-1,-1,2],[-1,0,1]]"
                    },
                    {
                      "input": "[0,1,1]",
                      "expectedOutput": "[]"
                    }
                  ],
                  "constraints": "The array may contain duplicates.",
                  "tags": ["Array", "Two Pointers"],
                  "difficulty": "Medium",
                  "solutions": {
                    "youtube": ["https://youtube.com/watch?v=jzZsG8n2R9A"],
                    "resources": ["https://leetcode.com/articles/3sum"]
                  }
                },
                {
                  "title": "Valid Anagram",
                  "description": "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
                  "input": "Two strings s and t.",
                  "output": "True if t is an anagram of s, false otherwise.",
                  "testCases": [
                    {
                      "input": "'anagram', 'nagaram'",
                      "expectedOutput": "True"
                    },
                    {
                      "input": "'rat', 'car'",
                      "expectedOutput": "False"
                    }
                  ],
                  "constraints": "The strings consist of lowercase English letters.",
                  "tags": ["String", "Sorting"],
                  "difficulty": "Easy",
                  "solutions": {
                    "youtube": ["https://youtube.com/watch?v=9UtInBqnCgA"],
                    "resources": ["https://leetcode.com/articles/valid-anagram"]
                  }
                },
                {
                  "title": "Container With Most Water",
                  "description": "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
                  "input": "An array of integers.",
                  "output": "The maximum amount of water a container can store.",
                  "testCases": [
                    {
                      "input": "[1,8,6,2,5,4,8,3,7]",
                      "expectedOutput": "49"
                    },
                    {
                      "input": "[1,1]",
                      "expectedOutput": "1"
                    }
                  ],
                  "constraints": "n >= 2.",
                  "tags": ["Array", "Two Pointers"],
                  "difficulty": "Medium",
                  "solutions": {
                    "youtube": ["https://youtube.com/watch?v=UuiTKBwPgAo"],
                    "resources": ["https://leetcode.com/articles/container-with-most-water"]
                  }
                },
                {
                  "title": "Longest Palindromic Substring",
                  "description": "Given a string s, return the longest palindromic substring in s.",
                  "input": "A string s.",
                  "output": "The longest palindromic substring in s.",
                  "testCases": [
                    {
                      "input": "'babad'",
                      "expectedOutput": "'bab' or 'aba'"
                    },
                    {
                      "input": "'cbbd'",
                      "expectedOutput": "'bb'"
                    }
                  ],
                  "constraints": "The string consists of lowercase English letters.",
                  "tags": ["String", "Dynamic Programming"],
                  "difficulty": "Medium",
                  "solutions": {
                    "youtube": ["https://youtube.com/watch?v=XYQecbcd6_c"],
                    "resources": ["https://leetcode.com/articles/longest-palindromic-substring"]
                  }
                },
                {
                  "title": "Permutation in String",
                  "description": "Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.",
                  "input": "Two strings s1 and s2.",
                  "output": "True if s2 contains a permutation of s1, false otherwise.",
                  "testCases": [
                    {
                      "input": "'ab', 'eidbaooo'",
                      "expectedOutput": "True"
                    },
                    {
                      "input": "'ab', 'eidboaoo'",
                      "expectedOutput": "False"
                    }
                  ],
                  "constraints": "Both strings consist of lowercase English letters.",
                  "tags": ["String", "Sliding Window"],
                  "difficulty": "Medium",
                  "solutions": {
                    "youtube": ["https://youtube.com/watch?v=UbyhOgBN834"],
                    "resources": ["https://leetcode.com/articles/permutation-in-string"]
                  }
                },
                {
                  "title": "Search a 2D Matrix",
                  "description": "Write an efficient algorithm that searches for a value in an m x n matrix.",
                  "input": "A 2D matrix and a target value.",
                  "output": "True if the value exists in the matrix, false otherwise.",
                  "testCases": [
                    {
                      "input": "[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3",
                      "expectedOutput": "True"
                    },
                    {
                      "input": "[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13",
                      "expectedOutput": "False"
                    }
                  ],
                  "constraints": "Matrix rows are sorted in ascending order.",
                  "tags": ["Matrix", "Binary Search"],
                  "difficulty": "Medium",
                  "solutions": {
                    "youtube": ["https://youtube.com/watch?v=Ber2pi2C0j0"],
                    "resources": ["https://leetcode.com/articles/search-a-2d-matrix"]
                  }
                },



                    {
                      "title": "Word Ladder",
                      "description": "Given two words, beginWord and endWord, and a dictionary of words wordList, return the shortest transformation sequence length from beginWord to endWord.",
                      "input": "Two strings beginWord, endWord, and a list of strings wordList.",
                      "output": "The shortest transformation sequence length, or 0 if no transformation exists.",
                      "testCases": [
                        {
                          "input": "'hit', 'cog', ['hot','dot','dog','lot','log','cog']",
                          "expectedOutput": "5"
                        },
                        {
                          "input": "'hit', 'cog', ['hot','dot','dog','lot','log']",
                          "expectedOutput": "0"
                        }
                      ],
                      "constraints": "All words are of the same length.",
                      "tags": ["Graph", "BFS"],
                      "difficulty": "Hard",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=M9cVl4d0v04"],
                        "resources": ["https://leetcode.com/articles/word-ladder"]
                      }
                    },
                    {
                      "title": "Top K Frequent Elements",
                      "description": "Given an integer array nums and an integer k, return the k most frequent elements.",
                      "input": "An array nums and an integer k.",
                      "output": "The k most frequent elements.",
                      "testCases": [
                        {
                          "input": "[1,1,1,2,2,3], 2",
                          "expectedOutput": "[1,2]"
                        },
                        {
                          "input": "[1], 1",
                          "expectedOutput": "[1]"
                        }
                      ],
                      "constraints": "The array length is at most 10^5.",
                      "tags": ["Heap", "Priority Queue"],
                      "difficulty": "Medium",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=YPTqKIgVk-k"],
                        "resources": ["https://leetcode.com/articles/top-k-frequent-elements"]
                      }
                    },
                    {
                      "title": "Minimum Path Sum",
                      "description": "Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.",
                      "input": "A 2D grid.",
                      "output": "The minimum path sum.",
                      "testCases": [
                        {
                          "input": "[[1,3,1],[1,5,1],[4,2,1]]",
                          "expectedOutput": "7"
                        },
                        {
                          "input": "[[1,2,3],[4,5,6]]",
                          "expectedOutput": "12"
                        }
                      ],
                      "constraints": "m and n are at most 200.",
                      "tags": ["Dynamic Programming"],
                      "difficulty": "Medium",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=lBRtnuxg-gU"],
                        "resources": ["https://leetcode.com/articles/minimum-path-sum"]
                      }
                    },
                    {
                      "title": "Evaluate Reverse Polish Notation",
                      "description": "Evaluate the value of an arithmetic expression in Reverse Polish Notation.",
                      "input": "An array of strings tokens representing the RPN expression.",
                      "output": "The evaluation result.",
                      "testCases": [
                        {
                          "input": "['2','1','+','3','*']",
                          "expectedOutput": "9"
                        },
                        {
                          "input": "['4','13','5','/','+']",
                          "expectedOutput": "6"
                        }
                      ],
                      "constraints": "The tokens array length is at most 10^4.",
                      "tags": ["Stack"],
                      "difficulty": "Medium",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=MeRb_1bddWg"],
                        "resources": ["https://leetcode.com/articles/evaluate-reverse-polish-notation"]
                      }
                    },
                    {
                      "title": "Course Schedule",
                      "description": "There are a total of numCourses courses you have to take. Some courses have prerequisites. Determine if you can finish all courses.",
                      "input": "An integer numCourses and a list prerequisites.",
                      "output": "True if all courses can be finished, otherwise false.",
                      "testCases": [
                        {
                          "input": "2, [[1,0]]",
                          "expectedOutput": "True"
                        },
                        {
                          "input": "2, [[1,0],[0,1]]",
                          "expectedOutput": "False"
                        }
                      ],
                      "constraints": "The number of courses is at most 2000.",
                      "tags": ["Graph", "Topological Sort"],
                      "difficulty": "Medium",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=EgI5nU9etnU"],
                        "resources": ["https://leetcode.com/articles/course-schedule"]
                      }
                    },
                    {
                      "title": "Kth Largest Element in an Array",
                      "description": "Find the kth largest element in an unsorted array.",
                      "input": "An array nums and an integer k.",
                      "output": "The kth largest element.",
                      "testCases": [
                        {
                          "input": "[3,2,1,5,6,4], 2",
                          "expectedOutput": "5"
                        },
                        {
                          "input": "[3,2,3,1,2,4,5,5,6], 4",
                          "expectedOutput": "4"
                        }
                      ],
                      "constraints": "The array length is at most 10^4.",
                      "tags": ["Heap", "Priority Queue"],
                      "difficulty": "Medium",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=XEmy13g1Qxc"],
                        "resources": ["https://leetcode.com/articles/kth-largest-element-in-an-array"]
                      }
                    },
                    {
                      "title": "Rotting Oranges",
                      "description": "In a grid, each cell can have three values: 0 (empty), 1 (fresh orange), or 2 (rotten orange). Determine the minimum time to rot all oranges.",
                      "input": "A 2D grid.",
                      "output": "The minimum number of minutes to rot all oranges, or -1 if not possible.",
                      "testCases": [
                        {
                          "input": "[[2,1,1],[1,1,0],[0,1,1]]",
                          "expectedOutput": "4"
                        },
                        {
                          "input": "[[2,1,1],[0,1,1],[1,0,1]]",
                          "expectedOutput": "-1"
                        }
                      ],
                      "constraints": "The grid size is at most 10^4.",
                      "tags": ["Graph", "BFS"],
                      "difficulty": "Medium",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=y704fEOx0s0"],
                        "resources": ["https://leetcode.com/articles/rotting-oranges"]
                      }
                    },
                    {
                      "title": "Subsets",
                      "description": "Given an integer array nums of unique elements, return all possible subsets (the power set).",
                      "input": "An array nums.",
                      "output": "All possible subsets.",
                      "testCases": [
                        {
                          "input": "[1,2,3]",
                          "expectedOutput": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]"
                        },
                        {
                          "input": "[0]",
                          "expectedOutput": "[[],[0]]"
                        }
                      ],
                      "constraints": "The length of nums is at most 10.",
                      "tags": ["Backtracking"],
                      "difficulty": "Medium",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=REOH22Xwdkk"],
                        "resources": ["https://leetcode.com/articles/subsets"]
                      }
                    },
                    {
                      "title": "Find Minimum in Rotated Sorted Array",
                      "description": "Find the minimum element in a rotated sorted array.",
                      "input": "An array nums.",
                      "output": "The minimum element.",
                      "testCases": [
                        {
                          "input": "[3,4,5,1,2]",
                          "expectedOutput": "1"
                        },
                        {
                          "input": "[4,5,6,7,0,1,2]",
                          "expectedOutput": "0"
                        }
                      ],
                      "constraints": "The array has no duplicates.",
                      "tags": ["Binary Search"],
                      "difficulty": "Medium",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=nIVW4P8b1VA"],
                        "resources": ["https://leetcode.com/articles/find-minimum-in-rotated-sorted-array"]
                      }
                    },
                    {
                      "title": "N-Queens",
                      "description": "The n-queens puzzle is the problem of placing n queens on an n x n chessboard so that no two queens attack each other.",
                      "input": "An integer n.",
                      "output": "All distinct solutions to the n-queens puzzle.",
                      "testCases": [
                        {
                          "input": "4",
                          "expectedOutput": "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"], [\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]"
                        },
                        {
                          "input": "1",
                          "expectedOutput": "[[\"Q\"]]"
                        }
                      ],
                      "constraints": "1 ≤ n ≤ 9.",
                      "tags": ["Backtracking"],
                      "difficulty": "Hard",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=xFv_Hl4B83A"],
                        "resources": ["https://leetcode.com/articles/n-queens"]
                      }
                    },
                  



                    {
                      "title": "Climbing Stairs",
                      "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?",
                      "input": "An integer n.",
                      "output": "The number of distinct ways to climb the staircase.",
                      "testCases": [
                        {
                          "input": "2",
                          "expectedOutput": "2"
                        },
                        {
                          "input": "3",
                          "expectedOutput": "3"
                        }
                      ],
                      "constraints": "1 <= n <= 45.",
                      "tags": ["Dynamic Programming"],
                      "difficulty": "Easy",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=Y0lT9Fck7qI"],
                        "resources": ["https://leetcode.com/articles/climbing-stairs"]
                      }
                    },
                    {
                      "title": "Longest Increasing Subsequence",
                      "description": "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
                      "input": "An array of integers nums.",
                      "output": "The length of the longest increasing subsequence.",
                      "testCases": [
                        {
                          "input": "[10,9,2,5,3,7,101,18]",
                          "expectedOutput": "4"
                        },
                        {
                          "input": "[0,1,0,3,2,3]",
                          "expectedOutput": "4"
                        }
                      ],
                      "constraints": "The array length is at most 2500.",
                      "tags": ["Dynamic Programming"],
                      "difficulty": "Medium",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=cjWnW0hdF1Y"],
                        "resources": ["https://leetcode.com/articles/longest-increasing-subsequence"]
                      }
                    },
                    {
                      "title": "Coin Change",
                      "description": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins needed to make up that amount.",
                      "input": "An array of integers coins and an integer amount.",
                      "output": "The minimum number of coins required to make up the amount.",
                      "testCases": [
                        {
                          "input": "[1,2,5], 11",
                          "expectedOutput": "3"
                        },
                        {
                          "input": "[2], 3",
                          "expectedOutput": "-1"
                        }
                      ],
                      "constraints": "1 <= amount <= 10^4.",
                      "tags": ["Dynamic Programming"],
                      "difficulty": "Medium",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=H9bfqozjoqs"],
                        "resources": ["https://leetcode.com/articles/coin-change"]
                      }
                    },
                    {
                      "title": "Word Break",
                      "description": "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of dictionary words.",
                      "input": "A string s and a list of strings wordDict.",
                      "output": "True if the string can be segmented, false otherwise.",
                      "testCases": [
                        {
                          "input": "'leetcode', ['leet', 'code']",
                          "expectedOutput": "True"
                        },
                        {
                          "input": "'catsandog', ['cats', 'dog', 'sand', 'and', 'cat']",
                          "expectedOutput": "False"
                        }
                      ],
                      "constraints": "The length of s is at most 300.",
                      "tags": ["Dynamic Programming"],
                      "difficulty": "Medium",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=ptlwluzeC1I"],
                        "resources": ["https://leetcode.com/articles/word-break"]
                      }
                    },
                    {
                      "title": "Unique Paths",
                      "description": "A robot is located at the top-left corner of a m x n grid. It can move either down or right at any point in time. Find the number of unique paths to reach the bottom-right corner.",
                      "input": "Two integers m and n.",
                      "output": "The number of unique paths.",
                      "testCases": [
                        {
                          "input": "3, 7",
                          "expectedOutput": "28"
                        },
                        {
                          "input": "3, 2",
                          "expectedOutput": "3"
                        }
                      ],
                      "constraints": "1 <= m, n <= 100.",
                      "tags": ["Dynamic Programming"],
                      "difficulty": "Medium",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=IlEsdxuD4lY"],
                        "resources": ["https://leetcode.com/articles/unique-paths"]
                      }
                    },
                    {
                      "title": "Flood Fill",
                      "description": "An image is represented by an m x n integer grid image where image[i][j] represents the pixel value. Perform a flood fill starting from pixel (sr, sc).",
                      "input": "A 2D grid image, integers sr, sc, and newColor.",
                      "output": "The modified image after flood fill.",
                      "testCases": [
                        {
                          "input": "[[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2",
                          "expectedOutput": "[[2,2,2],[2,2,0],[2,0,1]]"
                        },
                        {
                          "input": "[[0,0,0],[0,1,1]], 1, 1, 1",
                          "expectedOutput": "[[0,0,0],[0,1,1]]"
                        }
                      ],
                      "constraints": "The dimensions of the image are at most 50 x 50.",
                      "tags": ["Graph", "DFS"],
                      "difficulty": "Easy",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=C-2_uSRli8o"],
                        "resources": ["https://leetcode.com/articles/flood-fill"]
                      }
                    },
                    {
                      "title": "Network Delay Time",
                      "description": "There are n network nodes labeled from 1 to n. A list times is given, where times[i] = (ui, vi, wi) represents the time it takes for a signal to travel from ui to vi. Find the time it takes for all nodes to receive the signal.",
                      "input": "An integer n, an integer k, and a list times.",
                      "output": "The time it takes for all nodes to receive the signal, or -1 if it is impossible.",
                      "testCases": [
                        {
                          "input": "4, [[2,1,1],[2,3,1],[3,4,1]], 2",
                          "expectedOutput": "2"
                        },
                        {
                          "input": "2, [[1,2,1]], 1",
                          "expectedOutput": "1"
                        }
                      ],
                      "constraints": "1 <= n <= 100.",
                      "tags": ["Graph", "Dijkstra"],
                      "difficulty": "Medium",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=EaphyqKU4PQ"],
                        "resources": ["https://leetcode.com/articles/network-delay-time"]
                      }
                    },
                    {
                      "title": "Find the Town Judge",
                      "description": "In a town, there are n people labeled from 1 to n. If the town judge exists, they trust nobody, and everybody trusts them. Find the judge if it exists.",
                      "input": "An integer n and a list trust.",
                      "output": "The label of the town judge, or -1 if it doesn't exist.",
                      "testCases": [
                        {
                          "input": "2, [[1,2]]",
                          "expectedOutput": "2"
                        },
                        {
                          "input": "3, [[1,3],[2,3]]",
                          "expectedOutput": "3"
                        }
                      ],
                      "constraints": "1 <= n <= 1000.",
                      "tags": ["Graph"],
                      "difficulty": "Easy",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=Zn_9R43R9Wg"],
                        "resources": ["https://leetcode.com/articles/find-the-town-judge"]
                      }
                    },
                    {
                      "title": "Sliding Window Maximum",
                      "description": "You are given an array of integers nums, and there is a sliding window of size k which is moving from the leftmost part of the array to the rightmost. Return the maximum of each window.",
                      "input": "An array nums and an integer k.",
                      "output": "The maximum of each sliding window.",
                      "testCases": [
                        {
                          "input": "[1,3,-1,-3,5,3,6,7], 3",
                          "expectedOutput": "[3,3,5,5,6,7]"
                        },
                        {
                          "input": "[1], 1",
                          "expectedOutput": "[1]"
                        }
                      ],
                      "constraints": "1 <= k <= nums.length.",
                      "tags": ["Queue", "Sliding Window"],
                      "difficulty": "Hard",
                      "solutions": {
                        "youtube": ["https://youtube.com/watch?v=DfljaUwZsOk"],
                        "resources": ["https://leetcode.com/articles/sliding-window-maximum"]
                      }
                    },
                    
                        {
                          "title": "Word Search II",
                          "description": "Given a 2D board and a list of words from the dictionary, find all words that can be formed by sequentially adjacent letters.",
                          "input": "A 2D character board and a list of strings words.",
                          "output": "A list of words found in the board.",
                          "testCases": [
                            {
                              "input": "[['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']], ['oath','pea','eat','rain']",
                              "expectedOutput": "['oath','eat']"
                            },
                            {
                              "input": "[['a','b'],['c','d']], ['abcd']",
                              "expectedOutput": "[]"
                            }
                          ],
                          "constraints": "The board and words have at most 10^4 elements.",
                          "tags": ["Backtracking", "Trie"],
                          "difficulty": "Hard",
                          "solutions": {
                            "youtube": ["https://youtube.com/watch?v=asbcE9mZz_U"],
                            "resources": ["https://leetcode.com/articles/word-search-ii"]
                          }
                        },
                        {
                          "title": "Trapping Rain Water",
                          "description": "Given n non-negative integers representing the elevation map, compute how much water it can trap after raining.",
                          "input": "An array of integers height.",
                          "output": "The total amount of trapped water.",
                          "testCases": [
                            {
                              "input": "[0,1,0,2,1,0,1,3,2,1,2,1]",
                              "expectedOutput": "6"
                            },
                            {
                              "input": "[4,2,0,3,2,5]",
                              "expectedOutput": "9"
                            }
                          ],
                          "constraints": "The array length is at most 3 * 10^4.",
                          "tags": ["Two Pointers", "Stack"],
                          "difficulty": "Hard",
                          "solutions": {
                            "youtube": ["https://youtube.com/watch?v=ZI2z5pq0TqA"],
                            "resources": ["https://leetcode.com/articles/trapping-rain-water"]
                          }
                        },
                        {
                          "title": "Longest Valid Parentheses",
                          "description": "Given a string containing just the characters '(' and ')', find the length of the longest valid parentheses substring.",
                          "input": "A string s.",
                          "output": "The length of the longest valid parentheses substring.",
                          "testCases": [
                            {
                              "input": "'(()'",
                              "expectedOutput": "2"
                            },
                            {
                              "input": "')()())'",
                              "expectedOutput": "4"
                            }
                          ],
                          "constraints": "The string length is at most 10^4.",
                          "tags": ["Dynamic Programming", "Stack"],
                          "difficulty": "Hard",
                          "solutions": {
                            "youtube": ["https://youtube.com/watch?v=VdQuwtEd10M"],
                            "resources": ["https://leetcode.com/articles/longest-valid-parentheses"]
                          }
                        },
                        {
                          "title": "Minimum Window Substring",
                          "description": "Given two strings s and t, return the minimum window in s which will contain all the characters in t.",
                          "input": "Two strings s and t.",
                          "output": "The minimum window substring in s containing all characters of t.",
                          "testCases": [
                            {
                              "input": "'ADOBECODEBANC', 'ABC'",
                              "expectedOutput": "'BANC'"
                            },
                            {
                              "input": "'a', 'a'",
                              "expectedOutput": "'a'"
                            }
                          ],
                          "constraints": "The length of s is at most 10^5.",
                          "tags": ["Sliding Window", "Hash Table"],
                          "difficulty": "Hard",
                          "solutions": {
                            "youtube": ["https://youtube.com/watch?v=jSto0O4AJbM"],
                            "resources": ["https://leetcode.com/articles/minimum-window-substring"]
                          }
                        },
                        {
                          "title": "Regular Expression Matching",
                          "description": "Implement regular expression matching with support for '.' and '*'.",
                          "input": "Two strings s and p.",
                          "output": "True if the strings match, otherwise false.",
                          "testCases": [
                            {
                              "input": "'aa', 'a*'",
                              "expectedOutput": "True"
                            },
                            {
                              "input": "'mississippi', 'mis*is*p*.'",
                              "expectedOutput": "False"
                            }
                          ],
                          "constraints": "The lengths of s and p are at most 1000.",
                          "tags": ["Dynamic Programming", "Recursion"],
                          "difficulty": "Hard",
                          "solutions": {
                            "youtube": ["https://youtube.com/watch?v=l3hda49XcDE"],
                            "resources": ["https://leetcode.com/articles/regular-expression-matching"]
                          }
                        },
                        {
                          "title": "Maximal Rectangle",
                          "description": "Given a binary matrix, find the largest rectangle containing only 1's and return its area.",
                          "input": "A binary matrix.",
                          "output": "The area of the largest rectangle.",
                          "testCases": [
                            {
                              "input": "[['1','0','1','0','0'],['1','0','1','1','1'],['1','1','1','1','1'],['1','0','0','1','0']]",
                              "expectedOutput": "6"
                            },
                            {
                              "input": "[['0']]",
                              "expectedOutput": "0"
                            }
                          ],
                          "constraints": "The matrix size is at most 200 x 200.",
                          "tags": ["Dynamic Programming", "Stack"],
                          "difficulty": "Hard",
                          "solutions": {
                            "youtube": ["https://youtube.com/watch?v=xsI1NgF9X2I"],
                            "resources": ["https://leetcode.com/articles/maximal-rectangle"]
                          }
                        },
                        {
                          "title": "Edit Distance",
                          "description": "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.",
                          "input": "Two strings word1 and word2.",
                          "output": "The minimum number of operations.",
                          "testCases": [
                            {
                              "input": "'horse', 'ros'",
                              "expectedOutput": "3"
                            },
                            {
                              "input": "'intention', 'execution'",
                              "expectedOutput": "5"
                            }
                          ],
                          "constraints": "The lengths of word1 and word2 are at most 500.",
                          "tags": ["Dynamic Programming"],
                          "difficulty": "Hard",
                          "solutions": {
                            "youtube": ["https://youtube.com/watch?v=We3YDTzNXEk"],
                            "resources": ["https://leetcode.com/articles/edit-distance"]
                          }
                        },
                        {
                          "title": "Shortest Path in a Grid with Obstacles Elimination",
                          "description": "Find the shortest path in a grid with at most k obstacles.",
                          "input": "A 2D grid and an integer k.",
                          "output": "The shortest path length, or -1 if no path exists.",
                          "testCases": [
                            {
                              "input": "[[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], 1",
                              "expectedOutput": "6"
                            },
                            {
                              "input": "[[0,1,1],[1,1,1],[1,0,0]], 1",
                              "expectedOutput": "-1"
                            }
                          ],
                          "constraints": "The grid size is at most 40 x 40.",
                          "tags": ["Graph", "BFS"],
                          "difficulty": "Hard",
                          "solutions": {
                            "youtube": ["https://youtube.com/watch?v=JdgYSKQelLI"],
                            "resources": ["https://leetcode.com/articles/shortest-path-in-a-grid-with-obstacles-elimination"]
                          }
                        },
                        {
                          "title": "Skyline Problem",
                          "description": "Given the buildings, output the skyline formed by these buildings.",
                          "input": "A list of buildings, where each building is represented as [left, right, height].",
                          "output": "The critical points in the skyline.",
                          "testCases": [
                            {
                              "input": "[[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]",
                              "expectedOutput": "[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]"
                            },
                            {
                              "input": "[[0,2,3],[2,5,3]]",
                              "expectedOutput": "[[0,3],[5,0]]"
                            }
                          ],
                          "constraints": "The number of buildings is at most 10^4.",
                          "tags": ["Heap", "Divide and Conquer"],
                          "difficulty": "Hard",
                          "solutions": {
                            "youtube": ["https://youtube.com/watch?v=GSBLe8cKu0s"],
                            "resources": ["https://leetcode.com/articles/the-skyline-problem"]
                          }
                        },
                        {
                          "title": "Burst Balloons",
                          "description": "Given n balloons, return the maximum coins you can collect by bursting the balloons wisely.",
                          "input": "An array of integers nums.",
                          "output": "The maximum coins.",
                          "testCases": [
                            {
                              "input": "[3,1,5,8]",
                              "expectedOutput": "167"
                            },
                            {
                              "input": "[1,5]",
                              "expectedOutput": "10"
                            }
                          ],
                          "constraints": "The array length is at most 500.",
                          "tags": ["Dynamic Programming"],
                          "difficulty": "Hard",
                          "solutions": {
                            "youtube": ["https://youtube.com/watch?v=z3hu2Be92UA"],
                            "resources": ["https://leetcode.com/articles/burst-balloons"]
                          }
                        }
                      
                      
              
              
          
          
      ]
async function migrateQuestions() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing questions
    await Problem.deleteMany({});
    console.log('Cleared existing questions');

    // Insert new questions
    const result = await Problem.insertMany(questions);
    console.log(`Successfully migrated ${result.length} questions`);

    // Log the IDs for reference
    result.forEach((problem, index) => {
      console.log(`${problem.title}: ${problem._id}`);
    });

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

migrateQuestions();