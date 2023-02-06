// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;



contract CrowdFunding {

    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        bool isActive;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;
    uint256 public numberOfActive = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
        ) public returns (uint256) {
            require(_deadline > block.timestamp, "The deadline should be a date in the future.");
            Campaign storage campaign = campaigns[numberOfCampaigns];
            campaign.owner = _owner;
            campaign.title = _title;
            campaign.description = _description;
            campaign.target = _target;
            campaign.deadline = _deadline;
            campaign.image = _image;
            campaign.isActive = true;

            numberOfActive++;
            numberOfCampaigns++;

            return numberOfCampaigns - 1;
    }
    function donateToCampaign(uint256 _id) public payable {
        require(campaigns[_id].deadline > block.timestamp, "The campaign should be active to donate");
        uint256 amount = msg.value;
        campaigns[_id].donators.push(msg.sender);
        campaigns[_id].donations.push(amount);
        campaigns[_id].amountCollected = campaigns[_id].amountCollected + amount;
    }

    function endCampaign(uint256 _id) public {
        require(campaigns[_id].deadline < block.timestamp, "The deadline was not achieved");
        require(campaigns[_id].isActive == true, "This campaign already ended");
        (bool sent, ) = payable(campaigns[_id].owner).call{value: campaigns[_id].amountCollected}("");
        if(sent) {
            campaigns[_id].isActive = false;
            numberOfActive--;
        }
    }

    function getDonators(uint256 _id) view public returns(address [] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++){
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
    function getActive() public view returns (Campaign[] memory) {
        Campaign[] memory activeCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++){
            Campaign storage item = campaigns[i];
            activeCampaigns[i] = item;
        }
        return activeCampaigns;
    }
}