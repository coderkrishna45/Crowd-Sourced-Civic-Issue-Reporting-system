const tableBody = document.querySelector('#deleted-issues-table-body');

function fetchAndDisplayDeletedIssue(){
    fetch('http://localhost:3000/api/issues/deleted')
    .then(response=>response.json())
    .then(issues=>{
        tableBody.innerHTML = '';
        issues.forEach(issue => {
            const row = document.createElement('tr');
            row.dataset.id = issue._id;
            row.innerHTML = `
                <td>${issue._id}</td>
                <td>${issue.title}</td>
                <td>${issue.status}</td>
                <td>
                    <button class="status-Btn">Recover Issue</button>
                    <button class="status-Btn">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch (error=>{
        console.error('Error fetching issues:', error);
        alert('Failed to fetch issues from the server.');
    });
}
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayDeletedIssue();
});