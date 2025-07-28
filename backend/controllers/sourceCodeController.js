import sourceCode from "../models/sourceCodeModel.js";

const createFlowchart = async (req, res) => {
  const { language, code, title } = req.body;
  const userId = req.user._id;

  try {
    const newFlowchart = await sourceCode.create({
      userId,
      code,
      language,
      title: title || `${language} Code`,
      createdAt: new Date(),
    });
    res.status(201).json({
      success: true,
      data: newFlowchart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create flowchart",
    });
  }
};

const editFlowchart = async (req, res) => {
  const { id } = req.params;
  const { code, language, title } = req.body;

  try {
    const updatedFlowchart = await sourceCode.findByIdAndUpdate(
      id,
      { code, language, title, updatedAt: new Date() },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updatedFlowchart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update flowchart",
    });
  }
};

const getUserFlowcharts = async (req, res) => {
  const userId = req.user._id;

  try {
    const flowcharts = await sourceCode
      .find({ userId })
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: flowcharts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to retrieve flowcharts",
    });
  }
};

const getFlowchartById = async (req, res) => {
  const { id } = req.params;

  try {
    const flowchart = await sourceCode.findById(id);
    if (!flowchart) {
      return res.status(404).json({
        success: false,
        error: "Flowchart not found",
      });
    }
    res.status(200).json({
      success: true,
      data: flowchart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to retrieve flowchart",
    });
  }
};

const deleteFlowchart = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFlowchart = await sourceCode.findByIdAndDelete(id);
    if (!deletedFlowchart) {
      return res.status(404).json({
        success: false,
        error: "Flowchart not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Flowchart deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete flowchart",
    });
  }
};

export {
  createFlowchart,
  editFlowchart,
  getUserFlowcharts,
  getFlowchartById,
  deleteFlowchart,
};
