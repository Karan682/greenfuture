// Base URL of the backend API
const BASE_URL = "http://localhost:5000";

// Utility: Fetch Wrapper
async function apiRequest(endpoint, method = "GET", body = null) {
    try {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const options = { method, headers };
        if (body) options.body = JSON.stringify(body);

        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Something went wrong");
        return data;
    } catch (err) {
        console.error(err.message);
        alert(err.message);
    }
}

// Login Functionality
async function login(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = await apiRequest("/user/login", "POST", { email, password });
    if (data?.token) {
        localStorage.setItem("token", data.token); // Save token for auth
        localStorage.setItem("userName", data.user.name);
        alert("Login successful!");
        window.location.href = "./ideas.html"; // Redirect to ideas page
    }
}

// Fetch and Display Ideas with Comments (Collaboration)
async function loadIdeas() {
    const ideaContainer = document.getElementById("ideas-container");
    const ideas = await apiRequest("/ideas");

    if (ideas) {
        ideaContainer.innerHTML = ideas
            .map(
                (idea) => `
            <div class="idea">
                <h3>${idea.title}</h3>
                <p>${idea.description}</p>
                <small>Submitted by: ${idea.submittedBy.name}</small>
                <div>
                    <button onclick="voteIdea('${idea._id}', 'up')">👍</button>
                    <button onclick="voteIdea('${idea._id}', 'down')">👎</button>
                    <span>Votes: ${idea.votes}</span>
                </div>
                <div>
                    <textarea id="feedback-${idea._id}" placeholder="Leave feedback"></textarea>
                    <button onclick="submitFeedback('${idea._id}')">Submit Feedback</button>
                </div>
                <div id="comments-${idea._id}">
                    <h4>Collaborations:</h4>
                    <div id="comments-list-${idea._id}">
                        ${idea.comments
                            .map(
                                (comment) => `
                            <p><strong>${comment.userName}:</strong> ${comment.text}</p>
                        `
                            )
                            .join("")}
                    </div>
                    <textarea id="comment-${idea._id}" placeholder="Add a comment"></textarea>
                    <button onclick="submitComment('${idea._id}')">Add Comment</button>
                </div>
            </div>
        `
            )
            .join("");
    }
}

// Vote on an Idea
async function voteIdea(ideaId, voteType) {
    const voteDelta = voteType === "up" ? 1 : -1;
    const data = await apiRequest(`/ideas/vote/${ideaId}`, "POST", { voteDelta });
    if (data) {
        alert("Vote recorded!");
        loadIdeas(); // Refresh ideas list
    }
}

// Submit Feedback
async function submitFeedback(ideaId) {
    const feedbackText = document.getElementById(`feedback-${ideaId}`).value;
    const data = await apiRequest(`/feedback/submit`, "POST", {
        ideaId,
        comment: feedbackText,
    });
    if (data) {
        alert("Feedback submitted!");
        document.getElementById(`feedback-${ideaId}`).value = ""; // Clear textarea
    }
}

// Submit a Collaboration Comment
async function submitComment(ideaId) {
    const commentText = document.getElementById(`comment-${ideaId}`).value;
    const userName = localStorage.getItem("userName"); // Fetch username for display

    const data = await apiRequest(`/comments/add`, "POST", {
        ideaId,
        text: commentText,
        userName,
    });
    if (data) {
        alert("Comment added!");
        loadIdeas(); // Refresh ideas to show the new comment
    }
}

// Fetch and Display Rewards
async function loadRewards() {
    const rewardContainer = document.getElementById("rewards-container");
    const rewards = await apiRequest("/rewards");

    if (rewards) {
        rewardContainer.innerHTML = rewards
            .map(
                (reward) => `
            <div class="reward">
                <h4>${reward.name}</h4>
                <p>Points Required: ${reward.points}</p>
                <button onclick="redeemReward('${reward._id}')">Redeem</button>
            </div>
        `
            )
            .join("");
    }
}

// Redeem Reward
async function redeemReward(rewardId) {
    const data = await apiRequest(`/rewards/redeem`, "POST", { rewardId });
    if (data) {
        alert("Reward redeemed successfully!");
        loadRewards(); // Refresh rewards list
    }
}

// Initialize Pages
function initPage() {
    const path = window.location.pathname;
    if (path.includes("ideas.html")) loadIdeas();
    if (path.includes("rewards.html")) loadRewards();
}

// Attach Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    if (loginForm) loginForm.addEventListener("submit", login);

    initPage(); // Load content based on the current page
});
