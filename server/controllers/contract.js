import ContractOverview from "../model/contractDetail.js";

// / ________________________create contract operation___________________________

export const createContractPost = async (req, res) => {
  const Data = req.body;

  const NewContractData = new ContractOverview(Data);

  try {
    await NewContractData.save();
    res.status(201).json(NewContractData);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
