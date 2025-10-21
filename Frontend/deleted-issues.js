const tableBody = document.querySelector('#deleted-issues-table-body');

function fetchAndDisplayDeletedIssue() {
    fetch('https://crowd-sourced-civic-issue-reporting.onrender.com/api/issues/deleted')
        .then(response => response.json())
        .then(issues => {
            tableBody.innerHTML = '';
            issues.forEach(issue => {
                const row = document.createElement('tr');
                row.dataset.id = issue._id;

                row.innerHTML = `
                    <td>${issue._id}</td>
                    <td>${issue.title}</td>
                    <td>${issue.status}</td>
                    <td>
                        <button class="restore-btn">Restore</button>
                        <button class="perm-delete-btn">Delete Permanently</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching deleted issues:', error);
            alert('Failed to fetch issues from the server.');
        });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayDeletedIssue();
});

tableBody.addEventListener('click', (event) => {
    const clickedElement = event.target;

    // --- FIX #2: The logic for the RESTORE button ---
    if (clickedElement.classList.contains('restore-btn')) {
        const row = clickedElement.closest('tr');
        const issueId = row.dataset.id;

        if (confirm(`Are you sure you want to restore issue #${issueId}?`)) {
            fetch(`https://crowd-sourced-civic-issue-reporting.onrender.com/api/issues/${issueId}/restore`, {
                method: 'PATCH'
            })
            .then(response => {
                if (response.ok) {
                    row.remove(); // Remove it from this "deleted" page
                    console.log(`Successfully restored issue #${issueId}`);
                } else {
                    alert('Failed to restore issue. The server responded with an error.');
                }
            })
            .catch(error => {
                console.error('Error restoring issue:', error);
                alert('An error occurred while trying to restore the issue.');
            });
        }
    }else if (clickedElement.classList.contains('perm-delete-btn')) {
        const row = clickedElement.closest('tr');
        const issueId = row.dataset.id;

        if (confirm(`ARE YOU SURE you want to PERMANENTLY delete issue #${issueId}? This cannot be undone.`)) {
            fetch(`https://crowd-sourced-civic-issue-reporting.onrender.com/api/issues/${issueId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    row.remove(); // Remove it from the page
                    console.log(`Successfully PERMANENTLY deleted issue #${issueId}`);
                } else {
                    alert('Failed to permanently delete issue. The server responded with an error.');
                }
            })
            .catch(error => {
                console.error('Error permanently deleting issue:', error);
                alert('An error occurred while trying to permanently delete the issue.');
            });
        }
    }
});