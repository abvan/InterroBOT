// Logout Functionality
document.querySelector('.logout-btn').addEventListener('click', function () {
    localStorage.removeItem('loggedIn');
    window.location.href = './try.html';
  });
  
  // Sample Questions with Default Answers
  const questionsData = {
    data_engineering: [
      { question: "Explain data pipelines.", answer: "A data pipeline automates data movement." },
      { question: "What is ETL?", answer: "Extract, Transform, and Load." },
      { question: "Define data warehousing.", answer: "Data warehouse stores large datasets." }
    ],
    data_analysis: [
      { question: "What is data visualization?", answer: "Data visualization represents data using charts." },
      { question: "Explain SQL joins.", answer: "SQL joins combine data from multiple tables." }
    ],
    software_dev: []
  };
  
  // Show Questions
  const domainSelect = document.getElementById('domain-select');
  const questionsSection = document.getElementById('questions-section');
  const questionsTableBody = document.querySelector('#questions-table tbody');
  
  domainSelect.addEventListener('change', function () {
    const selectedDomain = domainSelect.value;
    if (selectedDomain === 'default') {
      questionsSection.style.display = 'none';
      questionsTableBody.innerHTML = '';
    } else {
      displayQuestions(selectedDomain);
    }
  });
  
  // Display Questions in Table
  function displayQuestions(domain) {
    questionsTableBody.innerHTML = '';
    questionsSection.style.display = 'block';
  
    questionsData[domain].forEach((item, index) => {
      const row = `<tr>
        <td><input type="checkbox" name="select-question" /></td>
        <td><input type="text" value="${item.question}" disabled id="question-${index}" /></td>
        <td><input type="text" value="${item.answer}" disabled id="answer-${index}" /></td>
        <td>
          <button class="edit-btn" onclick="editQuestion(${index}, '${domain}')">Edit</button>
        </td>
      </tr>`;
      questionsTableBody.innerHTML += row;
    });
  }
  
  // Edit Functionality
  function editQuestion(index, domain) {
    const questionField = document.getElementById(`question-${index}`);
    const answerField = document.getElementById(`answer-${index}`);
    const editBtn = document.querySelectorAll('.edit-btn')[index];
  
    if (editBtn.textContent === 'Edit') {
      questionField.disabled = false;
      answerField.disabled = false;
      editBtn.textContent = 'Save';
    } else {
      questionsData[domain][index].question = questionField.value;
      questionsData[domain][index].answer = answerField.value;
      questionField.disabled = true;
      answerField.disabled = true;
      editBtn.textContent = 'Edit';
    }
  }
  
  // Submit Questions
  document.getElementById('submit-btn').addEventListener('click', function () {
    const selectedQuestions = document.querySelectorAll('input[name="select-question"]:checked');
    if (selectedQuestions.length < 10) {
      alert('Please select at least 10 questions!');
      return;
    }
    alert('Questions submitted successfully!');
  });
  
  // Add New Question
  document.getElementById('add-question-btn').addEventListener('click', function () {
    const selectedDomain = domainSelect.value;
    
    if (selectedDomain === 'default') {
      alert("Please select a domain first.");
      return;
    }
  
    const newQuestion = prompt("Enter your question:");
    const newAnswer = prompt("Enter a default answer:");
    
    if (newQuestion && newAnswer) {
      questionsData[selectedDomain].push({ question: newQuestion, answer: newAnswer });
      displayQuestions(selectedDomain);
    }
  });
  const submitBtn = document.getElementById('submit-btn');

// Show Questions
domainSelect.addEventListener('change', function () {
  const selectedDomain = domainSelect.value;
  if (selectedDomain === 'default') {
    questionsSection.style.display = 'none';
    submitBtn.style.display = 'none'; // Hide Submit if no domain is selected
    questionsTableBody.innerHTML = '';
  } else {
    displayQuestions(selectedDomain);
    submitBtn.style.display = 'block'; // Show Submit when questions are visible
  }
});
