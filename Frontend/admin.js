const issueTableBody = document.querySelector('#Tbody');

function fetchAndDisplayIssue() {
    fetch('http://localhost:3000/api/issues')
        .then(response => response.json())
        .then(issues => {
            issueTableBody.innerHTML = '';
            issues.forEach(issue => {
                const row = document.createElement('tr');
                // FIX #1: Use the MongoDB '_id'
                row.dataset.id = issue._id; 
                row.innerHTML = `
                    <td>${issue._id}</td> 
                    <td>${issue.title}</td>
                    <td>${issue.status}</td>
                    <td>
                        <button class="status-btn">In Progress</button>
                        <button class="status-btn">Resolved</button>
                        <button class="delete-btn">Delete</button>
                    </td>
                `;
                issueTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching issues:', error);
            alert('Failed to fetch issues from the server.');
        });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayIssue();
});

issueTableBody.addEventListener('click', (e) => {
    const clickedElement = e.target;
    if (clickedElement.classList.contains('status-btn')) {
        let newStatus;
        if (clickedElement.textContent === 'In Progress') {
            newStatus = 'In Progress';
        } else {
            newStatus = 'Resolved';
        }

        if (newStatus) {
            const row = clickedElement.closest('tr');
            const issueId = row.dataset.id;

            fetch(`http://localhost:3000/api/issues/${issueId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            })
            .then(response => response.json())
            .then(updatedIssue => {
                const statusCell = row.querySelector('td:nth-child(3)');
                statusCell.textContent = updatedIssue.status;
                console.log('Successfully updated issue:', updatedIssue);
            })
            .catch(error => {
                console.error('Error updating issue:', error);
                alert('Failed to update the issue status.');
            });
        }
    } else if (clickedElement.classList.contains('delete-btn')) {
        const row = clickedElement.closest('tr');
        const issueId = row.dataset.id;

        if (confirm(`Are you sure you want to archive issue #${issueId}? This will move it to the deleted items page.`)) {
            fetch(`http://localhost:3000/api/issues/${issueId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    row.remove();
                    console.log(`Successfully soft-deleted issue #${issueId}`);
                } else {
                    alert('Failed to archive issue. The server responded with an error.');
                }
            })
            .catch(error => {
                console.error('Error archiving issue:', error);
                alert('An error occurred while trying to archive the issue.');
            });
        }
    }
});