/*
 * @lc app=leetcode id=811 lang=typescript
 *
 * [811] Subdomain Visit Count
 */

// @lc code=start
function subdomainVisits(cpdomains: string[]): string[] {
  // Create a map to count subdomain visits
  const subDomainCount: Record<string, number> = {};

  cpdomains.forEach((cpDomain) => {
    // Split the string into visit count and domain
    const [visitCount, domain] = cpDomain.split(" ");

    // Split the domain into subdomains
    const subDomains = domain.split(".");

    // Initialize a variable to build the subdomain
    let subDomainBuilder = "";

    // Iterate through the array of subdomains starting from the end
    for (let ind = subDomains.length - 1; ind >= 0; ind--) {
      // Build the subdomain string by concatenating the current subdomain to the builder
      // If the builder is empty, start with the current subdomain
      subDomainBuilder =
        subDomainBuilder === ""
          ? subDomains[ind]
          : subDomains[ind] + "." + subDomainBuilder;

      // Update the count for the current subdomain.
      // If it exists, increment the count, else set it to the visit count
      subDomainCount[subDomainBuilder] =
        (subDomainCount[subDomainBuilder] || 0) + parseInt(visitCount);
    }
  });

  // Format and return the result
  return Object.entries(subDomainCount).map(
    ([domain, count]) => `${count} ${domain}`
  );
}
// @lc code=end
