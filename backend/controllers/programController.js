const Program = require('../models/program');
const Organization = require('../models/Organization');
// Get all programs
exports.getPrograms = async (req, res) => {
    try {
        const programs = await Program.find();
        res.json(programs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.enrollInProgram = async (req, res) => {
  try {
    const { programId } = req.params;
    const userId = req.user.id;
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.enrolledPrograms.includes(programId)) {
      return res.status(400).json({ message: 'User already enrolled in this program' });
    }
    user.enrolledPrograms.push(programId);
    await user.save();
    res.status(200).json({ message: 'User enrolled in program successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
