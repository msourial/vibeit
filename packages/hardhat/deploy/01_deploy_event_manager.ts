import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, get } = deployments;

  const { deployer } = await getNamedAccounts();
  const vibeTicketDeployment = await get("VibeTicket");

  await deploy("EventManager", {
    from: deployer,
    args: [vibeTicketDeployment.address],
    log: true,
  });

  const eventManager = await ethers.getContract("EventManager");
  const vibeTicket = await ethers.getContractAt("VibeTicket", vibeTicketDeployment.address);

  await vibeTicket.setEventManager(await eventManager.getAddress());
};

export default func;
func.tags = ["EventManager"];
func.dependencies = ["VibeTicket"];
