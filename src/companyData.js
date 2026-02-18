export const topicBank = {
  "Array": [
    { title: "Two Sum", difficulty: "Easy" }, { title: "Best Time to Buy and Sell Stock", difficulty: "Easy" },
    { title: "Contains Duplicate", difficulty: "Easy" }, { title: "Product of Array Except Self", difficulty: "Medium" },
    { title: "Maximum Subarray", difficulty: "Medium" }, { title: "3Sum", difficulty: "Medium" },
    { title: "Subarray Sum Equals K", difficulty: "Medium" }, { title: "Merge Intervals", difficulty: "Medium" },
    { title: "Trapping Rain Water", difficulty: "Hard" }, { title: "First Missing Positive", difficulty: "Hard" }
  ],
  "String": [
    { title: "Valid Palindrome", difficulty: "Easy" }, { title: "Valid Anagram", difficulty: "Easy" },
    { title: "Longest Substring Without Repeating Characters", difficulty: "Medium" }, { title: "Longest Palindromic Substring", difficulty: "Medium" },
    { title: "String to Integer (atoi)", difficulty: "Medium" }, { title: "Group Anagrams", difficulty: "Medium" },
    { title: "Simplify Path", difficulty: "Medium" }, { title: "Generate Parentheses", difficulty: "Medium" },
    { title: "Minimum Window Substring", difficulty: "Hard" }, { title: "Text Justification", difficulty: "Hard" }
  ],
  "Strings": [ // Alias for String
    { title: "Valid Palindrome", difficulty: "Easy" }, { title: "Valid Anagram", difficulty: "Easy" },
    { title: "Longest Substring Without Repeating Characters", difficulty: "Medium" }, { title: "Group Anagrams", difficulty: "Medium" }
  ],
  "Dynamic Programming": [
    { title: "Climbing Stairs", difficulty: "Easy" }, { title: "Coin Change", difficulty: "Medium" },
    { title: "Longest Increasing Subsequence", difficulty: "Medium" }, { title: "Word Break", difficulty: "Medium" },
    { title: "House Robber", difficulty: "Medium" }, { title: "Partition Equal Subset Sum", difficulty: "Medium" },
    { title: "Unique Paths", difficulty: "Medium" }, { title: "Maximal Square", difficulty: "Medium" },
    { title: "Edit Distance", difficulty: "Hard" }, { title: "Burst Balloons", difficulty: "Hard" }
  ],
  "DP": [ // Alias for Dynamic Programming
    { title: "Climbing Stairs", difficulty: "Easy" }, { title: "Coin Change", difficulty: "Medium" },
    { title: "Longest Increasing Subsequence", difficulty: "Medium" }, { title: "Edit Distance", difficulty: "Hard" }
  ],
  "BFS": [
    { title: "Binary Tree Level Order Traversal", difficulty: "Medium" }, { title: "Rotting Oranges", difficulty: "Medium" },
    { title: "Shortest Path in Binary Matrix", difficulty: "Medium" }, { title: "Word Ladder", difficulty: "Hard" }
  ],
  "DFS": [
    { title: "Number of Islands", difficulty: "Medium" }, { title: "Clone Graph", difficulty: "Medium" },
    { title: "Course Schedule", difficulty: "Medium" }, { title: "Longest Increasing Path in a Matrix", difficulty: "Hard" }
  ],
  "Design": [
    { title: "LRU Cache", difficulty: "Medium" }, { title: "Min Stack", difficulty: "Medium" },
    { title: "Design Twitter", difficulty: "Medium" }, { title: "Serialize and Deserialize Binary Tree", difficulty: "Hard" }
  ],
  "Heap": [
    { title: "Kth Largest Element in an Array", difficulty: "Medium" }, { title: "Top K Frequent Elements", difficulty: "Medium" },
    { title: "Merge k Sorted Lists", difficulty: "Hard" }, { title: "Find Median from Data Stream", difficulty: "Hard" }
  ],
  "Graph": [
    { title: "Course Schedule", difficulty: "Medium" }, { title: "Clone Graph", difficulty: "Medium" },
    { title: "Network Delay Time", difficulty: "Medium" }, { title: "Alien Dictionary", difficulty: "Hard" }
  ],
  "Tree": [
    { title: "Maximum Depth of Binary Tree", difficulty: "Easy" }, { title: "Invert Binary Tree", difficulty: "Easy" },
    { title: "Lowest Common Ancestor of a Binary Tree", difficulty: "Medium" }, { title: "Binary Tree Maximum Path Sum", difficulty: "Hard" }
  ],
  "Binary Tree": [ // Alias for Tree
    { title: "Maximum Depth of Binary Tree", difficulty: "Easy" }, { title: "Invert Binary Tree", difficulty: "Easy" },
    { title: "Lowest Common Ancestor of a Binary Tree", difficulty: "Medium" }
  ],
  "Two Pointers": [
    { title: "Valid Palindrome", difficulty: "Easy" }, { title: "Container With Most Water", difficulty: "Medium" },
    { title: "3Sum", difficulty: "Medium" }, { title: "Trapping Rain Water", difficulty: "Hard" }
  ],
  "Sliding Window": [
    { title: "Best Time to Buy and Sell Stock", difficulty: "Easy" }, { title: "Longest Substring Without Repeating Characters", difficulty: "Medium" },
    { title: "Longest Repeating Character Replacement", difficulty: "Medium" }, { title: "Sliding Window Maximum", difficulty: "Hard" }
  ],
  "Math": [
    { title: "Palindrome Number", difficulty: "Easy" }, { title: "Reverse Integer", difficulty: "Medium" },
    { title: "Pow(x, n)", difficulty: "Medium" }, { title: "Basic Calculator", difficulty: "Hard" }
  ],
  "Linked List": [
    { title: "Reverse Linked List", difficulty: "Easy" }, { title: "Merge Two Sorted Lists", difficulty: "Easy" },
    { title: "Reorder List", difficulty: "Medium" }, { title: "Reverse Nodes in k-Group", difficulty: "Hard" }
  ],
  "Trie": [
    { title: "Implement Trie (Prefix Tree)", difficulty: "Medium" }, { title: "Design Add and Search Words Data Structure", difficulty: "Medium" },
    { title: "Word Search II", difficulty: "Hard" }
  ]
};

export const companyRequirements = {
  // --- BIG TECH / FAANG ---
  "Google": { targetRating: 2000, minMedium: 250, minHard: 50, tags: ["Dynamic Programming", "Graph", "Tree", "Union Find"], topProblems: ["Number of Islands", "Median of Two Sorted Arrays", "Word Ladder", "Course Schedule", "Longest Path in a Matrix"] },
  "Meta": { targetRating: 1900, minMedium: 300, minHard: 30, tags: ["Array", "String", "Two Pointers", "Binary Tree"], topProblems: ["Verifying an Alien Dictionary", "Lowest Common Ancestor", "Range Sum of BST", "Subarray Sum Equals K"] },
  "Amazon": { targetRating: 1650, minMedium: 180, minHard: 15, tags: ["BFS", "DFS", "Design", "Heap"], topProblems: ["Number of Islands", "Critical Connections", "Reorder Data in Log Files", "Most Common Word"] },
  "Netflix": { targetRating: 1850, minMedium: 200, minHard: 40, tags: ["Design", "Stack", "Sorting"], topProblems: ["Lru Cache", "Basic Calculator", "Decode String", "Merge Intervals"] },
  "Microsoft": { targetRating: 1700, minMedium: 150, minHard: 20, tags: ["Linked List", "Tree", "Strings"], topProblems: ["Reverse Nodes in k-Group", "Wildcard Matching", "Meeting Rooms II"] },
  "Apple": { targetRating: 1750, minMedium: 160, minHard: 25, tags: ["Arrays", "Math", "Hash Table"], topProblems: ["Two Sum", "3Sum", "Trapping Rain Water"] },

  // --- HFT & ELITE TECH ---
  "Jane Street": { targetRating: 2400, minMedium: 400, minHard: 150, tags: ["DP", "Advanced Graphs", "Math"], topProblems: ["Edit Distance", "Sudoku Solver", "Shortest Path Visiting All Nodes"] },
  "Citadel": { targetRating: 2300, minMedium: 350, minHard: 120, tags: ["Probability", "Bit Manipulation"], topProblems: ["Regular Expression Matching", "Optimal Account Balancing"] },
  "Tower Research": { targetRating: 2200, minMedium: 300, minHard: 100, tags: ["C++ Logic", "Multithreading"], topProblems: ["Design Skip List", "All O`one Data Structure"] },
  
  // --- INDIAN UNICORNS ---
  "Zomato": { targetRating: 1650, minMedium: 120, minHard: 10, tags: ["Array", "DP", "Sliding Window"], topProblems: ["Rain Water Trapping", "Fruit Into Baskets"] },
  "Swiggy": { targetRating: 1650, minMedium: 120, minHard: 10, tags: ["Heap", "Graph", "Tree"], topProblems: ["Alien Dictionary", "Design Twitter"] },
  "Flipkart": { targetRating: 1800, minMedium: 200, minHard: 30, tags: ["Graph", "Trie", "DP"], topProblems: ["Maximum Profit in Job Scheduling", "Design Search Autocomplete System"] },
  "Paytm": { targetRating: 1550, minMedium: 100, minHard: 5, tags: ["Array", "Linked List"], topProblems: ["Palindrome Linked List", "Merge k Sorted Lists"] },
  "PhonePe": { targetRating: 1750, minMedium: 150, minHard: 20, tags: ["Design", "Concurrency"], topProblems: ["Design Hit Counter", "Logger Rate Limiter"] },
  "Razorpay": { targetRating: 1600, minMedium: 110, minHard: 10, tags: ["Array", "String", "Recursion"], topProblems: ["Subsets", "Permutations", "Letter Combinations"] },

  // --- GLOBAL PRODUCT COMPANIES ---
  "Uber": { targetRating: 1950, minMedium: 220, minHard: 45, tags: ["Graph", "Design", "Shortest Path"], topProblems: ["Bus Routes", "Cheapest Flights Within K Stops"] },
  "Airbnb": { targetRating: 1850, minMedium: 180, minHard: 35, tags: ["Implementation", "Recursion"], topProblems: ["Text Justification", "Palindrome Partitioning"] },
  "Snapchat": { targetRating: 1800, minMedium: 180, minHard: 30, tags: ["Trie", "String", "Binary Search"], topProblems: ["Replace Words", "Implement Trie"] },
  "Stripe": { targetRating: 1700, minMedium: 150, minHard: 20, tags: ["Parsing", "String", "Design"], topProblems: ["Design File System", "Basic Calculator II"] },
  "Twitter": { targetRating: 1750, minMedium: 160, minHard: 25, tags: ["Graph", "Sliding Window"], topProblems: ["Design Twitter", "Find All Anagrams in a String"] },
  "LinkedIn": { targetRating: 1700, minMedium: 150, minHard: 20, tags: ["Recursion", "Tree"], topProblems: ["Nested List Weight Sum", "Find Leaves of Binary Tree"] },
  "Salesforce": { targetRating: 1600, minMedium: 120, minHard: 10, tags: ["Standard DSA"], topProblems: ["Group Anagrams", "Binary Tree Level Order Traversal"] },
  "Oracle": { targetRating: 1550, minMedium: 100, minHard: 5, tags: ["String", "SQL"], topProblems: ["Add Strings", "Longest Common Prefix"] },
  "Adobe": { targetRating: 1650, minMedium: 130, minHard: 15, tags: ["Geometry", "Math", "DP"], topProblems: ["Valid Square", "Maximum Product Subarray"] },
  "Atlassian": { targetRating: 1750, minMedium: 160, minHard: 25, tags: ["Design", "Data Structures"], topProblems: ["Design Snake Game", "Rank Teams by Votes"] },
  "Splunk": { targetRating: 1650, minMedium: 120, minHard: 15, tags: ["Sorting", "Heap"], topProblems: ["Kth Largest Element", "Merge Intervals"] },
  "Twilio": { targetRating: 1600, minMedium: 110, minHard: 10, tags: ["Parsing", "String"], topProblems: ["Valid Parentheses", "Reorganize String"] },
  "Box": { targetRating: 1650, minMedium: 120, minHard: 15, tags: ["Systems", "File API"], topProblems: ["Design Log Storage System"] },
  "Dropbox": { targetRating: 1800, minMedium: 180, minHard: 30, tags: ["Design", "Trie"], topProblems: ["Grid Illumination", "Web Crawler"] },
  "Spotify": { targetRating: 1700, minMedium: 140, minHard: 20, tags: ["Sorting", "String"], topProblems: ["Top K Frequent Elements", "Sort Colors"] },
  "TikTok": { targetRating: 1900, minMedium: 220, minHard: 40, tags: ["Optimization", "Graph"], topProblems: ["Course Schedule II", "Sliding Window Maximum"] },
  "ByteDance": { targetRating: 2000, minMedium: 250, minHard: 50, tags: ["DP", "Segment Tree"], topProblems: ["Burst Balloons", "Sliding Window Maximum"] },
  "Grab": { targetRating: 1650, minMedium: 120, minHard: 15, tags: ["Graph", "Map"], topProblems: ["Open the Lock", "Reorder Routes"] },
  "Gojek": { targetRating: 1650, minMedium: 120, minHard: 15, tags: ["Concurrency", "Design"], topProblems: ["Logger Rate Limiter"] },
  "Booking.com": { targetRating: 1600, minMedium: 110, minHard: 10, tags: ["Array", "Sorting"], topProblems: ["Merge Intervals", "Find K Closest Elements"] },
  "Visa": { targetRating: 1550, minMedium: 100, minHard: 5, tags: ["Basic DSA"], topProblems: ["Product of Array Except Self"] },
  "Mastercard": { targetRating: 1550, minMedium: 100, minHard: 5, tags: ["Basic DSA"], topProblems: ["Single Number", "Climbing Stairs"] },
  "Goldman Sachs": { targetRating: 1700, minMedium: 140, minHard: 20, tags: ["Math", "Recursion", "String"], topProblems: ["Fraction to Recurring Decimal", "Trap Rain Water"] },
  "Morgan Stanley": { targetRating: 1600, minMedium: 110, minHard: 10, tags: ["String", "Tree"], topProblems: ["Balanced Binary Tree", "Validate BST"] },
  "J.P. Morgan": { targetRating: 1550, minMedium: 100, minHard: 5, tags: ["Basic DSA"], topProblems: ["Two Sum II", "Best Time to Buy and Sell Stock"] },
  "BlackRock": { targetRating: 1600, minMedium: 110, minHard: 10, tags: ["Math", "Array"], topProblems: ["Pascal's Triangle", "Pow(x, n)"] },
  "Two Sigma": { targetRating: 2100, minMedium: 300, minHard: 90, tags: ["HFT", "Performance"], topProblems: ["LRU Cache", "LFU Cache"] },
  "Hudson River Trading": { targetRating: 2200, minMedium: 320, minHard: 110, tags: ["Low Level", "Optimization"], topProblems: ["Design Skip List"] },
  "DEShaw": { targetRating: 1900, minMedium: 220, minHard: 40, tags: ["Greedy", "DP"], topProblems: ["Gas Station", "Jump Game II"] },
  "Intuit": { targetRating: 1650, minMedium: 120, minHard: 15, tags: ["Design", "Recursion"], topProblems: ["Word Search II", "Binary Tree Zigzag"] },
  "Square": { targetRating: 1750, minMedium: 150, minHard: 25, tags: ["Design", "Functional"], topProblems: ["Design Parking System"] },
  "Palantir": { targetRating: 1950, minMedium: 250, minHard: 60, tags: ["Graph", "Simulations"], topProblems: ["Word Ladder II", "Alien Dictionary"] },
  "Databricks": { targetRating: 2000, minMedium: 280, minHard: 80, tags: ["System Design", "Storage"], topProblems: ["Design File System"] },
  "Snowflake": { targetRating: 2000, minMedium: 280, minHard: 80, tags: ["Query Engine", "Sorting"], topProblems: ["Kth Largest Element"] },
  "NVIDIA": { targetRating: 1700, minMedium: 140, minHard: 20, tags: ["Hardware", "Array", "Math"], topProblems: ["Bitwise AND of Numbers Range"] },
  "Intel": { targetRating: 1600, minMedium: 110, minHard: 10, tags: ["Embedded", "Logic"], topProblems: ["Number of 1 Bits"] },
  "AMD": { targetRating: 1600, minMedium: 110, minHard: 10, tags: ["Hardware Logic"], topProblems: ["Single Number II"] },
  "Qualcomm": { targetRating: 1600, minMedium: 110, minHard: 10, tags: ["Signal Processing Logic"], topProblems: ["Hamming Distance"] },
  "Samsung": { targetRating: 1600, minMedium: 110, minHard: 10, tags: ["Array", "Matrix"], topProblems: ["Set Matrix Zeroes"] },
  "Sony": { targetRating: 1600, minMedium: 110, minHard: 10, tags: ["Multimedia Processing"], topProblems: ["Max Points on a Line"] }
};