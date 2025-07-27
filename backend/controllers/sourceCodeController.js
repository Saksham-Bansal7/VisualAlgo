import sourceCode from '../models/sourceCodeModel.js';

const createFlowchart = async (req, res) => {
  const { language, code } = req.body;

  try {
    const newFlowchart = await sourceCode.create({
      userId,
      code,
      language,
      createdAt: new Date(),
    });
    res.status(201).json(newFlowchart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create flowchart' });
  }
}

const editFlowchart = async (req, res) => {
  const { id } = req.params;
  const { code, language } = req.body;

  try {
    const updatedFlowchart = await sourceCode.findByIdAndUpdate(
      id,
      { code, language, updatedAt: new Date() },
      { new: true }
    );
    res.status(200).json(updatedFlowchart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update flowchart' });
  }
}

const getUserFlowcharts = async (req, res) => {
  const userId = req.user._id;

  try {
    const flowcharts = await sourceCode.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(flowcharts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve flowcharts' });
  }

}

const getFlowchartById = async (req, res) => {
  const { id } = req.params;

  try {
    const flowchart = await sourceCode.findById(id);
    if (!flowchart) {
      return res.status(404).json({ error: 'Flowchart not found' });
    }
    res.status(200).json(flowchart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve flowchart' });
  }
}

const deleteFlowchart = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFlowchart = await sourceCode.findByIdAndDelete(id);
    if (!deletedFlowchart) {
      return res.status(404).json({ error: 'Flowchart not found' });
    }
    res.status(200).json({ message: 'Flowchart deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete flowchart' });
  }
}

export {
  createFlowchart,
  editFlowchart,
  getUserFlowcharts,
  getFlowchartById,
  deleteFlowchart
};

