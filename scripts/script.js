// Define an array of code snippets
const codeSnippets = [
    "const x = 1;\nconst y = 2;\nconsole.log(x + y);",
    "function reverseString(str) {\n  return str.split('').reverse().join('');\n}",
    "const fruits = ['apple', 'banana', 'orange'];\nconsole.log(fruits.length);"
  ];
  
  // Select a random code snippet from the array
  const codeSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  
  // Display the code snippet on the page
  document.getElementById("code-snippet").textContent = codeSnippet;
  
  // Add event listeners to the rating buttons
  document.getElementById("good-button").addEventListener("click", function() {
    updateRating("good");
  });
  document.getElementById("bad-button").addEventListener("click", function() {
    updateRating("bad");
  });
  
  // Function to update the rating count and overall rating
  function updateRating(type) {
    // Get the current count of good and bad ratings
    let goodCount = parseInt(document.getElementById("good-count").textContent);
    let badCount = parseInt(document.getElementById("bad-count").textContent);
  
    // Increment the appropriate count based on the rating type
    if (type === "good") {
      goodCount++;
    } else {
      badCount++;
    }
  
    // Update the count on the page
    document.getElementById("good-count").textContent = goodCount;
    document.getElementById("bad-count").textContent = badCount;
  
    // Calculate the overall rating
    let overallRating = null;
    if (goodCount + badCount > 0) {
      overallRating = goodCount / (goodCount + badCount);
    }
  
    // Display the overall rating on the page
    if (overallRating !== null) {
      document.getElementById("overall-rating").textContent = overallRating.toFixed(2);
    } else {
      document.getElementById("overall-rating").textContent = "N/A";
    }
  
    // Send the rating to the server to store in the database
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "store_rating.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
      codeSnippet: codeSnippet,
      ratingType: type
    }));
  }