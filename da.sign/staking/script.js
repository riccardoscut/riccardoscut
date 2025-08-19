document.addEventListener("DOMContentLoaded", function () {
  // Helper function to create HTML from markdown
  function markdownToHtml (markdown) {
    // First convert markdown to HTML
    const html = window.snarkdown(markdown);

    // Create a temporary container to manipulate the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Add security attributes to all anchor tags
    const anchors = tempDiv.getElementsByTagName("a");
    for (const anchor of anchors) {
      anchor.setAttribute("rel", "nofollow noopener noreferrer");
      anchor.setAttribute("target", "_blank");
    }

    return tempDiv.innerHTML;
  }

  // Update intro text
  const introTextContainer = document.querySelector(".intro-text");
  if (introTextContainer && window.pageContent["intro-text"]) {
    introTextContainer.innerHTML = window.pageContent["intro-text"]
      .map(text => `<p>${text}</p>`)
      .join("");
  }

  // Update benefits
  const benefitsContainer = document.querySelector(".benefits");
  if (benefitsContainer && window.pageContent.benefits) {
    benefitsContainer.innerHTML = window.pageContent.benefits
      .map(benefit => `
                <div class="benefit-card">
                    <h3>${benefit.title}</h3>
                    <p>${benefit.description}</p>
                </div>
            `).join("");
  }

  // Update tagline
  const taglineContainer = document.querySelector(".tagline");
  if (taglineContainer && window.pageContent.tagline) {
    taglineContainer.innerHTML = `<p>${window.pageContent.tagline}</p>`;
  }

  // Update how-to steps
  const stepsContainer = document.querySelector(".steps");
  if (stepsContainer && window.pageContent.howto) {
    stepsContainer.innerHTML = window.pageContent.howto
      .map(step => `
                <div class="step-card">
                    <div class="step-number">${step.number}</div>
                    <h3>${step.title}</h3>
                    ${markdownToHtml(step.contents)}
                </div>
            `).join("");
  }

  // Update team members
  const teamContainer = document.querySelector(".team");
  if (teamContainer && window.pageContent.team) {
    teamContainer.innerHTML = window.pageContent.team
      .map(member => `
                <div class="team-member">
                    <img src="${member.image}" alt="${member.name}" class="team-photo">
                    <div class="team-info">
                        <h3>${member.name}</h3>
                        ${member.details.map(detail => `<p>${detail}</p>`).join("")}
                        <p>${member.location}</p>
                    </div>
                </div>
            `).join("");
  }
});
