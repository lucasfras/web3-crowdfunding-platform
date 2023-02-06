const { expect } = require("chai");

describe("CrowdFunding", function () {
  it("Total Campaigns should be 0", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("CrowdFunding");

    const hardhatToken = await Token.deploy();

    expect((await hardhatToken.numberOfCampaigns()).toString()).equal('0');
  });
});
